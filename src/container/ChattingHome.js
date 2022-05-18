import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import io from "socket.io-client";
import { userActiveStatusApi } from '../api/auth';
import { getAllMessageApi, sendMessageApi } from '../api/chat';
import { selectUserProfile, selectUserToken } from '../redux/features/authSlice';
import { selectActiveUser, selectConversationList, setAddConversation, setUpdateConversation } from '../redux/features/layoutSlice';
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

  console.log(conversationsList);

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
  const addConversation = (res) => {
    let newMessage = {
      users_id: res?.result?.receiverId,
      users_profileImage: res?.user?.profileImage,
      users_fullname: res?.user?.fullname,
      message_Status_lastMessage: res?.result?.content,
      message_Status_lastMessageTime: res?.result?.createdAt,
    }
    dispatch(setUpdateConversation(newMessage))
  }

  const addRechieveMessage = (res) => {
    const newMessage = {
      users_id: res?.senderId,
      users_profileImage: res?.senderImage,
      users_fullname: res?.senderName,
      message_Status_lastMessage: res?.content,
      message_Status_lastMessageTime: res?.createdAt,
    }
    dispatch(setUpdateConversation(newMessage))
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
      addRechieveMessage(msg)
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