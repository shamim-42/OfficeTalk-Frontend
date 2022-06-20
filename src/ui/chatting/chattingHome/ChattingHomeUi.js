import { Affix, Avatar, Button, Col, Input, Row, Spin } from "antd";
import { Fragment } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { FaRegPaperPlane } from "react-icons/fa";
import hi from "../../../assest/image/hi.gif";
import ChatHeader from "../../../container/chat/ChatHeader";
import MessageBox from "./MessageBox";


const ChattingHomeUi = (props) => {
  const { currentUserProfile, handleChangeMessage, handleSubmitMessage, allMessage, userProfile, isOnline, isLoading, messagesText, handleScroll, handleBlur, isTyping, messageStatus, userRequestFunction, deleteMessage } = props;



  return (
    <Fragment>
      <Spin spinning={isLoading}>
        <div className="chatting-home">
          <ChatHeader currentUserProfile={currentUserProfile} />
          {allMessage.length <= 0 && (
            <div className="sayhi-card">
              <Avatar className="sayhi-emoji" src={hi} />
              <p className="sayhi-message">
                {`Say hi to ${currentUserProfile.fullname}.`}
              </p>
              <Button
                className="btn-theme-primary-fluid filled-btn sayhi-btn"
                type="primary"
                onClick={(e) => handleSubmitMessage(e, "Hi !")}
                htmlType="submit"
              >
                Say Hi
              </Button>
            </div>
          )}
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
                    deleteMessage={deleteMessage}
                  />
                ))}
            </div>
            {
              messageStatus === 'choose' &&
              <div className="message-choose-card">
                <p className="message-choose-text">This sender is not in your list.</p>
                <div className="message-choose-buttons">
                  <button
                    onClick={() => userRequestFunction("rejected")}
                    className="reject-button"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => userRequestFunction("accepted")}
                    className="accept-button"
                  >
                    Accept
                  </button>
                </div>
              </div>
            }
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
                <Col span={14}>
                  <Input
                    prefix={<Button shape="circle" icon={<BsEmojiSmile />} />}
                    className="message-input"
                    value={messagesText}
                    placeholder="Type a message"
                    onChange={handleChangeMessage}
                    onBlur={handleBlur}
                    onPressEnter={handleSubmitMessage}
                    size="large"
                  />
                </Col>
                <Col span={1} className="chat-input-attachment">
                  {messagesText.trim() && <Button shape="circle"
                    onClick={handleSubmitMessage} icon={<FaRegPaperPlane />} className="chat-sent-control" />}
                </Col>
              </Row>
            </div>
          </Affix>
        </div>
      </Spin>
    </Fragment>
  );
};

export default ChattingHomeUi;
