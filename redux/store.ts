import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import cartReducer from './cartSlice';
import actionReducer from './actionSlice';
import queryReducer from './querySlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    action: actionReducer,
    search: queryReducer,
  },
});
