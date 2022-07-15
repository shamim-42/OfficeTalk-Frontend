import { message, notification } from 'antd';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { checkJWTToken } from '../api/auth';
import { getConversationsApi } from '../api/chat';
import useSocket from '../hooks/useSocket';
import { resetUserData, selectUserProfile, selectUserToken } from '../redux/features/authSlice';
import { deleteSingleConversation, setActiveUser, setConversationList, setUpdateConversation, updateConversationGroupMessage, updateConversationMessage, updateConversationStatus, updateOnlineGroupList } from '../redux/features/layoutSlice';
import HomeUi from '../ui/home/HomeUi';


const HomePage = () => {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [onlineGroups, setOnlineGroups] = useState([]);
  const { socket: newSocket } = useSocket();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userProfile = useSelector(selectUserProfile);
  const token = useSelector(selectUserToken);
  const Audio = useRef();

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
      message.error(error.message);
      // console.log(error.message);
    }

    return await checkJWTToken(payload, { successHandler, handleBadReq })
  }, [token, dispatch, navigate])

  // get all conversations list
  const fetchConversationList = useCallback(async () => {
    const userId = userProfile.id;
    async function successHandler(response) {
      const res = await response.json();
      // console.log(res)
      dispatch(setConversationList(res))
    }

    async function handleBadReq(response) {
      let error = await response.json();
      message.error(error.message);
      // console.log(error.message);
    }

    return await getConversationsApi(userId, { successHandler, handleBadReq })
  }, [dispatch, userProfile])

  useEffect(() => {
    if (userProfile && newSocket) {
      const userId = userProfile.id;
      newSocket.connect();

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
        notification.info({
          message: 'You have got a new message!',
        });
        // Play the sound.
        // console.log(msg)
        const newMessage = {
          users_id: msg.senderId,
          image: msg.senderImage,
          name: msg.senderName,
          lastMessage: msg?.content,
          lastMessageTime: msg?.createdAt,
          unreadMessages: msg.unread,
          status: 'seen',
          type: "single"
        }
        Audio?.current?.play();
        dispatch(setUpdateConversation(newMessage))
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
      })

      newSocket.on('message-seen-status' + userId, (res) => {
        // console.log(res);
        dispatch(updateConversationStatus(res))
      })

      newSocket.on('group/seen' + userId, (res) => {
        // console.log(res);
        const data = {
          conversationId: res.conversationId,
          users_seen: res.list,
          status: res.status
        }
        dispatch(updateConversationStatus(data))
      })

      newSocket.on('delevered/' + userId, (res) => {
        const data = {
          conversationId: (res.conversationId).toString(),
          status: res.status
        }
        // console.log(res);
        if (res.conversationId) {
          dispatch(updateConversationStatus(data))
        }
      })

      newSocket.on('group/delevered' + userId, (res) => {
        const data = {
          conversationId: res.conversationId,
          status: res.status
        }
        dispatch(updateConversationStatus(data))
        // console.log(res);
      })

      newSocket.on('isdeletedSidebar/' + userId, (res) => {
        // console.log(res)
        const newMessage = {
          id: res.userId,
          lastmessage: res.lastmessage,
          lastMessageTime: res.lastMessageTime,
          status: res.status,
          unreadMessages: res.unreadmessage,
        }
        if (!res.deleteall) {
          dispatch(updateConversationMessage(newMessage));
        } else {
          dispatch(deleteSingleConversation(res.userId))
        }
      })

      newSocket.on('isDeletedGroupMessage/' + userId, (res) => {
        const newMessage = {
          id: res.groupId,
          lastmessage: res.lastMessage,
          lastMessageTime: res.lastMessageTime,
          status: res?.lastMessageStatus,
          unreadMessages: res.unreadMessages,
        }
        // console.log(res);
        dispatch(updateConversationMessage(newMessage));
      })
    }

    return () => {
      if (newSocket) {
        newSocket.close();
        newSocket.off('users/online');
        newSocket.off('groups/online');
      }
    };
  }, [dispatch, newSocket, userProfile])

  // All useEffect function below
  useEffect(() => {
    fetchConversationList();
    checkJWTTokenValidity();
  }, [fetchConversationList, checkJWTTokenValidity])

  return (
    <HomeUi
      userProfile={userProfile}
      isOnline={isOnline}
      isGroupOnline={isGroupOnline}
      Audio={Audio}
    />
  );
};

export default HomePage;