import { Affix, Button, Col, Input, Row } from "antd";
import { useEffect, useRef } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import GroupHead from "../../container/group/GroupHead";
import { getDateWiseMessages } from "../../utils/utils";
import GroupMessageBox from "./GroupMessageBox";

const GroupHomeUI = (props) => {
  const { groupInfo, allMessage, userProfile, isOnline, handleChangeMessage, messageText, handleSubmitMessage, isGroupOnline } = props;

  const messagesEndRef = useRef(null);

  const filteredMessages = getDateWiseMessages(allMessage);
  // console.log(filteredMessages)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, []);

  return (
    <div>
      <Affix offsetTop={0}>
        <GroupHead
          isGroupOnline={isGroupOnline}
          groupInfo={groupInfo} />
      </Affix>

      <div className="group-chat-content">
        <div className="all-messages-content">
          {filteredMessages?.length > 0 &&
            filteredMessages.map((filterMessages, index) => (
              <GroupMessageBox
                key={index}
                // currentUserStatus={currentUserProfile}
                isOnline={isOnline}
                userProfile={userProfile}
                // messageStatus={messageStatus}
                filterMessages={filterMessages}
              // deleteMessage={deleteMessage}
              />
            ))}
        </div>
        <div ref={messagesEndRef}></div>
      </div>
      <Affix offsetBottom={0}>
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
            {/* <Col span={1} className="chat-input-attachment">
              {messagesText.trim() && <Button shape="circle"
                onClick={handleSubmitMessage} icon={<FaRegPaperPlane />} className="chat-sent-control" />}
            </Col> */}
          </Row>
        </div>
      </Affix>
    </div>
  );
};

export default GroupHomeUI;