import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modal: {
    isOpen: false,
  },
};

const actionSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    onOpen: (state, action) => {
      state.modal.isOpen = action.payload;
    },
  },
});

export const { onOpen } = actionSlice.actions;

export default actionSlice.reducer;
