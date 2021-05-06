import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  buttons: {
    margin: theme.spacing(0, 2, 2, 2)
  },
  input: {
    margin: theme.spacing(0, 0, 2, 0)
  }
}));

function UserForm({ open, changeHandler, isCreation, user }) {
  const [login, setLogin] = useState(user ? user.login : '');
  const [password, setPassword] = useState(user ? user.password : '');
  const styles = useStyles();
  return (
    <div>
      <Dialog aria-labelledby="form-dialog-title" open={open}>
        <DialogTitle id="form-dialog-title">
          {isCreation && 'Создание'}
          {!isCreation && 'Изменение'} пользователя
        </DialogTitle>
        <DialogContent>
          <TextField
            variant="outlined"
            className={styles.input}
            margin="dense"
            id="login"
            label="Логин"
            type="text"
            value={login}
            onChange={event => setLogin(event.target.value)}
            fullWidth
          />
          <TextField
            className={styles.input}
            variant="outlined"
            margin="dense"
            id="password"
            label="Пароль"
            type="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
            fullWidth
          />
          <FormControlLabel
            control={<Checkbox name="isAdmin" color="primary" />}
            label="Администратор"
          />
        </DialogContent>
        <DialogActions className={styles.buttons}>
          <Button color="primary" onClick={() => changeHandler(false)}>
            Отмена
          </Button>
          <Button variant="contained" color="primary" onClick={() => changeHandler(false)}>
            {isCreation && 'Создать'}
            {!isCreation && 'Сохранить'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default UserForm;
