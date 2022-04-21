import { createSlice } from '@reduxjs/toolkit';

export const layoutSlice = createSlice({
  name: 'layout',
  initialState: {
    error: null,
    alertList: [],
    activeUser: [],
  },
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },

    resetError: (state) => {
      state.error = null
    },


    setActiveUser: (state, action) => {
      state.activeUser = action.payload;
    },
  },

});

export const { setError, resetError, setActiveUser } = layoutSlice.actions;

export const selectError = (state) => state.layout.error;
export const selectActiveUser = (state) => state.layout.activeUser;

export default layoutSlice.reducer;
