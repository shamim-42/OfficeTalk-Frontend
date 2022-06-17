import { Divider } from 'antd';
import { useEffect, useRef } from 'react';
import { conversationTimeFormat } from '../../../utils/timeFormat';
import MessageCard from './MessageCard';

const MessageBox = (props) => {
  const { filterMessages, currentUserStatus, userProfile, isOnline, deleteMessage } = props;

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
              CurrentUserProfile={currentUserStatus}
              userProfile={userProfile}
              deleteMessage={deleteMessage}
              message={message}
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

export default MessageBox;