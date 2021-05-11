import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import * as yup from 'yup';
import api from '../api';
import { useFormik } from 'formik';
import { Alert } from '@material-ui/lab';

const validationSchema = yup.object({
  temperature: yup.number().required('Поле обязательно'),
  humidity: yup.number().required('Поле обязательно')
});

const useStyles = makeStyles(theme => ({
  buttons: {
    margin: theme.spacing(0, 2, 2, 2)
  },
  input: {
    margin: theme.spacing(0, 0, 2, 0)
  }
}));

function ReadingForm({ open, changeHandler, reading, room, updateReading, updateReadingList }) {
  const [error, setError] = useState('');
  const styles = useStyles();

  const formik = useFormik({
    initialValues: {
      temperature: reading ? reading.temperature : 0,
      humidity: reading ? reading.humidity : 0
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      setError('');
      if (!reading) {
        api.reading
          .post({ room, ...values })
          .then(reading => {
            updateReadingList(reading, false);
            updateReading(reading);
            changeHandler(false);
          })
          .catch(e => {
            setError(e.message);
          });
      } else {
        api.reading
          .put({ room, ...values })
          .then(reading => {
            updateReadingList(reading, true);
            updateReading(reading);
            changeHandler(false);
          })
          .catch(e => {
            setError(e.message);
          });
      }
    }
  });

  return (
    <div>
      <Dialog aria-labelledby="form-dialog-title" open={open}>
        <DialogTitle id="form-dialog-title">
          {reading && 'Изменениe'}
          {!reading && 'Добавление'} показаний
          {error && <Alert severity="error">{error}</Alert>}
        </DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <TextField
              className={styles.input}
              margin="dense"
              fullWidth
              variant="outlined"
              id="temperature"
              name="temperature"
              label="Температура"
              type="number"
              value={formik.values.temperature}
              onChange={formik.handleChange}
              error={formik.touched.temperature && Boolean(formik.errors.temperature)}
              helperText={formik.touched.temperature && formik.errors.temperature}
              InputLabelProps={{
                shrink: true
              }}
              inputProps={{
                step: 0.1
              }}
            />
            <TextField
              margin="dense"
              fullWidth
              variant="outlined"
              id="humidity"
              name="humidity"
              label="Влажность"
              type="number"
              value={formik.values.humidity}
              onChange={formik.handleChange}
              error={formik.touched.humidity && Boolean(formik.errors.humidity)}
              helperText={formik.touched.humidity && formik.errors.humidity}
              InputLabelProps={{
                shrink: true
              }}
              inputProps={{
                step: 0.1,
                min: 0
              }}
            />
          </DialogContent>
          <DialogActions className={styles.buttons}>
            <Button color="primary" onClick={() => changeHandler(false)}>
              Отмена
            </Button>
            <Button variant="contained" color="primary" type="submit">
              {reading && 'Сохранить'}
              {!reading && 'Добавить'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default ReadingForm;
