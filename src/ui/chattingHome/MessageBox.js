import { Col, Row } from 'antd';
import React, { useState } from 'react';
import ChatingMessageCard from '../chatingMessageCard/ChatingMessageCard';
import SendMessageCard from '../chatingMessageCard/SendMessageCard';

const MessageBox = (props) => {
  const { filterMessages, currentUserStatus, userProfile, isOnline } = props;
  // const messageDate = (Object.keys(filterMessages));
  // const messages = (filterMessages[Object.keys(filterMessages)]);
  const [popoverVisible, setPopoverVisible] = useState('');

  function handlePopoverVisiblity(isOpen, msgId) {
    if(isOpen) {
      setPopoverVisible(msgId);
    } else {
      setPopoverVisible("")
    }
  }
  
  return (
    <>
      <Row className="chatting-date">
        <Col span={6} className="chatting-date-card">
          {filterMessages?.date}
        </Col>
      </Row>
      <div className="message-list">
        {
          filterMessages?.messages.length > 0 && filterMessages?.messages.map((message) => {
            if (message?.senderId !== userProfile.id) {
              return <ChatingMessageCard
                profile={currentUserStatus}
                message={message}
                isOnline={isOnline}
                key={message?.id} 
                visible={(message.id === popoverVisible)}
                handleVisibleChange={(isOpen)=>handlePopoverVisiblity(isOpen, message.id)}/>
            } else {
              return <SendMessageCard
                profile={userProfile}
                isOnline={isOnline}
                message={message}
                key={message.id} />
            }
          })
        }
      </div>
    </>
  );
};

export default MessageBox;