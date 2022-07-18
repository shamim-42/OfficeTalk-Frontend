import { message } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getConversationsApi } from '../../api/chat';
import { selectUserProfile } from '../../redux/features/authSlice';
import { deleteSingleConversation, setActiveUser, setConversationList, updateConversationMessage, updateConversationStatus, updateOnlineGroupList } from '../../redux/features/layoutSlice';
import SidebarUI from '../../ui/sidebar/Sidebar';

const Sidebar = ({newSocket}) => {
  const userProfile = useSelector(selectUserProfile);
  const [onlineGroups, setOnlineGroups] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const dispatch = useDispatch();

  function isOnline(userid) {
    return onlineUsers.indexOf(parseInt(userid)) !== -1;
  }

  function isGroupOnline(id) {
    return onlineGroups.includes(id);
  }

  // get all conversations list
  const fetchConversationList = useCallback(async () => {
    const userId = userProfile.id;
    async function successHandler(response) {
      const res = await response.json();
      // console.log(res)
      dispatch(setConversationList(res))
    }

    async function handleBadReq(response) {
      let error = await response.json();
      message.error(error.message);
      // console.log(error.message);
    }

    return await getConversationsApi(userId, { successHandler, handleBadReq })
  }, [dispatch, userProfile])

  useEffect(() => {
    if (newSocket) {
      const userId = userProfile.id;

      newSocket.on('users/online', (allOnlineUsers) => {
        // console.log(allOnlineUsers);
        // const allOnlineUsers = users.filter(user => user !== userId)
        setOnlineUsers(allOnlineUsers)
        dispatch(setActiveUser(allOnlineUsers));
      })

      newSocket.on('groups/online', (res) => {
        // console.log(res)
        setOnlineGroups(res);
        dispatch(updateOnlineGroupList(res))
      })

      newSocket.on('isDeletedGroupMessage/' + userId, (res) => {
        const newMessage = {
          id: res.groupId,
          lastmessage: res.lastMessage,
          lastMessageTime: res.lastMessageTime,
          status: res?.lastMessageStatus,
          unreadMessages: res.unreadMessages,
        }
        // console.log(res);
        dispatch(updateConversationMessage(newMessage));
      })


      newSocket.on('message-seen-status' + userId, (res) => {
        // console.log(res);
        dispatch(updateConversationStatus(res))
      })

      newSocket.on('group/seen' + userId, (res) => {
        // console.log(res);
        const data = {
          conversationId: res.conversationId,
          users_seen: res.list,
          status: res.status
        }
        dispatch(updateConversationStatus(data))
      })

      newSocket.on('delevered/' + userId, (res) => {
        const data = {
          conversationId: (res.conversationId).toString(),
          status: res.status
        }
        // console.log(res);
        if (res.conversationId) {
          dispatch(updateConversationStatus(data))
        }
      })

      newSocket.on('group/delevered' + userId, (res) => {
        const data = {
          conversationId: res.conversationId,
          status: res.status
        }
        dispatch(updateConversationStatus(data))
        // console.log(res);
      })

      newSocket.on('isdeletedSidebar/' + userId, (res) => {
        // console.log(res)
        const newMessage = {
          id: res.userId,
          lastmessage: res.lastmessage,
          lastMessageTime: res.lastMessageTime,
          status: res.status,
          unreadMessages: res.unreadmessage,
        }
        if (!res.deleteall) {
          dispatch(updateConversationMessage(newMessage));
        } else {
          dispatch(deleteSingleConversation(res.userId))
        }
      })

    }
  }, [dispatch, newSocket, userProfile]);

  useEffect(() => {
    fetchConversationList();
  }, [fetchConversationList])


  return (
    <SidebarUI
      userProfile={userProfile}
      isGroupOnline={isGroupOnline}
      isOnline={isOnline}
      newSocket={newSocket}
    />
  );
};

export default Sidebar;