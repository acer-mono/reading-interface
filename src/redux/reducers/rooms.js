import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
  error: ''
};

const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    loadList(state, action) {
      return { ...state, list: action.payload };
    },
    remove(state, action) {
      state.list = [...state.list.filter(el => el.id !== action.payload)];
    },
    add(state, action) {
      state.list.push(action.payload);
    },
    edit(state, action) {
      const room = state.list.find(room => room.id === action.payload.id);
      room.name = action.payload.name;
    },
    clearError(state) {
      state.error = '';
    },
    setError(state, action) {
      state.error = action.payload;
    }
  }
});

export const { loadList, remove, edit, setError, clearError, add } = roomsSlice.actions;

export default roomsSlice.reducer;
