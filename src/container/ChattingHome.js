import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import io from "socket.io-client";
import { userActiveStatusApi } from '../api/auth';
import { getAllMessageApi, sendMessageApi } from '../api/chat';
import { selectUserProfile, selectUserToken } from '../redux/features/authSlice';
import { selectActiveUser, setUpdateConversation } from '../redux/features/layoutSlice';
import ChattingHomeUi from '../ui/chattingHome/ChattingHomeUi';
import { getDateWiseMessages } from '../utils/utils';


const ChattingHome = () => {
  const userToket = useSelector(selectUserToken);
  const { id } = useParams();
  const [currentUserProfile, setCurrentUserProfile] = useState({})
  const [isLoading, setIsLoading] = useState(true);
  const [messagesText, setMessagesText] = useState('')
  const [allMessage, setAllMessage] = useState([])
  const socketRef = useRef()
  const userProfile = useSelector(selectUserProfile)
  const onlineUsers = useSelector(selectActiveUser)
  const dispatch = useDispatch();
  const senderId = userProfile.id;

  function isOnline(id) {
    return onlineUsers.indexOf(id) !== -1;
  }

  // get current user profile function
  async function getCurrentUserProfile() {
    async function successHandler(response) {
      const res = await response.json();
      setCurrentUserProfile(res.user)
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

  // add message on update conversations List
  const updateConversationList = (res, send = false) => {
    let newId
    if (send) {
      newId = id;
    } else {
      newId = res.senderId
    }

    let newMessage = {
      users_id: newId,
      users_profileImage: res.senderImage || currentUserProfile.profileImage,
      users_fullname: res.senderName || currentUserProfile.fullname,
      message_Status_lastMessage: res?.content,
      message_Status_lastMessageTime: res?.createdAt,
    }
    dispatch(setUpdateConversation(newMessage))
  }

  // Send message function
  async function handleSubmitMessage() {
    const messageData = {
      message: messagesText,
      senderId: senderId,
      type: "text"
    }

    async function successHandler(response) {
      const res = await response.json();
      updateConversationList(res.result, true)
      setMessagesText('')
      getAllMessage();
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
    socketRef.current = io.connect("http://192.168.1.23:3000", {
      transports: ['websocket'],
      query: {
        token: userToket
      }
    })

    socketRef.current.on('newMessage/user/' + senderId, (msg) => {
      console.log(msg);
      updateConversationList(msg)
      getAllMessage();
    })
  }



  useEffect(() => {
    getCurrentUserProfile()
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
      currentUserProfile={currentUserProfile} />
  );
};

export default ChattingHome;