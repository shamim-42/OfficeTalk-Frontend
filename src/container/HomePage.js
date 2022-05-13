import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { allUserListApi, userLogoutApi } from '../api/auth';
import { resetUser, selectUserProfile, selectUserToken } from '../redux/features/authSlice';
import { setActiveUser, setAllUsers } from '../redux/features/layoutSlice';
import HomeUi from '../ui/home/HomeUi';
import io from "socket.io-client";

const HomePage = () => {
  const [users, setUsers] = useState([])
  const [onlineUsers, setOnlineUsers] = useState([])
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userProfile = useSelector(selectUserProfile);
  const socketRef = useRef()
  const userToket = useSelector(selectUserToken);


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

  // handle User sign out and
  async function handleLogout() {
    const userId = userProfile.id;

    async function successHandler(response) {
      const res = await response.json();
      console.log(res.message);
      localStorage.removeItem("authToken");
      localStorage.removeItem("userProfile");
      socketRef.current.disconnect()
      dispatch(resetUser());
      navigate('/login');
    }

    async function handleBadReq(response) {
      let error = await response.json();
      console.log(error.message);
    }

    return await userLogoutApi(userId, { successHandler, handleBadReq })
  }


  // Get all online users function
  const getOnlineUsers = () => {
    socketRef.current = io.connect("http://192.168.1.24:3000", {
      transports: ['websocket'],
      query: {
        token: userToket
      }
    })

    socketRef.current.on('users/online', (usersId) => {
      setOnlineUsers(usersId)
      dispatch(setActiveUser(usersId));
    })
  }


  useEffect(() => {
    fetchUserList()
    getOnlineUsers()
  }, [])

  return (
    <HomeUi
      userProfile={userProfile}
      handleLogout={handleLogout}
      handleChangeSearch={handleChangeSearch}
      onChangeSwitch={onChangeSwitch}
      onlineUsers={onlineUsers}
      users={users} />
  );
};

export default HomePage;