import api from '../../api';
import { setUserStatus } from './status';

export const usersActionTypes = {
  edit: 'users/edit',
  add: 'users/add',
  delete: 'users/delete',
  loadList: 'users/load',
  setError: 'users/setError',
  clearError: 'users/clearError'
};

export const setError = error => ({
  type: usersActionTypes.setError,
  payload: error
});

export const clearError = () => ({
  type: usersActionTypes.clearError
});

export const load = list => ({
  type: usersActionTypes.loadList,
  payload: list
});

export const remove = id => ({
  type: usersActionTypes.delete,
  payload: id
});

export const edit = item => ({
  type: usersActionTypes.edit,
  payload: item
});

export const add = room => ({
  type: usersActionTypes.add,
  payload: room
});

export const editAsync = value => async dispatch => {
  try {
    dispatch(clearError());
    await api.user.put(value);
    dispatch(edit(value));
    dispatch(setUserStatus(false));
  } catch (e) {
    dispatch(setError(e.message));
    dispatch(setUserStatus(true));
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
    dispatch(load(list));
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
