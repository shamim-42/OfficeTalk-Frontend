import { Spin } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import io from "socket.io-client";
import { userActiveStatusApi } from '../api/auth';
import { getAllMessageApi, sendMessageApi } from '../api/chat';
import { selectUserProfile, selectUserToken } from '../redux/features/authSlice';
import { selectActiveUser } from '../redux/features/layoutSlice';
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
    socketRef.current = io.connect("http://192.168.1.24:3000", {
      transports: ['websocket'],
      query: {
        token: userToket
      }
    })

    socketRef.current.on('newMessage/user/' + senderId, (msg) => {
      getAllMessage();
      console.log(msg)
    })
  }

  const timeFormat = (time, date) => {
    const combineTime = date.toString() + "T" + time.toString()
    const newTime = new Date(combineTime).toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' });
    return newTime;
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
      timeFormat={timeFormat}
      setMessagesText={setMessagesText}
      allMessage={allMessage}
      userProfile={userProfile}
      isOnline={isOnline}
      isLoading={isLoading}
      currentUserStatus={currentUserStatus} />
  );
};

export default ChattingHome;