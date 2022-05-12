import { createSlice } from '@reduxjs/toolkit';

export const layoutSlice = createSlice({
  name: 'layout',
  initialState: {
    error: null,
    alertList: [],
    allUsers: [],
    activeUser: [],
  },
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },

    resetError: (state) => {
      state.error = null
    },


    setAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },

    setActiveUser: (state, action) => {
      state.activeUser = action.payload;
    },
  },

});

export const { setError, resetError, setAllUsers, setActiveUser } = layoutSlice.actions;

export const selectError = (state) => state.layout.error;
export const selectAllUser = (state) => state.layout.allUsers;
export const selectActiveUser = (state) => state.layout.activeUser;

export default layoutSlice.reducer;
