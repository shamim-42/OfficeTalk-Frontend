import { configureStore } from '@reduxjs/toolkit';
import layoutReducer from '../features/layout/layoutSlice';

export const store = configureStore({
  reducer: {
    layout: layoutReducer,
  },
});
