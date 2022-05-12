import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { userActiveStatusApi } from '../api/auth';
import { sendMessageApi } from '../api/chat';
import ChattingHomeUi from '../ui/chattingHome/ChattingHomeUi';
import { selectUserProfile } from '../redux/features/authSlice';

const ChattingHome = () => {
  const { id } = useParams();
  const [currentUserStatus, setCurrentUserStatus] = useState({})
  const [messagesText, setMessagesText] = useState('')
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
      console.log(res)
    }

    async function handleBadReq(response) {
      let error = await response.json();
      console.log(error.message);
    }

    return await sendMessageApi(id, messageData, { successHandler, handleBadReq })
  }

  useEffect(() => {
    getOnlineUserStatus()
  }, [id])

  return (
    <ChattingHomeUi handleSubmitMessage={handleSubmitMessage} setMessagesText={setMessagesText} currentUserStatus={currentUserStatus} />
  );
};

export default ChattingHome;