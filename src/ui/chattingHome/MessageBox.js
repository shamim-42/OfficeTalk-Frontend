import { Col, Row } from 'antd';
import React from 'react';
import SendMessageCard from '../chatingMessageCard/SendMessageCard';
import MessageCard from './MessageCard';

const MessageBox = (props) => {
  const { filterMessages, currentUserStatus, userProfile, isOnline } = props;
  // const messageDate = (Object.keys(filterMessages));
  // const messages = (filterMessages[Object.keys(filterMessages)]);

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
              return <MessageCard
                profile={currentUserStatus}
                message={message}
                isOnline={isOnline}
                key={message?.id}
              />
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