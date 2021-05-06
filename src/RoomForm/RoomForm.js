import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  buttons: {
    margin: theme.spacing(0, 2, 2, 2)
  },
  input: {
    margin: theme.spacing(0, 0, 2, 0)
  }
}));

function RoomForm({ open, isCreation, changeHandler }) {
  const styles = useStyles();
  return (
    <div>
      <Dialog aria-labelledby="form-dialog-title" open={open}>
        <DialogTitle id="form-dialog-title">
          {isCreation && 'Создание'}
          {!isCreation && 'Изменение'} помещения
        </DialogTitle>
        <DialogContent>
          <TextField
            multiline
            rows={5}
            variant="outlined"
            fullWidth
            aria-label="empty textarea"
            placeholder="Введите наименование помещения"
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

export default RoomForm;
