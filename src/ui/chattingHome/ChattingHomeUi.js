import { Affix, Avatar, Button, Col, Input, Row, Spin } from "antd";
import React, { Fragment, useEffect, useRef } from "react";

import hi from "../../assest/image/hi.gif";
import ChatHeader from "../../container/ChatHeader";
import ChatInputBox from "../form/ChatInputBox";
import MessageBox from "./MessageBox";

const ChattingHomeUi = (props) => {
  const { currentUserProfile, handleChangeMessage, handleSubmitMessage, allMessage, userProfile, isOnline, isLoading, messagesText, handleScroll, handleBlur, isTyping, sendHiMessage, messageStatus, userRequestFunction } = props;
  const messagesEndRef = useRef(null);

  console.log(allMessage);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [allMessage]);

  return (
    <Fragment>
      <Spin spinning={isLoading}>
        <div className="chatting-home">
          <ChatHeader currentUserProfile={currentUserProfile} />
          <div className="chatting-content">
            <div className="all-messages-content" onScroll={handleScroll}>
              {allMessage.length > 0 &&
                allMessage.map((filterMessages, index) => (
                  <MessageBox
                    key={index}
                    currentUserStatus={currentUserProfile}
                    isOnline={isOnline}
                    userProfile={userProfile}
                    messageStatus={messageStatus}
                    filterMessages={filterMessages}
                  />
                ))}
              {allMessage.length <= 0 && (
                <div className="sayhi-card">
                  <Avatar className="sayhi-emoji" src={hi} />
                  <p className="sayhi-message">
                    {`Say hi to ${currentUserProfile.fullname}.`}
                  </p>
                  <Button
                    className="btn-theme-primary-fluid filled-btn sayhi-btn"
                    type="primary"
                    onClick={sendHiMessage}
                    htmlType="submit"
                  >
                    Say Hi
                  </Button>
                </div>
              )}

              <div ref={messagesEndRef}></div>
            </div>
            {/* {
            messageStatus === 'choose' &&
            <div className="message-choose-card">
              <p className="message-choose-text">This sender is not in your list.</p>
              <div className="message-choose-buttons">
                <Button
                  type="primary"
                  onClick={() => userRequestFunction("rejected")}
                  danger>
                  Reject
                </Button>
                <Button
                  onClick={() => userRequestFunction("accepted")}
                  type="primary">
                  Accept
                </Button>
              </div>
            </div>

          } */}
          </div>

          <Affix offsetBottom={0}>
            <div className="chatting-bottom">
              {isTyping && (
                <div className="user-typing">
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
                </div>
              )}
              <Row className="message-input-container">
                <ChatInputBox messagesValue={messagesText} onSubmit={handleSubmitMessage}
                 onChange={handleChangeMessage} onBlur={handleBlur} />
                
              </Row>
            </div>
          </Affix>
        </div>
      </Spin>
    </Fragment>
  );
};

export default ChattingHomeUi;
