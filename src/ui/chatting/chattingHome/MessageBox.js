import { Divider } from 'antd';
import { useEffect, useRef } from 'react';
import ChatCardContainer from '../../../container/chat/ChatCardContainer';
import { conversationTimeFormat } from '../../../utils/timeFormat';

const MessageBox = (props) => {
  const { filterMessages, currentUserProfile, isOnline, setAllMessage, isMore } = props;
  const messagesEndRef = useRef(null);
  const seeMoreRef = useRef(null);
  console.log(isMore)

  useEffect(() => {
    if (isMore === false) {
      console.log("in effect")
      messagesEndRef.current?.scrollIntoView();
    }
  }, [filterMessages, isMore]);

  return (
    <>
      {/* <div className="" ref={seeMoreRef}></div> */}
      <Divider className="chatting-date">{conversationTimeFormat(filterMessages?.date, true)}</Divider>
      <div className="message-list">
        {
          filterMessages?.data.messages?.length > 0 && filterMessages?.data.messages?.map((message, index) => (
            <ChatCardContainer
              currentUserProfile={currentUserProfile}
              setAllMessage={setAllMessage}
              singleMessage={message}
              isOnline={isOnline}
              messages={filterMessages?.data?.messages}
              index={index}
              key={index}
            />
          ))
        }
      </div>
      <div ref={messagesEndRef}></div>
    </>
  );
};

export default MessageBox;