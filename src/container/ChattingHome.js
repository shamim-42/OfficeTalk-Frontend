import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { userActiveStatusApi } from '../api/auth';
import { sendMessageApi } from '../api/chat';
import ChattingHomeUi from '../ui/chattingHome/ChattingHomeUi';
import { selectUserProfile, selectUserToken } from '../redux/features/authSlice';
import io from "socket.io-client";


const ChattingHome = () => {
  const userToket = useSelector(selectUserToken);
  const { id } = useParams();
  const [currentUserStatus, setCurrentUserStatus] = useState({})
  const [messagesText, setMessagesText] = useState('')
  const [recheivedMessagesText, setRecheivedMessagesText] = useState({})
  const socketRef = useRef()
  const userProfile = useSelector(selectUserProfile)
  const senderId = userProfile.id;

  // get user online status function
  async function getOnlineUserStatus() {
    async function successHandler(response) {
      const res = await response.json();
      setCurrentUserStatus(res)
      // console.log(res)
    }

    async function handleBadReq(response) {
      let error = await response.json();
      console.log(error.message);
    }

    return await userActiveStatusApi(id, { successHandler, handleBadReq })
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
      // console.log(res)
    }

    async function handleBadReq(response) {
      let error = await response.json();
      console.log(error.message);
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
      setRecheivedMessagesText(msg)
      console.log(msg)
    })
  }



  useEffect(() => {
    getOnlineUserStatus()
    getMessage()

    return () => socketRef.current.disconnect()
  }, [])

  return (
    <ChattingHomeUi handleSubmitMessage={handleSubmitMessage} setMessagesText={setMessagesText} currentUserStatus={currentUserStatus} />
  );
};

export default ChattingHome;