import { combineReducers } from 'redux';
import { roomsReducer } from './rooms';

const createRootReducer = () =>
  combineReducers({
    rooms: roomsReducer
  });

export default createRootReducer;
