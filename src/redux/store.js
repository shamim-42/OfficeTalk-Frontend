import { configureStore } from '@reduxjs/toolkit';
import layoutReducer from './features/layoutSlice';

export const store = configureStore({
  reducer: {
    layout: layoutReducer,
  },
});
