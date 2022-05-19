import { createSlice } from '@reduxjs/toolkit';

export const layoutSlice = createSlice({
  name: 'layout',
  initialState: {
    error: null,
    alertList: [],
    allUsers: [],
    activeUser: [],
    conversationList: [],
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

    setConversationList: (state, action) => {
      state.conversationList = action.payload;
    },

    setAddConversation: (state, action) => {
      let newList = [...state.conversationList];
      let conversation = action.payload;
      newList.push(conversation);
      state.conversationList = newList;
    },

    setUpdateConversation: (state, action) => {
      let newList = [...state.conversationList];
      let updatedConversation = { ...action.payload };
      console.log(updatedConversation)
      let index = newList.findIndex(item => parseInt(item.users_id) === parseInt(action.payload.users_id));
      if (index === -1) {
        newList.push(updatedConversation)
      } else {
        newList.splice(index, 1);
        newList.unshift(updatedConversation)
      }
      state.conversationList = newList;
    },
  },

});

export const { setError, resetError, setAllUsers, setActiveUser, setConversationList, setAddConversation, setUpdateConversation } = layoutSlice.actions;

export const selectError = (state) => state.layout.error;
export const selectAllUser = (state) => state.layout.allUsers;
export const selectActiveUser = (state) => state.layout.activeUser;
export const selectConversationList = (state) => state.layout.conversationList;
;

export default layoutSlice.reducer;
