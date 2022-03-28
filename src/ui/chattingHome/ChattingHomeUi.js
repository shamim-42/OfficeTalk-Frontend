import React from 'react';
import ChattingHeader from '../chattingHeader/ChattingHeader';

const ChattingHomeUi = (props) => {
  const { currentUser } = props;
  return (
    <ChattingHeader currentUser={currentUser} />
  );
};

export default ChattingHomeUi;