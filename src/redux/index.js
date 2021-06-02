import { configureStore } from '@reduxjs/toolkit';

import statusSlice from './reducers/status';
import currentUserSlice from './reducers/currentUser';
import editFormsSlice from './reducers/editForms';
import roomsSlice from './reducers/rooms';
import usersSlice from './reducers/users';

const store = configureStore({
  reducer: {
    rooms: roomsSlice,
    users: usersSlice,
    status: statusSlice,
    currentUser: currentUserSlice,
    editForms: editFormsSlice
  }
});

export default store;
