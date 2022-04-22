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

  },

});

export const { setUserProfile, setUser, resetUser } = authSlice.actions;

export const selectUserProfile = (state) => state.auth.userProfile;

export default authSlice.reducer;
