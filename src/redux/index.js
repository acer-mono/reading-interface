import { roomsInitialStore } from './reducers/rooms';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createRootReducer from './reducers';
import { usersInitialStore } from './reducers/users';

export const initialState = {
  rooms: roomsInitialStore,
  users: usersInitialStore
};

export const rootReducer = createRootReducer();

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;
