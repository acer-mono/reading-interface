import React, { useState } from 'react';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import { Avatar, Typography, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Alert from '@material-ui/lab/Alert';
import api from '../api';

const validationSchema = yup.object({
  login: yup.string('Введите логин').required('Логин обязателен'),
  password: yup
    .string('Введите пароль')
    .min(8, 'Минимальная длина пароля - 8 символов')
    .required('Пароль обязателен')
});

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#be392a'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

function LoginForm() {
  const classes = useStyles();
  const [error, setError] = useState('');

  const formik = useFormik({
    initialValues: {
      login: '',
      password: ''
    },
    validationSchema: validationSchema,
    onSubmit: async values => {
      setError('');
      console.log(values);
      try {
        const data = await api.auth.post(values);
        console.log(data);
      } catch (e) {
        setError(e.message);
      }
    }
  });

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <FingerprintIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Вход в систему
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <form noValidate onSubmit={formik.handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="login"
          label="Логин"
          name="login"
          autoComplete="login"
          value={formik.values.login}
          onChange={formik.handleChange}
          error={formik.touched.login && Boolean(formik.errors.login)}
          helperText={formik.touched.login && formik.errors.login}
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Пароль"
          type="password"
          id="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          autoComplete="current-password"
        />
        <Button
          className={classes.submit}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          size="large"
        >
          Войти
        </Button>
      </form>
    </div>
  );
}

export default LoginForm;
