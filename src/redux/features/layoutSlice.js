import { createSlice } from '@reduxjs/toolkit';

export const layoutSlice = createSlice({
  name: 'layout',
  initialState: {
    error: null,
    alertList: [],
    userProfile: null,
  },
  reducers: {
    setError: (state, action) => {
      state.error = action.payload
    },
    resetError: (state) => {
      state.error = null
    }
  },

});

export const { setError, resetError } = layoutSlice.actions;

export const selectError = (state) => state.layout.value;

export default layoutSlice.reducer;
