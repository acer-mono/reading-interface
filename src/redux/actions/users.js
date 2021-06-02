import api from '../../api';
import { setUserStatus } from '../reducers/status';
import { closeUser } from '../reducers/editForms';
import { clearError, setError, edit, loadList, remove, add } from '../reducers/users';
export const editAsync = value => async dispatch => {
  try {
    dispatch(clearError());
    await api.user.put(value);
    dispatch(edit(value));
    dispatch(closeUser());
  } catch (e) {
    dispatch(setError(e.message));
  }
};

export const addAsync = name => async dispatch => {
  try {
    dispatch(clearError());
    const item = await api.user.post(name);
    dispatch(add(item));
    dispatch(setUserStatus(false));
  } catch (e) {
    dispatch(setError(e.message));
    dispatch(setUserStatus(true));
  }
};

export const loadAsync = () => async dispatch => {
  try {
    const list = await api.users.get();
    dispatch(loadList(list));
  } catch (e) {
    console.log('Error load');
  }
};

export const removeAsync = id => async dispatch => {
  try {
    let isConfirmed = confirm('Удалить помещение?');
    if (isConfirmed) {
      await api.user.delete(id);
      dispatch(remove(id));
    }
  } catch (e) {
    console.log('Error remove');
  }
};
