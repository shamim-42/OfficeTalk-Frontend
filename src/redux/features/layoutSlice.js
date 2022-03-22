import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  error: null,
  alertList: [],
  userProfile: null,
};

export const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setError: (state, action) =>{
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
