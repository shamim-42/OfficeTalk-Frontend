import { createSlice } from '@reduxjs/toolkit';

export const layoutSlice = createSlice({
  name: 'layout',
  initialState: {
    error: null,
    alertList: [],
    allUsers: [],
    friendList: [],
    activeUser: [],
    conversationList: [],
    onlineGroups: [],
    loading: false,
  },
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },

    updateLoading: (state, action) => {
      state.loading = action.payload;
    },

    resetError: (state) => {
      state.error = null
    },

    setAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },

    updateFriendList: (state, action) => {
      state.friendList = action.payload;
    },

    setActiveUser: (state, action) => {
      state.activeUser = action.payload;
    },

    updateOnlineGroupList: (state, action) => {
      state.onlineGroups = action.payload;
    },

    setConversationList: (state, action) => {
      state.conversationList = action.payload;
    },

    setAddConversation: (state, action) => {
      let newList = [...state.conversationList];
      let conversation = action.payload;
      newList.unshift(conversation);
      state.conversationList = newList;
    },

    setUpdateConversation: (state, action) => {
      let newList = [...state.conversationList];
      let updatedConversation = { ...action.payload };
      let index = newList.findIndex(item => parseInt(item.users_id) === parseInt(action.payload.users_id));

      updatedConversation.image = newList[index]?.image;
      if (index === -1) {
        newList.unshift(updatedConversation);
      } else {
        newList.splice(index, 1);
        newList.unshift(updatedConversation)
      }
      state.conversationList = newList;
    },

    updateConversationStatus: (state, action) => {
      let newList = JSON.parse(JSON.stringify([...state.conversationList]));
      const newStatus = (action.payload);
      let index = newList?.findIndex((item) => (item?.id).toString() === (newStatus?.conversationId)?.toString());
      if (index !== -1) {
        newList[index].status = newStatus?.status;
        newList[index].unreadMessages = 0;
        if (action.payload.users_seen) {
          newList[index].users_seen = newStatus?.users_seen;
        }
      }
      state.conversationList = newList;
    },


    deleteSingleConversation: (state, action) => {
      let newList = [...state.conversationList];
      let index = newList.findIndex(item => parseInt(item.users_id) === parseInt(action.payload));
      if (index > -1) {
        newList.splice(index, 1);
      }
      state.conversationList = newList;
    },

    updateConversationMessage: (state, action) => {
      let newList = [...state.conversationList];
      let updatedData = { ...action.payload };
      let index = newList.findIndex(item =>
        (parseInt(item.users_id) === parseInt(updatedData.id)) || (parseInt(item.groupId) === parseInt(updatedData.id))
      );
      if (index > -1) {
        newList[index].lastMessage = updatedData.lastmessage;
        newList[index].lastMessageTime = updatedData.lastMessageTime;
        newList[index].status = updatedData.status;
        newList[index].unreadMessages = updatedData.unreadMessages;
      }
      state.conversationList = newList;
    },

    updateConversationGroupStatus: (state, action) => {
      let newList = [...state.conversationList];
      let index = newList.findIndex(item => parseInt(item.groupId) === parseInt(action.payload.groupId));
      if (index > -1) {
        newList[index].status = action.payload.status;
        newList[index].unreadMessages = action.payload.unreadMessages;
      }
      state.conversationList = newList;
    },

    updateConversationGroupSeen: (state, action) => {
      let newList = [...state.conversationList];
      let index = newList.findIndex(item => parseInt(item.groupId) === parseInt(action.payload.groupId));
      if (index > -1) {
        newList[index].users_seen = action.payload.users_seen;
      }
      state.conversationList = newList;
    },


    updateConversationGroupMessage: (state, action) => {
      let newList = [...state.conversationList];
      let updatedData = { ...action.payload };
      let index = newList.findIndex(item => parseInt(item.groupId) === parseInt(action.payload.groupId));
      if (index > -1) {
        const oldItem = JSON.parse(JSON.stringify(newList[index]));
        oldItem.lastMessage = updatedData.lastMessage;
        oldItem.lastMessageTime = updatedData.lastMessageTime;
        oldItem.unreadMessages = updatedData.unreadMessages;
        oldItem.status = updatedData.status;
        newList.splice(index, 1);
        newList.unshift(oldItem)
      }
      state.conversationList = newList;
    },

    setUpdateUnreadCount: (state, action) => {
      let newList = [...state.conversationList];
      let index = newList.findIndex(item => parseInt(item.users_id) === parseInt(action.payload));
      if (index === -1) {
        return
      } else {
        newList[index].unreadMessages = 0;
      }
      state.conversationList = newList;
    }
  },

});

export const { setError, resetError, setAllUsers, setActiveUser, setConversationList, setAddConversation, setUpdateConversation, setUpdateUnreadCount, updateConversationStatus, deleteSingleConversation, updateConversationMessage, updateFriendList, updateConversationGroupMessage, updateOnlineGroupList, updateConversationGroupStatus, updateConversationGroupSeen, updateLoading } = layoutSlice.actions;

export const selectError = (state) => state.layout.error;
export const selectLoading = (state) => state.layout.loading;
export const selectAllUser = (state) => state.layout.allUsers;
export const selectFriendList = (state) => state.layout.friendList;
export const selectActiveUser = (state) => state.layout.activeUser;
export const selectOnlineGroups = (state) => state.layout.onlineGroups;
export const selectConversationList = (state) => state.layout.conversationList;
;

export default layoutSlice.reducer;
