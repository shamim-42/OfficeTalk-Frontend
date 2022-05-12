import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectActiveUser, selectAllUser } from '../redux/features/layoutSlice';
import ChattingHomeUi from '../ui/chattingHome/ChattingHomeUi';

const ChattingHome = () => {
  const { id } = useParams();
  const users = useSelector(selectAllUser);
  const onlineUsers = useSelector(selectActiveUser);
  const currentUser = users.find((user) => user.id.toString() === id);

  function isOnline(userid) {
    return onlineUsers.indexOf(userid) !== -1;
  }

  return (
    <ChattingHomeUi isOnline={isOnline} currentUser={currentUser} />
  );
};

export default ChattingHome;