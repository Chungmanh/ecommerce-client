import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: {
      currentTotal: 0,
      isFetching: false,
      error: false,
    },
  },
  reducers: {
    addStart: (state) => {
      state.cart.isFetching = true;
    },
    addSuccess: (state, action) => {
      state.cart.isFetching = false;
      state.cart.currentTotal = action.payload;
      state.cart.error = false;
    },
    addFailed: (state) => {
      state.cart.isFetching = false;
      state.cart.error = true;
    },
  },
});

export const { addStart, addSuccess, addFailed } = cartSlice.actions;

export default cartSlice.reducer;
