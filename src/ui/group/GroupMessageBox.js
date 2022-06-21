import { Divider } from 'antd';
import { useEffect, useRef } from 'react';
import { conversationTimeFormat } from '../../utils/timeFormat';
import MessageCard from '../chatting/chattingHome/MessageCard';

const GroupMessageBox = (props) => {
  const { filterMessages, userProfile, isOnline, deleteMessage } = props;
  const messagesEndRef = useRef(null);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, []);

  return (
    <>
      <Divider className="chatting-date">{conversationTimeFormat(filterMessages?.date, true)}</Divider>
      <div className="message-list">
        {
          filterMessages?.messages.length > 0 && filterMessages?.messages.map((message) => (
            <MessageCard
              CurrentUserProfile={message.user}
              // deleteMessage={deleteMessage}
              message={message}
              userProfile={userProfile}
              isOnline={isOnline}
              key={message?.id}
            />
          ))
        }
      </div>
      <div ref={messagesEndRef}></div>
    </>
  );
};

export default GroupMessageBox;