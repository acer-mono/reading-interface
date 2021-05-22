import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Alert from '@material-ui/lab/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { addAsync, editAsync } from '../redux/actions/rooms';
import { setRoomStatus } from '../redux/actions/status';

const useStyles = makeStyles(theme => ({
  buttons: {
    margin: theme.spacing(0, 2, 2, 2)
  },
  input: {
    margin: theme.spacing(0, 0, 2, 0)
  }
}));

const validationSchema = yup.object({
  name: yup.string('Введите название помещения').required('Название не может быт пустым')
});

function RoomForm({ open, isCreation, room }) {
  const dispatch = useDispatch();
  const error = useSelector(store => store.rooms.error);
  const styles = useStyles();
  const formik = useFormik({
    initialValues: {
      name: room ? room.name : ''
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      if (isCreation) {
        dispatch(addAsync(values.name));
      } else {
        dispatch(editAsync({ id: room.id, name: values.name }));
      }
    }
  });
  return (
    <div>
      <Dialog aria-labelledby="form-dialog-title" open={open}>
        <DialogTitle id="form-dialog-title">
          {isCreation && 'Создание'}
          {!isCreation && 'Изменение'} помещения
          {error && <Alert severity="error">{error}</Alert>}
        </DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <TextField
              multiline
              rows={5}
              id="name"
              label="Название помещения"
              name="name"
              variant="outlined"
              fullWidth
              aria-label="empty textarea"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </DialogContent>
          <DialogActions className={styles.buttons}>
            <Button color="primary" onClick={() => dispatch(setRoomStatus(false))}>
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

export default RoomForm;
