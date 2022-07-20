import { Affix, Button, Col, Input, Row } from "antd";
import { BsEmojiSmile } from "react-icons/bs";
import { FaRegPaperPlane } from "react-icons/fa";
import GroupHead from "../../container/group/GroupHead";
import { getDateWiseMessages } from "../../utils/utils";
import GroupMessageBox from "./GroupMessageBox";


const GroupHomeUI = (props) => {
  const { groupInfo, allMessage, userProfile, handleChangeMessage, messageText, handleSubmitMessage, isGroupOnline, setAllMessage, groupId, handlePreviousMessage, nextPage } = props;

  const filteredMessages = getDateWiseMessages(allMessage);
  // console.log(allMessage)

  return (
    <div>
      <Affix offsetTop={0}>
        <GroupHead
          isGroupOnline={isGroupOnline}
          groupInfo={groupInfo} />
      </Affix>

      <div className="group-chat-content">
        {nextPage > 0 &&
          <div className="previous-btn-container">
            <Button
              onClick={handlePreviousMessage}
              className="previous-btn">see previous</Button>
          </div>
        }
        <div className="all-messages-content">
          {filteredMessages?.length > 0 &&
            filteredMessages.map((filterMessages, index) => (
              <GroupMessageBox
                key={index}
                groupId={groupId}
                userProfile={userProfile}
                setAllMessage={setAllMessage}
                filterMessages={filterMessages}
                allMessage={allMessage}
              />
            ))}
        </div>
      </div>
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
    </div>
  );
};

export default GroupHomeUI;