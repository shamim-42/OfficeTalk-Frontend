import { message } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { allUserListApi, friendListApi, userLogoutApi } from '../../api/auth';
import { userSearchApi } from '../../api/chat';
import { resetUserData, selectUserProfile } from '../../redux/features/authSlice';
import { setAllUsers, updateFriendList } from '../../redux/features/layoutSlice';
import SidebarHeaderUI from '../../ui/sidebar/SidebarHeader';


const SidebarHead = ({isOnline, newSocket}) => {
  const [isJoinMeetingModalVisible, setIsJoinMeetingModalVisible] = useState(false);
  const [isChatGroupModalVisible, setIsChatGroupModalVisible] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [foundUsers, setFoundUsers] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userProfile = useSelector(selectUserProfile);
  const userId = userProfile.id;
  const [friendList, setFriendList] = useState([]);

  const handleBlur = () => {
    const timer = setTimeout(() => {
      setFoundUsers([]);
    }, 200);
    return () => clearTimeout(timer);
  }


  // search user by username
  const handleChangeSearch = async (e) => {
    const value = e.target.value;

    async function successHandler(response) {
      const res = await response.json();
      setFoundUsers(res);
      // console.log(res);
    }

    async function handleBadReq(response) {
      let error = await response.json();
      console.log(error.message);
    }

    return await userSearchApi(value, { successHandler, handleBadReq })
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
      dispatch(setAllUsers(res))
    }

    async function handleBadReq(response) {
      let error = await response.json();
      console.log(error.message);
    }

    return await allUserListApi({ successHandler, handleBadReq })
  }, [dispatch]);

  // get all conversations list
  const fetchFriendList = useCallback(async () => {
    async function successHandler(response) {
      const res = await response.json();
      setFriendList(res);
      dispatch(updateFriendList(res));
      // console.log(res)
    }

    async function handleBadReq(response) {
      let error = await response.json();
      message.error(error.message);
      // console.log(error.message);
    }

    return await friendListApi(userId, { successHandler, handleBadReq })
  }, [userId, dispatch])

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
      // console.log(error.message);
      message.error(error.message);
    }
    return await userLogoutApi(userId, { successHandler, handleBadReq })
  }

  useEffect(() => {
    fetchUserList();
    fetchFriendList();
  }, [fetchUserList, fetchFriendList])

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
      friendList={friendList}
      isOnline={isOnline}
      foundUsers={foundUsers}
      handleBlur={handleBlur}
    />
  );
};

export default SidebarHead;