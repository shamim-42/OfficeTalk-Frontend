import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { checkJWTToken } from '../api/auth';
import { getConversationsApi } from '../api/chat';
import { resetUserData, selectUserProfile, selectUserToken } from '../redux/features/authSlice';
import { setActiveUser, setConversationList, setUpdateConversation, updateConversationGroupMessage, updateConversationStatus, updateOnlineGroupList } from '../redux/features/layoutSlice';
import HomeUi from '../ui/home/HomeUi';
import { newSocket } from '../utils/socket';


const HomePage = () => {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [onlineGroups, setOnlineGroups] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userProfile = useSelector(selectUserProfile);
  const userId = userProfile.id;
  const token = useSelector(selectUserToken);


  function isOnline(userid) {
    return onlineUsers.indexOf(parseInt(userid)) !== -1;
  }

  function isGroupOnline(id) {
    return onlineGroups.includes(id);
  }

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
      image: res.senderImage,
      name: res.senderName,
      lastMessage: res?.content,
      lastMessageTime: res?.createdAt,
      unreadMessages: res.unread,
      status: 'seen',
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

    newSocket.on('groups/online', (res) => {
      setOnlineGroups(res);
      dispatch(updateOnlineGroupList(res))
    })

    newSocket.on('newMessagesidebar/user/' + userId, (msg) => {
      console.log(msg)
      updateConversationList(msg)
    })

    newSocket.on('newMessagesidebar/group/' + userId, (res) => {
      // console.log(res);
      const newMessage = {
        lastMessage: res?.content,
        groupId: res?.roomId,
        lastMessageTime: res?.createdAt,
        name: res?.groupName,
        image: res?.groupImg,
        unreadMessages: res?.unread,
        type: "group",
        status: "unseen",
        users_seen: []
      }
      dispatch(updateConversationGroupMessage(newMessage))
      // console.log(res)
    })

    newSocket.on(`isdeleted/${userId}`, (res) => {
      fetchConversationList();
    });

  }, [dispatch, updateConversationList, userId, fetchConversationList]);

  // All useEffect function below
  useEffect(() => {
    newSocket.on('message-seen-status' + userId, (res) => {
      console.log(res);
      dispatch(updateConversationStatus(res))
    })

    newSocket.on('delevered/' + userId, (res) => {
      const data = {
        conversationId: res.conversationId,
        status: res.status
      }
      dispatch(updateConversationStatus(data))
      console.log(res);
    })
  }, [userId, dispatch])

  useEffect(() => {
    fetchConversationList();
    runSocketFunction();
    checkJWTTokenValidity();
    newSocket.connect();
    return () => newSocket.close();
  }, [fetchConversationList, runSocketFunction, checkJWTTokenValidity])

  return (
    <HomeUi
      userProfile={userProfile}
      isOnline={isOnline}
      isGroupOnline={isGroupOnline}
    />
  );
};

export default HomePage;