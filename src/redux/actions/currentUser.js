import api from '../../api';
import { get } from '../reducers/currentUser';

export const getUserAsync = () => async dispatch => {
  try {
    const data = await api.user.get();
    dispatch(get(data));
  } catch (e) {
    console.log(e);
  }
};
