import { combineReducers } from 'redux';
import { roomsReducer } from './rooms';
import { usersReducer } from './users';
import { statusReducer } from './status';
import { currentUserReducer } from './currentUser';
import { editFormsReducer } from './editForms';

const createRootReducer = () =>
  combineReducers({
    rooms: roomsReducer,
    users: usersReducer,
    status: statusReducer,
    currentUser: currentUserReducer,
    editForms: editFormsReducer
  });

export default createRootReducer;
