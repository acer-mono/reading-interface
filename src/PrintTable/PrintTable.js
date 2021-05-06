import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FormControl, InputLabel, Select, MenuItem, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const useStyles = makeStyles(theme => ({
  buttons: {
    margin: theme.spacing(0, 2, 2, 2)
  },
  input: {
    margin: theme.spacing(0, 0, 2, 0)
  }
}));

function PrintTable({ open, changeState }) {
  const styles = useStyles();
  return (
    <div>
      <Dialog aria-labelledby="form-dialog-title" open={open}>
        <DialogTitle id="form-dialog-title">Печать таблицы</DialogTitle>
        <DialogContent>
          <FormControl variant="outlined" fullWidth className={styles.input}>
            <InputLabel id="room-label">Помещение</InputLabel>
            <Select labelId="room-label" id="Room" label="Помещение">
              <MenuItem value={1}>Хранилище №1</MenuItem>
              <MenuItem value={2}>Хранилище №2</MenuItem>
              <MenuItem value={3}>Хранилище №3</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="select-outlined-label">Формат</InputLabel>
            <Select labelId="select-outlined-label" id="Format" label="Формат">
              <MenuItem value={1}>pdf</MenuItem>
              <MenuItem value={2}>csv</MenuItem>
              <MenuItem value={3}>xlsx</MenuItem>
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
                id="start"
                label="Начало наблюдений"
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
                id="end"
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
          <Button variant="contained" color="primary" onClick={() => changeState(false)}>
            Печать
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default PrintTable;
