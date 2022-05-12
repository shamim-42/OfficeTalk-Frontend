import { Button, Col, Row } from 'antd';
import React from 'react';
import ChatingMessageCard from '../chatingMessageCard/ChatingMessageCard';
import { Input } from 'antd';
import ChatHeader from '../../container/ChatHeader';
import SendMessageCard from '../chatingMessageCard/SendMessageCard';
import { SearchOutlined } from '@ant-design/icons';
const { TextArea } = Input;


const ChattingHomeUi = (props) => {
  const { currentUserStatus, setMessagesText, handleSubmitMessage } = props;

  return (
    <div className="chatting-home">
      <ChatHeader />
      <div className="chatting-content">
        <Row className="chatting-date">
          <Col span={6} className="chatting-date-card">
            Monday , May 7, 2021
          </Col>
        </Row>
        <ChatingMessageCard />
        <SendMessageCard />
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
    </div>
  );
};

export default ChattingHomeUi;