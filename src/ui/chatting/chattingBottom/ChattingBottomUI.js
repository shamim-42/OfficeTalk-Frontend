import { Avatar, Button, Col, Input, Row } from 'antd';
import React, { useEffect, useRef } from 'react';
import { BsEmojiSmile } from "react-icons/bs";
import { FaRegPaperPlane } from "react-icons/fa";
import CustomAvatar from '../../helper/CustomAvatar';
import TextAvatar from '../../helper/TextAvatar';

const ChattingBottomUI = (props) => {
  const { isTyping, currentUserProfile, handleChangeMessage, handleBlur, handleSubmitMessage, messagesText, allMessage, messageStatus } = props;

  const goBottom = useRef(null);

  useEffect(() => {
    goBottom.current?.scrollIntoView();
  }, [])

  return (
    <>
      {((allMessage.length === 0) && !messageStatus) && (
        <div className="sayhi-card">
          <Avatar className="sayhi-emoji" src="https://s3-bucket-ot-teton.s3.amazonaws.com/images/d6e592b7-ba77-4efa-860b-72df4f0f30f4.gif" />
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
      <div ref={goBottom}></div>
      <div className="chatting-bottom">
        {isTyping && (
          <div className="user-typing">
            {
              currentUserProfile?.profileImageResize ?
                <CustomAvatar
                  size={20}
                  src={currentUserProfile?.profileImageResize}
                />
                :
                <TextAvatar name={currentUserProfile?.fullname}
                  size="20px" fontSize="8px" />
            }

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
    </>
  );
};

export default ChattingBottomUI;