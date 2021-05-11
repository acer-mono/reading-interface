import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Alert from '@material-ui/lab/Alert';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import { useFormik } from 'formik';
import * as yup from 'yup';
import api from '../api';

const validationSchema = yup.object({
  login: yup.string('Введите логин').required('Логин обязателен'),
  password: yup
    .string('Введите пароль')
    .min(8, 'Минимальная длина пароля - 8 символов')
    .required('Пароль обязателен'),
  isAdmin: yup.bool(false)
});

const useStyles = makeStyles(theme => ({
  buttons: {
    margin: theme.spacing(0, 2, 2, 2)
  },
  input: {
    margin: theme.spacing(0, 0, 2, 0)
  }
}));

function UserForm({ open, changeHandler, isCreation, user, updateHandler, addHandler }) {
  const [error, setError] = useState('');
  const styles = useStyles();
  const formik = useFormik({
    initialValues: {
      login: user ? user.login : '',
      password: user ? user.password : '',
      isAdmin: user ? user.isAdmin : ''
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      setError('');
      if (isCreation) {
        api.user
          .post(values)
          .then(user => {
            addHandler(user);
            changeHandler(false);
          })
          .catch(e => {
            setError(e.message);
          });
      } else {
        api.user
          .put({ id: user.id, ...values })
          .then(user => {
            updateHandler(user);
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
          {isCreation && 'Создание'}
          {!isCreation && 'Изменение'} пользователя
          {error && <Alert severity="error">{error}</Alert>}
        </DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <TextField
              variant="outlined"
              className={styles.input}
              margin="dense"
              id="login"
              name="login"
              label="Логин"
              type="text"
              value={formik.values.login}
              onChange={formik.handleChange}
              error={formik.touched.login && Boolean(formik.errors.login)}
              helperText={formik.touched.login && formik.errors.login}
              fullWidth
            />
            <TextField
              className={styles.input}
              variant="outlined"
              margin="dense"
              id="password"
              name="password"
              label="Пароль"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              fullWidth
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="isAdmin"
                  color="primary"
                  defaultChecked={formik.values.isAdmin}
                  onChange={formik.handleChange}
                />
              }
              label="Администратор"
            />
          </DialogContent>
          <DialogActions className={styles.buttons}>
            <Button
              color="primary"
              onClick={() => {
                changeHandler(false);
                setError('');
              }}
            >
              Отмена
            </Button>
            <Button variant="contained" color="primary" type="submit">
              {isCreation && 'Создать'}
              {!isCreation && 'Сохранить'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default UserForm;
