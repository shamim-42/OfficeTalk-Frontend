import { Divider } from 'antd';
import { useEffect, useRef } from 'react';
import { conversationTimeFormat } from '../../utils/timeFormat';
import MessageCard from '../chatting/chattingHome/MessageCard';

const GroupMessageBox = (props) => {
  const { filterMessages, userProfile, isOnline, allMessage } = props;
  const messagesEndRef = useRef(null);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [allMessage]);

  return (
    <>
      <Divider className="chatting-date">{conversationTimeFormat(filterMessages?.date, true)}</Divider>
      <div className="message-list">
        {
          filterMessages?.data.messages?.length > 0 && filterMessages?.data.messages?.map((message, index) => (
            <MessageCard
              CurrentUserProfile={message.user}
              // deleteMessage={deleteMessage}
              message={message}
              userProfile={userProfile}
              isOnline={isOnline}
              index={index}
              key={message?.id}
              messages={filterMessages?.data?.messages}
            />
          ))
        }
      </div>
      <div ref={messagesEndRef}></div>
    </>
  );
};

export default GroupMessageBox;