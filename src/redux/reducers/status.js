import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: false,
  room: false,
  plot: false,
  table: false,
  create: false,
  print: false,
  edit: false
};

const statusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    setPlotStatus(state, action) {
      state.plot = action.payload;
    },
    setTableStatus(state, action) {
      state.table = action.payload;
    },
    setRoomStatus(state, action) {
      state.room = action.payload;
    },
    setUserStatus(state, action) {
      state.user = action.payload;
    },
    setCreate(state, action) {
      state.create = action.payload;
    },
    setPrint(state, action) {
      state.print = action.payload;
    },
    setEdit(state, action) {
      state.edit = action.payload;
    }
  }
});

export const {
  setPlotStatus,
  setTableStatus,
  setRoomStatus,
  setUserStatus,
  setCreate,
  setPrint,
  setEdit
} = statusSlice.actions;

export default statusSlice.reducer;
