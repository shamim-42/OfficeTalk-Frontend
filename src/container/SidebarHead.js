import { message } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { allUserListApi, userLogoutApi } from '../api/auth';
import { resetUserData, selectUserProfile } from '../redux/features/authSlice';
import { setActiveUser, setAllUsers } from '../redux/features/layoutSlice';
import SidebarHeaderUI from '../ui/sidebar/SidebarHeader';
import { newSocket } from '../utils/socket';

const SidebarHead = () => {
  const [isJoinMeetingModalVisible, setIsJoinMeetingModalVisible] = useState(false);
  const [isChatGroupModalVisible, setIsChatGroupModalVisible] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([])
  const [users, setUsers] = useState([])
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userProfile = useSelector(selectUserProfile);
  const userId = userProfile.id;


  function isOnline(userid) {
    return onlineUsers.indexOf(parseInt(userid)) !== -1;
  }

  // update search input value
  function handleChangeSearch(value) {
    console.log(value);
  }

  // change dark mode switch value
  function onChangeSwitch(evt) {
    console.log(evt)
  }

  // All function for handle sidebar modal
  const showJoinMeetingModal = () => {
    setIsJoinMeetingModalVisible(true);
  };

  const cancelJoinMeetingModal = () => {
    setIsJoinMeetingModalVisible(false);
  };

  const showChatGroupModal = () => {
    setIsChatGroupModalVisible(true);
  };

  const handleChatGroupCancel = () => {
    setIsChatGroupModalVisible(false);
  };

  const showProfileOpenModal = () => {
    setOpenProfile(true);
  }

  const closeProfileModal = () => {
    setOpenProfile(false);
  }

  // Handle loading user list
  const fetchUserList = useCallback(async () => {
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
  }, [dispatch]);

  // handle User sign out and redirect back to login page
  async function handleLogout() {
    async function successHandler(response) {
      const res = await response.json();
      message.success(res.message);
      localStorage.removeItem("authToken");
      localStorage.removeItem("userProfile");
      navigate('/login');
      newSocket.disconnect();
      dispatch(resetUserData());
    }

    async function handleBadReq(response) {
      let error = await response.json();
      console.log(error.message);
      message.error(error.message);
    }
    return await userLogoutApi(userId, { successHandler, handleBadReq })
  }

  useEffect(() => {
    newSocket.on('users/online', (allOnlineUsers) => {
      // const allOnlineUsers = users.filter(user => user !== userId)
      setOnlineUsers(allOnlineUsers)
      dispatch(setActiveUser(allOnlineUsers));
    })
  }, [dispatch, userId]);

  useEffect(() => {
    fetchUserList()
  }, [fetchUserList])

  return (
    <SidebarHeaderUI
      handleLogout={handleLogout}
      setIsChatGroupModalVisible={setIsChatGroupModalVisible}
      isJoinMeetingModalVisible={isJoinMeetingModalVisible}
      cancelJoinMeetingModal={cancelJoinMeetingModal}
      showJoinMeetingModal={showJoinMeetingModal}
      userProfile={userProfile}
      onChangeSwitch={onChangeSwitch}
      handleChangeSearch={handleChangeSearch}
      isChatGroupModalVisible={isChatGroupModalVisible}
      showChatGroupModal={showChatGroupModal}
      handleChatGroupCancel={handleChatGroupCancel}
      showProfileOpenModal={showProfileOpenModal}
      openProfile={openProfile}
      closeProfileModal={closeProfileModal}
      users={users}
      isOnline={isOnline}
    />
  );
};

export default SidebarHead;