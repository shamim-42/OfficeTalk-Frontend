import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userProfile: typeof window !== "undefined" && localStorage.getItem("userProfile")
      ? JSON.parse(localStorage.getItem("userProfile"))
      : null,
    user: typeof window !== "undefined" && localStorage.getItem("authToken")
      ? JSON.parse(localStorage.getItem("authToken"))
      : null,
    currentUser: null,
  },
  reducers: {
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
      localStorage.setItem("userProfile", JSON.stringify(state.userProfile));
    },

    setUser: (state, action) => {
      state.user = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("authToken", JSON.stringify(state.user));
      }
    },

    resetUser: (state) => {
      state.user = null;
    },

    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    }

  },

});

export const { setUserProfile, setUser, resetUser, setCurrentUser } = authSlice.actions;

export const selectUserProfile = (state) => state.auth.userProfile;
export const selectUserToken = (state) => state.auth.user;
export const selectCurrentUser = (state) => state.auth.currentUser;

export default authSlice.reducer;
