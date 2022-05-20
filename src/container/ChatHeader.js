import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectActiveUser } from '../redux/features/layoutSlice';
import ChattingHeader from '../ui/chattingHeader/ChattingHeader';

const ChatHeader = ({ currentUserProfile }) => {
  const { id } = useParams();
  const onlineUsers = useSelector(selectActiveUser)
  const isOnline = onlineUsers.indexOf(parseInt(id)) !== -1;

  return (
    <ChattingHeader
      isOnline={isOnline}
      currentUserProfile={currentUserProfile} />
  );
};

export default ChatHeader;