import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { allUserListApi, userLogoutApi } from '../api/auth';
import { getConversationsApi } from '../api/chat';
import { resetUser, selectUserProfile } from '../redux/features/authSlice';
import { setActiveUser, setAllUsers, setConversationList, setUpdateConversation, updateConversationStatus } from '../redux/features/layoutSlice';
import HomeUi from '../ui/home/HomeUi';
import { newSocket } from '../utils/socket';

const HomePage = () => {
  const [users, setUsers] = useState([])
  const [onlineUsers, setOnlineUsers] = useState([])
  const [unreadCount, setUnreadCount] = useState('')
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userProfile = useSelector(selectUserProfile);
  const userId = userProfile.id;

  // update search input value
  function handleChangeSearch(value) {
    console.log(value);
  }

  // change dark mode switch value
  function onChangeSwitch(evt) {
    console.log(evt)
  }

  // Handle loading user list
  async function fetchUserList() {
    async function successHandler(response) {
      const res = await response.json();
      setUsers(res)
      dispatch(setAllUsers(res))
    }

    async function handleBadReq(response) {
      let error = await response.json();
      console.log(error.message);
    }

    return await allUserListApi({ successHandler, handleBadReq })
  }

  // get all conversations list
  async function fetchConversationList() {
    async function successHandler(response) {
      const res = await response.json();
      console.log(res)
      dispatch(setConversationList(res))
    }

    async function handleBadReq(response) {
      let error = await response.json();
      console.log(error.message);
    }

    return await getConversationsApi(userId, { successHandler, handleBadReq })
  }

  // handle User sign out and
  async function handleLogout() {

    async function successHandler(response) {
      const res = await response.json();
      message.success(res.message);
      localStorage.removeItem("authToken");
      localStorage.removeItem("userProfile");
      navigate('/login');
      newSocket.disconnect()
      dispatch(resetUser());
    }

    async function handleBadReq(response) {
      let error = await response.json();
      console.log(error.message);
      message.error(error.message);
    }

    return await userLogoutApi(userId, { successHandler, handleBadReq })
  }


  // Get all online users function
  const getOnlineUsers = () => {
    newSocket.on('users/online', (users) => {
      const allOnlineUsers = users.filter(user => user !== userId)
      setOnlineUsers(allOnlineUsers)
      dispatch(setActiveUser(allOnlineUsers));
    })

    newSocket.on('unreadMessage' + userId, (res) => {
      console.log(res)
      setUnreadCount(res)
    })

    newSocket.on('newMessage/user/' + userId, (msg) => {
      updateConversationList(msg)
    })
  }

  // add or update message on conversations List
  const updateConversationList = (res) => {

    const newMessage = {
      users_id: res.senderId,
      users_profileImage: res.senderImage,
      users_fullname: res.senderName,
      message_Status_lastMessage: res?.content,
      message_Status_lastMessageTime: res?.createdAt,
      message_Status_unreadMessages: res.unread,
      message_Status_status: 'seen',
    }
    dispatch(setUpdateConversation(newMessage))
  }

  useEffect(() => {
    newSocket.on('message-seen-status' + userId, (res) => {
      dispatch(updateConversationStatus(res))
    })
  }, [userId, dispatch])

  useEffect(() => {
    fetchUserList()
    fetchConversationList()
    getOnlineUsers()
  }, [])

  return (
    <HomeUi
      userProfile={userProfile}
      handleLogout={handleLogout}
      handleChangeSearch={handleChangeSearch}
      onChangeSwitch={onChangeSwitch}
      onlineUsers={onlineUsers}
      unreadCount={unreadCount}
      users={users} />
  );
};

export default HomePage;