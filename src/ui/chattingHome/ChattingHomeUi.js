import { IoImagesOutline } from "react-icons/io5";
import { BsFillMicFill } from "react-icons/bs";
import { Button, Col, Input, Row, Spin } from 'antd';
import React, { useEffect, useRef } from 'react';
import ChatHeader from '../../container/ChatHeader';
import MessageBox from "./MessageBox";


const ChattingHomeUi = (props) => {
  const { currentUserStatus, setMessagesText, handleSubmitMessage, allMessage, userProfile, isOnline, isLoading, timeFormat } = props;
  const messagesEndRef = useRef(null)


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [allMessage])


  return (
    <Spin spinning={isLoading}>
      <div className="chatting-home">
        <ChatHeader />
        <div className="chatting-content">
          <div className="all-messages-content">
            {
              allMessage.length > 0 && allMessage.slice(0).reverse().map((filterMessages, index) => (
                <MessageBox
                  key={index}
                  timeFormat={timeFormat}
                  currentUserStatus={currentUserStatus}
                  isOnline={isOnline}
                  userProfile={userProfile}
                  filterMessages={filterMessages} />
              ))
            }
            <div ref={messagesEndRef}></div>
          </div>
        </div>
        <div className="chatting-bottom">
          <Row className="message-input-container">
            <Col span={14}>
              <Input
                className="message-input"
                onChange={(e) => setMessagesText(e.target.value)}
                onPressEnter={handleSubmitMessage}
                size="large"
              />
            </Col>
            <Col span={2} className="chat-input-icons">
              <Button shape="circle" icon={<IoImagesOutline />} size="large" />
              <Button shape="circle" icon={<BsFillMicFill />} size="large" />
            </Col>
          </Row>
        </div>
      </div>
    </Spin>
  );
};

export default ChattingHomeUi;