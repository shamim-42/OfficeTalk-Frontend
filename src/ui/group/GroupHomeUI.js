import { Affix, Button, Col, Input, Row } from "antd";
import { BsEmojiSmile } from "react-icons/bs";
import ChattingHeader from "../chatting/chattingHeader/ChattingHeader";
import GroupMessageBox from "./GroupMessageBox";

const GroupHomeUI = (props) => {
  const { groupInfo, allMessage, userProfile, isOnline, handleChangeMessage, messageText, handleSubmitMessage } = props;

  return (
    <div>
      <Affix offsetTop={0}>
        <ChattingHeader currentUserProfile={groupInfo} />
      </Affix>

      <div className="group-chat-content">
        <div className="all-messages-content">
          {allMessage?.length > 0 &&
            allMessage.map((filterMessages, index) => (
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