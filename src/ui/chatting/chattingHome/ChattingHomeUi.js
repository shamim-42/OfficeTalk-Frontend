import { Avatar, Button, Col, Input, Row, Spin } from "antd";
import { Fragment } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { FaRegPaperPlane } from "react-icons/fa";
import ChatHeader from "../../../container/chat/ChatHeader";
import { getDateWiseMessages } from "../../../utils/utils";
import CustomAvatar from "../../helper/CustomAvatar";
import TextAvatar from "../../helper/TextAvatar";
import MessageBox from "./MessageBox";

const ChattingHomeUi = (props) => {
  const { currentUserProfile, handleChangeMessage, handleSubmitMessage, allMessage, isLoading, messagesText, handleBlur, isTyping, messageStatus, userRequestFunction, nextPage, handlePreviousMessage, setAllMessage } = props;

  // console.log(allMessage);
  const filteredMessages = getDateWiseMessages(allMessage);

  return (
    <Fragment>
      <Spin spinning={isLoading}>
        <div className="chatting-home">
          <ChatHeader currentUserProfile={currentUserProfile} />
          <div className="chatting-content">
            {nextPage > 0 &&
              <div className="previous-btn-container">
                <Button
                  onClick={handlePreviousMessage}
                  className="previous-btn">see previous</Button>
              </div>
            }
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
            <div className="all-messages-content">
              {filteredMessages.length > 0 &&
                filteredMessages.map((filterMessages, index) => (
                  <MessageBox
                    key={index}
                    currentUserProfile={currentUserProfile}
                    setAllMessage={setAllMessage}
                    messageStatus={messageStatus}
                    filterMessages={filterMessages}
                    filteredMessages={filteredMessages}
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

          <div className="chatting-bottom">
            {isTyping && (
              <div className="user-typing">
                {
                  currentUserProfile?.profileImage ?
                    <CustomAvatar
                      size={20}
                      src={currentUserProfile?.profileImage}
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
        </div>
      </Spin>
    </Fragment >
  );
};

export default ChattingHomeUi;
