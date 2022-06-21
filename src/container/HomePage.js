import { message } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { allUserListApi, checkJWTToken, userLogoutApi } from '../api/auth';
import { getConversationsApi } from '../api/chat';
import { resetUserData, selectUserProfile, selectUserToken } from '../redux/features/authSlice';
import { setActiveUser, setAllUsers, setConversationList, setUpdateConversation, updateConversationStatus } from '../redux/features/layoutSlice';
import HomeUi from '../ui/home/HomeUi';
import { newSocket } from '../utils/socket';

const HomePage = () => {
  const [users, setUsers] = useState([])
  const [onlineUsers, setOnlineUsers] = useState([])
  const [unreadCount, setUnreadCount] = useState('')
  const [isJoinMeetingModalVisible, setIsJoinMeetingModalVisible] = useState(false);
  const [isChatGroupModalVisible, setIsChatGroupModalVisible] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userProfile = useSelector(selectUserProfile);
  const token = useSelector(selectUserToken);
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

  const checkJWTTokenValidity = useCallback(async () => {
    const payload = {
      token: token,
    }
    async function successHandler(response) {
      const res = await response.json();
      if (!res.message) {
        dispatch(resetUserData())
        navigate('/login');
      }
      // console.log(res)
    }

    async function handleBadReq(response) {
      let error = await response.json();
      console.log(error.message);
    }

    return await checkJWTToken(payload, { successHandler, handleBadReq })
  }, [token, dispatch, navigate])

  // get all conversations list
  const fetchConversationList = useCallback(async () => {
    async function successHandler(response) {
      const res = await response.json();
      // console.log(res)
      dispatch(setConversationList(res))
    }

    async function handleBadReq(response) {
      let error = await response.json();
      console.log(error.message);
    }

    return await getConversationsApi(userId, { successHandler, handleBadReq })
  }, [dispatch, userId])

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

  // add or update message on conversations List
  const updateConversationList = useCallback((res) => {

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
  }, [dispatch])

  // Run socket connection with this function
  const runSocketFunction = useCallback(() => {
    newSocket.on('users/online', (users) => {
      const allOnlineUsers = users.filter(user => user !== userId)
      setOnlineUsers(allOnlineUsers)
      dispatch(setActiveUser(allOnlineUsers));
    })

    newSocket.on('unreadMessage' + userId, (res) => {
      console.log(res)
      setUnreadCount(res)
    })

    newSocket.on('newMessagesidebar/user/' + userId, (msg) => {
      updateConversationList(msg)
    })

    newSocket.on(`isdeleted/${userId}`, (res) => {
      fetchConversationList();
    });
  }, [dispatch, updateConversationList, userId, fetchConversationList]);

  // All useEffect function below
  useEffect(() => {
    newSocket.on('message-seen-status' + userId, (res) => {
      dispatch(updateConversationStatus(res))
    })
  }, [userId, dispatch])

  useEffect(() => {
    fetchUserList();
    fetchConversationList();
    runSocketFunction();
    checkJWTTokenValidity();
    newSocket.connect();
    return () => newSocket.close();
  }, [fetchUserList, fetchConversationList, runSocketFunction, checkJWTTokenValidity])

  return (
    <HomeUi
      userProfile={userProfile}
      handleLogout={handleLogout}
      handleChangeSearch={handleChangeSearch}
      onChangeSwitch={onChangeSwitch}
      isJoinMeetingModalVisible={isJoinMeetingModalVisible}
      onlineUsers={onlineUsers}
      cancelJoinMeetingModal={cancelJoinMeetingModal}
      showJoinMeetingModal={showJoinMeetingModal}
      unreadCount={unreadCount}
      isChatGroupModalVisible={isChatGroupModalVisible}
      showChatGroupModal={showChatGroupModal}
      handleChatGroupCancel={handleChatGroupCancel}
      setIsChatGroupModalVisible={setIsChatGroupModalVisible}
      users={users} />
  );
};

export default HomePage;