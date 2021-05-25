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
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Alert from '@material-ui/lab/Alert';
import { loadAsync } from '../redux/actions/rooms';

const useStyles = makeStyles(theme => ({
  buttons: {
    margin: theme.spacing(0, 2, 2, 2)
  },
  input: {
    margin: theme.spacing(0, 0, 2, 0)
  }
}));

const TABLE_FORMATS = {
  pdf: 'pdf',
  xlsx: 'xlsx',
  csv: 'csv'
};

const validationSchema = yup.object({
  format: yup.string('Выберете формат').required('Формат обязателен'),
  room: yup.string('Выберете помещение').required('Помещение обязательно'),
  from: yup.date().required('Дата начала наблюдений обязательна'),
  to: yup.date().required('Дата начала окончания обязательна')
});

function PrintTable({ open, changeState }) {
  const [error, setError] = useState('');
  const styles = useStyles();
  const download = useRef();
  const rooms = useSelector(store => store.rooms.list);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      format: '',
      room: '',
      from: null,
      to: null
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      setError('');
      api.table
        .get(values)
        .then(res => res.blob())
        .then(blob => window.URL.createObjectURL(blob))
        .then(url => {
          download.current.href = url;
          download.current.download = `table.${formik.values.format}`;
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
          Печать таблицы
          {error && <Alert severity="error">{error}</Alert>}
        </DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <FormControl variant="outlined" fullWidth className={styles.input}>
              <InputLabel id="room-label">Помещение</InputLabel>
              <Select
                labelId="room-label"
                label="Помещение"
                id="room"
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
              <InputLabel id="select-outlined-label">Формат</InputLabel>
              <Select
                labelId="select-outlined-label"
                label="Формат"
                id="format"
                name="format"
                value={formik.values.format}
                onChange={formik.handleChange}
                error={formik.touched.format && Boolean(formik.errors.format)}
                helperText={formik.touched.format && formik.errors.format}
              >
                {Object.entries(TABLE_FORMATS).map(([key, value]) => (
                  <MenuItem key={key} value={value}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justify="space-between">
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
                  label="Окончание наблюдений"
                  id="to"
                  name="to"
                  clearable
                  value={formik.values.to}
                  onChange={val => {
                    formik.setFieldValue('to', val);
                  }}
                  error={formik.touched.to && Boolean(formik.errors.to)}
                  helperText={formik.touched.to && formik.errors.to}
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

export default PrintTable;
