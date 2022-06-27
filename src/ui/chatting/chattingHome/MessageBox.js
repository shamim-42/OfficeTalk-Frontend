import { Divider } from 'antd';
import { useEffect } from 'react';
import { newSocket } from '../../../utils/socket';
import { conversationTimeFormat } from '../../../utils/timeFormat';
import MessageCard from './MessageCard';

const MessageBox = (props) => {
  const { filterMessages, currentUserStatus, userProfile, isOnline, deleteMessage } = props;

  useEffect(() => {
    newSocket.on("groupSeen", (res) => {
      console.log(res)
    })

  }, [])


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
    </>
  );
};

export default MessageBox;