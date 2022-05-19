import { Col, Row } from 'antd';
import React from 'react';
import ChatingMessageCard from '../chatingMessageCard/ChatingMessageCard';
import SendMessageCard from '../chatingMessageCard/SendMessageCard';

const MessageBox = (props) => {
  const { filterMessages, currentUserStatus, userProfile, isOnline } = props;
  const messageDate = (Object.keys(filterMessages))
  const messages = (filterMessages[Object.keys(filterMessages)])

  return (
    <>
      <Row className="chatting-date">
        <Col span={6} className="chatting-date-card">
          {new Date(messageDate).toDateString()}
        </Col>
      </Row>
      <div className="message-list">
        {
          messages.length > 0 && messages.slice(0).reverse().map((message) => {
            if (message?.senderId !== userProfile.id) {
              return <ChatingMessageCard
                profile={currentUserStatus}
                message={message}
                isOnline={isOnline}
                key={message?.id} />
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