import { Divider } from 'antd';
import { conversationTimeFormat } from '../../../utils/timeFormat';
import MessageCard from './MessageCard';

const MessageBox = (props) => {
  const { filterMessages, currentUserStatus, userProfile, isOnline, deleteMessage } = props;

  return (
    <>
      <Divider className="chatting-date">{conversationTimeFormat(filterMessages?.date, true)}</Divider>
      <div className="message-list">
        {
          filterMessages?.messages.length > 0 && filterMessages?.messages.map((message, index) => (
            <MessageCard
              CurrentUserProfile={currentUserStatus}
              userProfile={userProfile}
              deleteMessage={deleteMessage}
              message={message}
              isOnline={isOnline}
              messages={filterMessages?.messages}
              index={index}
              key={message?.id}
            />
          ))
        }
      </div>
    </>
  );
};

export default MessageBox;