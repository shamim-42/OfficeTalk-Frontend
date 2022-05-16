import { SearchOutlined } from '@ant-design/icons';
import { Button, Col, Input, Row } from 'antd';
import React from 'react';
import ChatHeader from '../../container/ChatHeader';
import ChatingMessageCard from '../chatingMessageCard/ChatingMessageCard';
import SendMessageCard from '../chatingMessageCard/SendMessageCard';
const { TextArea } = Input;


const ChattingHomeUi = (props) => {
  const { currentUserStatus, setMessagesText, handleSubmitMessage, allMessage, userProfile, isOnline } = props;
  // console.log(allMessage, userProfile.id)

  return (
    <div className="chatting-home">
      <ChatHeader />
      <div className="chatting-content">
        <Row className="chatting-date">
          <Col span={6} className="chatting-date-card">
            Monday , May 7, 2021
          </Col>
        </Row>
        <div className="all-messages-content">
          {
            allMessage.length && allMessage.map((message) => {
              if (message.senderId !== userProfile.id) {
                return <ChatingMessageCard
                  profile={currentUserStatus?.user}
                  message={message}
                  isOnline={isOnline}
                  key={message.id} />
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
      </div>
      <div className="chatting-bottom">
        <Row className="message-input-container">
          <Col span={14}>
            <TextArea
              className="message-input"
              onChange={(e) => setMessagesText(e.target.value)}
              onPressEnter={handleSubmitMessage}
              enterButton={false}
            />
          </Col>
          <Col span={4}>
            <Button shape="circle" icon={<SearchOutlined />} size="large" />
            <Button shape="circle" icon={<SearchOutlined />} size="large" />
            <Button shape="circle" icon={<SearchOutlined />} size="large" />
            <Button shape="circle" icon={<SearchOutlined />} size="large" />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ChattingHomeUi;