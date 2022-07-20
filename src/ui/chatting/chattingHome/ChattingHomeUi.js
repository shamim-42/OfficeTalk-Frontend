import { Button, Spin } from "antd";
import { Fragment, useState } from "react";
import ChatHeader from "../../../container/chat/ChatHeader";
import ChattingBottom from "../../../container/chat/ChattingBottom";
import { getDateWiseMessages } from "../../../utils/utils";
import MessageBox from "./MessageBox";

const ChattingHomeUi = (props) => {
  const { currentUserProfile, newSocket, allMessage, isLoading, userId, messageStatus, userRequestFunction, nextPage, handlePreviousMessage, setAllMessage, targetId, setTargetId } = props;

  const [isMore, setIsMore] = useState(false);
  function seeMore() {
    handlePreviousMessage()
    setIsMore(true)
  }
  console.log(allMessage)
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
                  onClick={seeMore}
                  className="previous-btn">see previous</Button>
              </div>
            }

            <div className="all-messages-content">
              {filteredMessages.length > 0 &&
                filteredMessages.map((filterMessages, index) => (
                  <MessageBox
                    key={index}
                    isMore={isMore}
                    currentUserProfile={currentUserProfile}
                    setAllMessage={setAllMessage}
                    messageStatus={messageStatus}
                    filterMessages={filterMessages}
                    filteredMessages={filteredMessages}
                    targetId={targetId}
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

          <ChattingBottom
            currentUserProfile={currentUserProfile}
            newSocket={newSocket}
            setTargetId={setTargetId}
            userId={userId}
            allMessage={allMessage}
            messageStatus={messageStatus}
            setAllMessage={setAllMessage}
          />
        </div>
      </Spin>
    </Fragment >
  );
};

export default ChattingHomeUi;
