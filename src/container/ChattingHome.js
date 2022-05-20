import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { userActiveStatusApi } from '../api/auth';
import { getAllMessageApi, makeReadApi, sendMessageApi } from '../api/chat';
import { selectUserProfile, setCurrentUser } from '../redux/features/authSlice';
import { selectActiveUser, setUpdateConversation, setUpdateUnreadCount } from '../redux/features/layoutSlice';
import ChattingHomeUi from '../ui/chattingHome/ChattingHomeUi';
import { newSocket } from '../utils/socket';
import { getDateWiseMessages } from '../utils/utils';


const ChattingHome = () => {
  const { id } = useParams();
  const [currentUserProfile, setCurrentUserProfile] = useState({})
  const [isLoading, setIsLoading] = useState(true);
  const [messagesText, setMessagesText] = useState('')
  const [allMessage, setAllMessage] = useState([])
  const userProfile = useSelector(selectUserProfile)
  const onlineUsers = useSelector(selectActiveUser)
  const dispatch = useDispatch();
  const senderId = userProfile.id;

  // check user online status function
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

  // get current user all message list function
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

  // add or update message on conversations List
  const updateConversationList = (res) => {
    newSocket.on('message-status-at-message' + id, (msg) => {
      console.log(msg);
    })

    const newMessage = {
      users_id: parseInt(res.receiverId),
      users_profileImage: currentUserProfile.profileImage,
      users_fullname: currentUserProfile.fullname,
      message_Status_lastMessage: res?.content,
      message_Status_lastMessageTime: res?.createdAt,
      message_Status_unreadMessages: 0,
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
      updateConversationList(res.result)
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

  // Get new message from user function
  const realtimeSocket = () => {
    newSocket.on('newMessage/user/' + senderId, (msg) => {
      if (parseInt(msg.senderId) === parseInt(id)) {
        console.log(parseInt(msg.senderId), parseInt(id))
        makeReadMessage();
      }
      getAllMessage();
    })
  }


  // make message as read message 
  async function makeReadMessage() {
    newSocket.on('message-seen-status' + id, (msg) => {
      console.log("msg", msg);
    })

    const payload = {
      senderId: id,
    }
    async function successHandler(response) {
      dispatch(setUpdateUnreadCount(id))
    }

    async function handleBadReq(response) {
      let error = await response.json();
      console.log(error);
    }

    return await makeReadApi(userProfile.id, payload, { successHandler, handleBadReq })
  }


  useEffect(() => {
    getCurrentUserProfile()
    getAllMessage()
    realtimeSocket()
    makeReadMessage()
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