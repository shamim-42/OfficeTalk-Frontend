import { message, notification } from 'antd';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import socketio from "socket.io-client";
import { checkJWTToken } from '../api/auth';
import { resetUserData, selectUserProfile, selectUserToken } from '../redux/features/authSlice';
import { setUpdateConversation, updateConversationGroupMessage } from '../redux/features/layoutSlice';
import HomeUi from '../ui/home/HomeUi';


const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userProfile = useSelector(selectUserProfile);
  const token = useSelector(selectUserToken);
  const [newSocket, initSocket] = useState(null);
  const Audio = useRef();

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


  useEffect(() => {
    if (userProfile && newSocket) {
      newSocket.connect();
      const userId = userProfile.id;

      newSocket.on('newMessagesidebar/user/' + userId, (msg) => {
        notification.info({
          message: 'You have got a new message!',
        });
        // Play the sound.
        console.log(msg)
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
    }

    return () => {
      if (newSocket) {
        newSocket.close();
      }
    };
  }, [dispatch, newSocket, userProfile])

  // All useEffect function below
  useEffect(() => {
    checkJWTTokenValidity();
  }, [checkJWTTokenValidity]);

  useEffect(() => {
    if (token) {
      const newSocket = socketio(`${process.env.REACT_APP_BASE_URL}:3000`, {
        transports: ['websocket'],
        query: {
          token: token
        }
      })
      initSocket(newSocket);
    }
  }, [token])

  return (
    <HomeUi
      Audio={Audio}
      newSocket={newSocket}
    />
  );
};

export default HomePage;