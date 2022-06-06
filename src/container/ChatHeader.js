import { Affix } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectActiveUser } from '../redux/features/layoutSlice';
import ChattingHeader from '../ui/chattingHeader/ChattingHeader';

const ChatHeader = ({ currentUserProfile }) => {
  const { chatId } = useParams();
  const onlineUsers = useSelector(selectActiveUser)
  const isOnline = onlineUsers.indexOf(parseInt(chatId)) !== -1;

  return (
    <Affix offsetTop={0}>
    <ChattingHeader
      isOnline={isOnline}
      currentUserProfile={currentUserProfile} />
      </Affix>
  );
};

export default ChatHeader;