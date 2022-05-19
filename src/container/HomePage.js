import { message } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import io from "socket.io-client";
import { allUserListApi, userLogoutApi } from '../api/auth';
import { getConversationsApi } from '../api/chat';
import { resetUser, selectUserProfile, selectUserToken } from '../redux/features/authSlice';
import { setActiveUser, setAllUsers, setConversationList } from '../redux/features/layoutSlice';
import HomeUi from '../ui/home/HomeUi';

const HomePage = () => {
  const [users, setUsers] = useState([])
  const [onlineUsers, setOnlineUsers] = useState([])
  const [unreadCount, setUnreadCount] = useState('')
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userProfile = useSelector(selectUserProfile);
  const socketRef = useRef()
  const userToket = useSelector(selectUserToken);
  const userId = userProfile.id;

  function handleChangeSearch(value) {
    console.log(value);
  }

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
      socketRef.current.disconnect()
      dispatch(resetUser());
      navigate('/login');
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
    socketRef.current = io.connect("http://192.168.1.23:3000", {
      transports: ['websocket'],
      query: {
        token: userToket
      }
    })

    socketRef.current.on('users/online', (users) => {
      // console.log(users)
      const allOnlineUsers = users.filter(user => user !== userId)
      setOnlineUsers(allOnlineUsers)
      dispatch(setActiveUser(allOnlineUsers));
    })

    socketRef.current.on('unreadMessage' + userId, (res) => {
      console.log(res)
      setUnreadCount(res)
    })
  }

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