import React, { useEffect, useRef, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FormControl, InputLabel, Select, MenuItem, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import api from '../api';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '@material-ui/lab/Alert/Alert';
import { loadAsync } from '../redux/actions/rooms';

const useStyles = makeStyles(theme => ({
  buttons: {
    margin: theme.spacing(0, 2, 2, 2)
  },
  input: {
    margin: theme.spacing(0, 0, 2, 0)
  }
}));

const PLOT_TYPES = {
  h: 'Влажность',
  t: 'Температура',
  th: 'Общий'
};

const validationSchema = yup.object({
  type: yup.string('Выберите тип').required('Тип обязателен'),
  room: yup.string('Выберите помещение').required('Помещение обязательно'),
  from: yup.date().required('Дата начала наблюдений обязательна'),
  to: yup.date().required('Дата начала окончания обязательна')
});

function PrintPlot({ open, changeState }) {
  const styles = useStyles();
  const [error, setError] = useState('');
  const download = useRef();
  const rooms = useSelector(store => store.rooms.list);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      type: '',
      room: '',
      from: null,
      to: null
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      setError('');
      api.plot
        .get(values)
        .then(res => res.blob())
        .then(blob => window.URL.createObjectURL(blob))
        .then(url => {
          download.current.href = url;
          download.current.download = 'plot.png';
          download.current.click();
          changeState(false);
        })
        .catch(e => setError(e.message));
    }
  });

  useEffect(() => {
    dispatch(loadAsync());
  }, []);

  return (
    <div>
      <Dialog aria-labelledby="form-dialog-title" open={open}>
        <DialogTitle id="form-dialog-title">
          Печать графика
          {error && <Alert severity="error">{error}</Alert>}
        </DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <FormControl variant="outlined" fullWidth className={styles.input}>
              <InputLabel id="room-label">Помещение</InputLabel>
              <Select
                labelId="room-label"
                id="room"
                label="Помещение"
                name="room"
                value={formik.values.room}
                onChange={formik.handleChange}
                error={formik.touched.room && Boolean(formik.errors.room)}
                helperText={formik.touched.room && formik.errors.room}
              >
                {rooms.map(room => (
                  <MenuItem key={room.id} value={room.id}>
                    {room.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="select-outlined-label">Тип</InputLabel>
              <Select
                labelId="select-outlined-label"
                id="type"
                label="Тип"
                name="type"
                value={formik.values.type}
                onChange={formik.handleChange}
                error={formik.touched.type && Boolean(formik.errors.type)}
                helperText={formik.touched.type && formik.errors.type}
              >
                {Object.entries(PLOT_TYPES).map(([key, value]) => (
                  <MenuItem key={key} value={key}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justify="space-around">
                <KeyboardDatePicker
                  fullWidth
                  disableToolbar
                  variant="inline"
                  format="dd.MM.yyyy"
                  margin="normal"
                  label="Начало наблюдений"
                  id="from"
                  name="from"
                  clearable
                  value={formik.values.from}
                  onChange={val => {
                    formik.setFieldValue('from', val);
                  }}
                  error={formik.touched.from && Boolean(formik.errors.from)}
                  helperText={formik.touched.from && formik.errors.from}
                  KeyboardButtonProps={{
                    'aria-label': 'change date'
                  }}
                />
                <KeyboardDatePicker
                  fullWidth
                  disableToolbar
                  variant="inline"
                  format="dd.MM.yyyy"
                  margin="normal"
                  id="to"
                  name="to"
                  clearable
                  value={formik.values.to}
                  onChange={val => {
                    formik.setFieldValue('to', val);
                  }}
                  error={formik.touched.to && Boolean(formik.errors.to)}
                  helperText={formik.touched.to && formik.errors.to}
                  label="Окончание наблюдений"
                  KeyboardButtonProps={{
                    'aria-label': 'change date'
                  }}
                />
              </Grid>
            </MuiPickersUtilsProvider>
          </DialogContent>
          <DialogActions className={styles.buttons}>
            <Button color="primary" onClick={() => changeState(false)}>
              Отмена
            </Button>
            {formik.isValid && formik.dirty && (
              <>
                <Button variant="contained" color="primary" type="submit">
                  Печать
                </Button>
                <a ref={download}></a>
              </>
            )}
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default PrintPlot;
