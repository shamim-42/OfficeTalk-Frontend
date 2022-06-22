import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { allUserListApi, checkJWTToken } from '../api/auth';
import { getConversationsApi } from '../api/chat';
import { resetUserData, selectUserProfile, selectUserToken } from '../redux/features/authSlice';
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
  const token = useSelector(selectUserToken);

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

  // Check JWT token validity function
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
      console.log(res)
      dispatch(setConversationList(res))
    }

    async function handleBadReq(response) {
      let error = await response.json();
      console.log(error.message);
    }

    return await getConversationsApi(userId, { successHandler, handleBadReq })
  }, [dispatch, userId])

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
      onlineUsers={onlineUsers}
      users={users} />
  );
};

export default HomePage;