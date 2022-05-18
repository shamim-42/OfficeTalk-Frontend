import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { userActiveStatusApi } from '../api/auth';
import { selectActiveUser } from '../redux/features/layoutSlice';
import ChattingHeader from '../ui/chattingHeader/ChattingHeader';

const ChatHeader = () => {
  const { id } = useParams();
  const onlineUsers = useSelector(selectActiveUser)
  const [currentUserStatus, setCurrentUserStatus] = useState({})



  const isOnline = onlineUsers.indexOf(parseInt(id)) !== -1;


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

  


  useEffect(() => {
    getOnlineUserStatus()
  }, [id, isOnline])

  return (
    <ChattingHeader 
    isOnline={isOnline}
     currentUserStatus={currentUserStatus} />
  );
};

export default ChatHeader;