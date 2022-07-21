import { Button, Col, Input, Row } from 'antd';
import React from 'react';
import { BsEmojiSmile } from "react-icons/bs";
import { FaRegPaperPlane } from "react-icons/fa";

const GroupBottomUi = (props) => {
  const { messageText, handleChangeMessage, handleSubmitMessage } = props;

  return (
    <div className="chatting-bottom">
      {/* {isTyping && (
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
          )} */}
      <Row className="message-input-container">
        <Col span={14}>
          <Input
            prefix={<Button shape="circle" icon={<BsEmojiSmile />} />}
            className="message-input"
            size="large"
            placeholder="Type a message"
            value={messageText}
            onChange={handleChangeMessage}
            onPressEnter={handleSubmitMessage}
          />
        </Col>
        <Col span={1} className="chat-input-attachment">
          {messageText.trim() && <Button shape="circle"
            onClick={handleSubmitMessage} icon={<FaRegPaperPlane />} className="chat-sent-control" />}
        </Col>
      </Row>
    </div>
  );
};

export default GroupBottomUi;