import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { userActiveStatusApi } from '../api/auth';
import { getAllMessageApi, makeReadApi, sendMessageApi } from '../api/chat';
import { selectUserProfile } from '../redux/features/authSlice';
import { selectActiveUser, setUpdateConversation, setUpdateUnreadCount } from '../redux/features/layoutSlice';
import ChattingHomeUi from '../ui/chattingHome/ChattingHomeUi';
import { newSocket } from '../utils/socket';
import { getDateWiseMessages } from '../utils/utils';


const ChattingHome = () => {
  let { chatId } = useParams();
  const [currentUserProfile, setCurrentUserProfile] = useState({})
  const [isLoading, setIsLoading] = useState(true);
  const [messagesText, setMessagesText] = useState('')
  const [allMessage, setAllMessage] = useState([])
  const userProfile = useSelector(selectUserProfile)
  const onlineUsers = useSelector(selectActiveUser)
  const dispatch = useDispatch();
  const userId = userProfile.id;

  // check user online status function
  function isOnline(id) {
    return onlineUsers.indexOf(id) !== -1;
  }

  // get current user profile function
  const getCurrentUserProfile = useCallback(async () => {
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

    return await userActiveStatusApi(chatId, { successHandler, handleBadReq })
  }, [chatId])

  // get current user all message list function
  const getAllMessage = useCallback(async () => {
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

    return await getAllMessageApi(chatId, { userId: userId }, { successHandler, handleBadReq })
  }, [userId, chatId])


  // add or update message on conversations List
  const updateConversationList = (res) => {

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
      senderId: userId,
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

    return await sendMessageApi(chatId, messageData, { successHandler, handleBadReq })
  }




  // make message as read message 
  const makeReadMessage = useCallback(async () => {
    newSocket.on('message-seen-status' + chatId, (msg) => {
      console.log("msg", msg);
    })

    const payload = {
      senderId: chatId,
    }
    async function successHandler(response) {
      dispatch(setUpdateUnreadCount(chatId))
    }

    async function handleBadReq(response) {
      let error = await response.json();
      console.log(error);
    }

    return await makeReadApi(userProfile.id, payload, { successHandler, handleBadReq })
  }, [dispatch, chatId, userProfile.id])

  useEffect(() => {
    getCurrentUserProfile()
  }, [getCurrentUserProfile])

  useEffect(() => {
    console.log(chatId)
    newSocket.on('newMessage/user/' + userId, (msg) => {
      console.log(chatId)
      if (parseInt(msg.senderId) === parseInt(chatId)) {
        // console.log(parseInt(msg.senderId), parseInt(id))
        makeReadMessage();
      }
      getAllMessage();
    })

    newSocket.on('delevered/' + userId, (res) => {
      console.log(res)
    })

  }, [chatId, makeReadMessage, getAllMessage, userId])

  useEffect(() => {
    getAllMessage()
    makeReadMessage()
  }, [getAllMessage, makeReadMessage])

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