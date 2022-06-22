import { message } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userLogoutApi } from '../api/auth';
import { resetUserData, selectUserProfile } from '../redux/features/authSlice';
import SidebarHeaderUI from '../ui/sidebar/SidebarHeader';
import { newSocket } from '../utils/socket';

const SidebarHead = () => {
  const [isJoinMeetingModalVisible, setIsJoinMeetingModalVisible] = useState(false);
  const [isChatGroupModalVisible, setIsChatGroupModalVisible] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
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
    />
  );
};

export default SidebarHead;