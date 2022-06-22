import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { checkJWTToken } from '../api/auth';
import { getConversationsApi } from '../api/chat';
import { resetUserData, selectUserProfile, selectUserToken } from '../redux/features/authSlice';
import { setActiveUser, setConversationList, setUpdateConversation, updateConversationGroupMessage, updateConversationStatus } from '../redux/features/layoutSlice';
import HomeUi from '../ui/home/HomeUi';
import { newSocket } from '../utils/socket';

const HomePage = () => {
  const [onlineUsers, setOnlineUsers] = useState([])

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userProfile = useSelector(selectUserProfile);
  const userId = userProfile.id;
  const token = useSelector(selectUserToken);


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
      type: "single"
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


    newSocket.on('newMessagesidebar/user/' + userId, (msg) => {
      console.log(msg)
      updateConversationList(msg)
    })

    newSocket.on('newMessagesidebar/group/' + userId, (res) => {
      const newMessage = {
        lastMessage: res?.content,
        groupId: res?.roomId,
        message_Status_lastMessageTime: res?.createdAt,
        name: res?.groupName,
        groupImage: res?.groupImg,
        unreadMessages: res?.unread,
        type: "group"
      }
      dispatch(updateConversationGroupMessage(newMessage))
      console.log(res)
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
    console.log("homepage");
    fetchConversationList();
    runSocketFunction();
    checkJWTTokenValidity();
    newSocket.connect();
    return () => newSocket.close();
  }, [fetchConversationList, runSocketFunction, checkJWTTokenValidity])

  return (
    <HomeUi
      userProfile={userProfile}
      onlineUsers={onlineUsers}
    />
  );
};

export default HomePage;