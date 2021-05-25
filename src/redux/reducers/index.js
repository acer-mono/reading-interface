import { combineReducers } from 'redux';
import { roomsReducer } from './rooms';
import { usersReducer } from './users';
import { statusReducer } from './status';
import { currentUserReducer } from './currentUser';

const createRootReducer = () =>
  combineReducers({
    rooms: roomsReducer,
    users: usersReducer,
    status: statusReducer,
    currentUser: currentUserReducer
  });

export default createRootReducer;
