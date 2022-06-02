import { Avatar, Button, Col, Input, Row, Spin } from 'antd';
import React, { useEffect, useRef } from 'react';
import { BsFillMicFill } from "react-icons/bs";
import { IoImagesOutline } from "react-icons/io5";
import ChatHeader from '../../container/ChatHeader';
import hi from './hi.gif';
import MessageBox from "./MessageBox";


const ChattingHomeUi = (props) => {
  const { currentUserProfile, handleChangeMessage, handleSubmitMessage, allMessage, userProfile, isOnline, isLoading, messagesText, handleScroll, handleBlur, isTyping, sendHiMessage, messageStatus } = props;
  const messagesEndRef = useRef(null)


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [allMessage])


  return (
    <Spin spinning={isLoading}>
      <div className="chatting-home">
        <ChatHeader currentUserProfile={currentUserProfile} />
        <div className="chatting-content">
          <div className="all-messages-content" onScroll={handleScroll} >
            {
              allMessage.length > 0 && allMessage.slice(0).reverse().map((filterMessages, index) => (
                <MessageBox
                  key={index}
                  currentUserStatus={currentUserProfile}
                  isOnline={isOnline}
                  userProfile={userProfile}
                  messageStatus={messageStatus}
                  filterMessages={filterMessages} />
              ))
            }
            {
              allMessage.length <= 0 &&
              <div className="sayhi-card">
                <Avatar
                  className="sayhi-emoji"
                  src={hi}
                />
                <p className="sayhi-message">
                  {`Say hi to ${currentUserProfile.fullname}.`}
                </p>
                <Button
                  className="btn-theme-primary-fluid filled-btn sayhi-btn"
                  type="primary"
                  onClick={sendHiMessage}
                  htmlType="submit">
                  Say Hi
                </Button>
              </div>
            }

            {
              messageStatus === 'choose' &&
              <div className="message-choose-card">
                
              </div>

            }

            <div ref={messagesEndRef}></div>
          </div>
        </div>
        <div className="chatting-bottom">
          {isTyping && <div className="user-typing">
            <Avatar
              className="user-typing-img"
              src={currentUserProfile?.profileImage}
            />
            <div className="typing">
              <span className="circle"></span>
              <span className="circle"></span>
              <span className="circle"></span>
              <span className="circle"></span>
              <span className="circle"></span>
            </div>
          </div>}
          <Row className="message-input-container">
            <Col span={14}>
              <Input
                className="message-input"
                value={messagesText}
                placeholder="Type a message"
                onChange={handleChangeMessage}
                onBlur={handleBlur}
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