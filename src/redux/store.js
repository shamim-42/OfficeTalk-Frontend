import { configureStore } from '@reduxjs/toolkit';
import layoutReducer from './features/layoutSlice';
import authReducer from './features/authSlice';

export const store = configureStore({
  reducer: {
    layout: layoutReducer,
    auth: authReducer,
  },
});
