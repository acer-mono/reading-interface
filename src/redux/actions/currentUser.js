import api from '../../api';

export const currentUserActionTypes = {
  get: 'currentUser/get'
};

export const getUser = user => ({
  type: currentUserActionTypes.get,
  payload: user
});

export const getUserAsync = () => async dispatch => {
  try {
    const data = await api.user.get();
    dispatch(getUser(data));
  } catch (e) {
    console.log(e);
  }
};
