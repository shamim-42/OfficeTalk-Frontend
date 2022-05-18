import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import io from "socket.io-client";
import { userActiveStatusApi } from '../api/auth';
import { getAllMessageApi, sendMessageApi } from '../api/chat';
import { selectUserProfile, selectUserToken } from '../redux/features/authSlice';
import { selectActiveUser, selectConversationList, setConversationList } from '../redux/features/layoutSlice';
import ChattingHomeUi from '../ui/chattingHome/ChattingHomeUi';
import { getDateWiseMessages } from '../utils/utils';


const ChattingHome = () => {
  const userToket = useSelector(selectUserToken);
  const { id } = useParams();
  const [currentUserStatus, setCurrentUserStatus] = useState({})
  const [isLoading, setIsLoading] = useState(true);
  const [messagesText, setMessagesText] = useState('')
  const [allMessage, setAllMessage] = useState([])
  const socketRef = useRef()
  const userProfile = useSelector(selectUserProfile)
  const onlineUsers = useSelector(selectActiveUser)
  const conversationsList = useSelector(selectConversationList);
  const dispatch = useDispatch();
  const senderId = userProfile.id;


  function isOnline(id) {
    return onlineUsers.indexOf(id) !== -1;
  }


  // get user online status function
  async function getOnlineUserStatus() {
    async function successHandler(response) {
      const res = await response.json();
      setCurrentUserStatus(res)
      setIsLoading(false);
    }

    async function handleBadReq(response) {
      let error = await response.json();
      console.log(error.message);
      setIsLoading(false);
    }

    return await userActiveStatusApi(id, { successHandler, handleBadReq })
  }

  // get all message function
  async function getAllMessage() {
    async function successHandler(response) {
      const res = await response.json();
      let sortedData = getDateWiseMessages(res)
      setIsLoading(false)
      setAllMessage(sortedData)
    }

    async function handleBadReq(response) {
      let error = await response.json();
      console.log(error)
      setIsLoading(false);
    }

    return await getAllMessageApi(id, { userId: senderId }, { successHandler, handleBadReq })
  }

  // add message on conversations List
  const addConversation = (res, send = true) => {
    const newConversation = [...conversationsList];
    console.log(conversationsList)
    let newMessage = {}
    if (send) {
      newMessage = {
        message_Status_usersId: res?.user?.id,
        users_profileImage: res?.user?.profileImage,
        users_fullname: res?.user?.fullname,
        message_Status_lastMessage: res?.result?.content,
        message_Status_lastMessageTime: res?.result?.createdAt,
      }
    } else {
      newMessage = {
        message_Status_usersId: res?.senderId,
        users_profileImage: res?.senderImage,
        users_fullname: res?.senderName,
        message_Status_lastMessage: res?.content,
        message_Status_lastMessageTime: res?.createdAt,
      }
    }

    if (conversationsList.length > 0) {
      for (let i = 0; i < newConversation.length; i++) {
        if ((newConversation[i]?.message_Status_usersId === res?.user?.id) || (newConversation[i]?.message_Status_usersId === res?.senderId)) {
          console.log("first")
          newConversation[i] = newMessage;
          dispatch(setConversationList(newConversation))
          return
        }
      }
      newConversation.push(newMessage);
    } else {
      console.log("first 0")
      newConversation.push(newMessage);
    }
    dispatch(setConversationList(newConversation))
  }

  // Send message function
  async function handleSubmitMessage() {
    // setIsLoading(true);
    const messageData = {
      message: messagesText,
      senderId: senderId,
      type: "text"
    }

    async function successHandler(response) {
      const res = await response.json();
      addConversation(res)
      setMessagesText('')
      getAllMessage();
      // setIsLoading(false);
    }

    async function handleBadReq(response) {
      let error = await response.json();
      console.log(error.message);
      setIsLoading(false);
    }

    return await sendMessageApi(id, messageData, { successHandler, handleBadReq })
  }


  // Get all online users function
  const getMessage = () => {
    socketRef.current = io.connect("http://192.168.1.16:3000", {
      transports: ['websocket'],
      query: {
        token: userToket
      }
    })

    socketRef.current.on('newMessage/user/' + senderId, (msg) => {
      getAllMessage();
      addConversation(msg, false);
      console.log(msg)
    })
  }



  useEffect(() => {
    getOnlineUserStatus()
    getAllMessage()
    getMessage()
    return () => socketRef.current.disconnect();
  }, [id])

  return (

    <ChattingHomeUi
      handleSubmitMessage={handleSubmitMessage}
      messagesText={messagesText}
      setMessagesText={setMessagesText}
      allMessage={allMessage}
      userProfile={userProfile}
      isOnline={isOnline}
      isLoading={isLoading}
      currentUserStatus={currentUserStatus} />
  );
};

export default ChattingHome;