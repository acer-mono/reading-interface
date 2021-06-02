import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: '',
  room: ''
};

const editFormSlice = createSlice({
  name: 'editForms',
  initialState,
  reducers: {
    openUser(state, action) {
      state.user = action.payload;
    },
    closeUser(state) {
      state.user = '';
    },
    openRoom(state, action) {
      state.room = action.payload;
    },
    closeRoom(state) {
      state.room = '';
    }
  }
});

export const { openUser, closeUser, openRoom, closeRoom } = editFormSlice.actions;

export default editFormSlice.reducer;
