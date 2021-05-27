import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {}
};

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    get(state, action) {
      state.user = action.payload;
    }
  }
});

export const { get } = currentUserSlice.actions;

export default currentUserSlice.reducer;
