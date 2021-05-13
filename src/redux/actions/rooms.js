import api from '../../api';

export const roomsActionTypes = {
  edit: 'rooms/edit',
  add: 'rooms/add',
  delete: 'rooms/delete',
  loadList: 'rooms/load',
  setError: 'rooms/setError',
  clearError: 'rooms/clearError'
};

export const setError = error => ({
  type: roomsActionTypes.setError,
  payload: error
});

export const clearError = () => ({
  type: roomsActionTypes.clearError
});

export const load = list => ({
  type: roomsActionTypes.loadList,
  payload: list
});

export const remove = id => ({
  type: roomsActionTypes.delete,
  payload: id
});

export const edit = item => ({
  type: roomsActionTypes.edit,
  payload: item
});

export const add = room => ({
  type: roomsActionTypes.add,
  payload: room
});

export const editAsync = value => async dispatch => {
  try {
    dispatch(clearError());
    await api.room.put(value);
    dispatch(edit(value));
  } catch (e) {
    dispatch(setError(e.message));
  }
};

export const addAsync = name => async dispatch => {
  try {
    dispatch(clearError());
    const item = await api.room.post(name);
    dispatch(add(item));
  } catch (e) {
    dispatch(setError(e.message));
  }
};

export const loadAsync = () => async dispatch => {
  try {
    const list = await api.rooms.get();
    dispatch(load(list));
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
