import { Affix, Button, Col, Input, Row } from "antd";
import { BsEmojiSmile } from "react-icons/bs";
import ChattingHeader from "../chatting/chattingHeader/ChattingHeader";

const GroupHomeUI = (props) => {
  const { groupInfo } = props;

  return (
    <div>
      <Affix offsetTop={0}>
        <ChattingHeader currentUserProfile={groupInfo} />
      </Affix>

      <div className="group-chat-content">
        je
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
              // value={messagesText}
              // onChange={handleChangeMessage}
              // onBlur={handleBlur}
              // onPressEnter={handleSubmitMessage}
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