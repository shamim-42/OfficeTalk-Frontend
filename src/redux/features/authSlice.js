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
    currentGroup: null,
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

    resetUserData: (state) => {
      state.user = null;
      state.userProfile = null;
      if (typeof window !== "undefined") {
        localStorage.setItem("authToken", JSON.stringify({}));
        localStorage.setItem("userProfile", JSON.stringify({}));
      }
    },

    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },

    setCurrentGroup: (state, action) => {
      state.currentGroup = action.payload;
    }

  },

});

export const { setUserProfile, setUser, resetUserData, setCurrentUser, setCurrentGroup } = authSlice.actions;

export const selectUserProfile = (state) => state.auth.userProfile;
export const selectUserToken = (state) => state.auth.user;
export const selectCurrentUser = (state) => state.auth.currentUser;
export const selectCurrentGroup = (state) => state.auth.currentGroup;

export default authSlice.reducer;
