import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectActiveUser } from '../redux/features/layoutSlice';
import ChattingHomeUi from '../ui/chattingHome/ChattingHomeUi';

const ChattingHome = () => {
  const { id } = useParams();
  const users = useSelector(selectActiveUser);
  const currentUser = users.find((user) => user.id.toString() === id);

  return (
    <ChattingHomeUi currentUser={currentUser} />
  );
};

export default ChattingHome;