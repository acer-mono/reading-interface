import { combineReducers } from 'redux';
import { roomsReducer } from './rooms';
import { usersReducer } from './users';
import { statusReducer } from './status';

const createRootReducer = () =>
  combineReducers({
    rooms: roomsReducer,
    users: usersReducer,
    status: statusReducer
  });

export default createRootReducer;
