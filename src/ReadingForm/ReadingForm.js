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

function ReadingForm(open) {
  const styles = useStyles();
  return (
    <div>
      <Dialog aria-labelledby="form-dialog-title" open={open}>
        <DialogTitle id="form-dialog-title">Изменение/Ввод показаний(Хранилище №1)</DialogTitle>
        <DialogContent>
          <TextField
            className={styles.input}
            margin="dense"
            fullWidth
            variant="outlined"
            id="time"
            label="Температура"
            type="number"
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
            id="time"
            label="Влажность"
            type="number"
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
          <Button color="primary">Отмена</Button>
          <Button variant="contained" color="primary">
            Добавить/Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ReadingForm;
