import api from '../../api';
import { setRoomStatus } from '../reducers/status';
import { closeRoom } from '../reducers/editForms';
import { clearError, setError, edit, loadList, remove, add } from '../reducers/rooms';

export const editAsync = value => async dispatch => {
  try {
    dispatch(clearError());
    await api.room.put(value);
    dispatch(edit(value));
    dispatch(closeRoom());
  } catch (e) {
    dispatch(setError(e.message));
  }
};

export const addAsync = name => async dispatch => {
  try {
    dispatch(clearError());
    const item = await api.room.post(name);
    dispatch(add(item));
    dispatch(setRoomStatus(false));
  } catch (e) {
    dispatch(setError(e.message));
    dispatch(setRoomStatus(true));
  }
};

export const loadAsync = () => async dispatch => {
  try {
    const list = await api.rooms.get();
    dispatch(loadList(list));
  } catch (e) {
    console.log('Error load');
  }
};

export const removeAsync = id => async dispatch => {
  try {
    let isConfirmed = confirm('Удалить помещение?');
    if (isConfirmed) {
      await api.room.delete(id);
      dispatch(remove(id));
    }
  } catch (e) {
    console.log('Error remove');
  }
};
