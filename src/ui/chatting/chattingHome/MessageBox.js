import { Divider } from 'antd';
import ChatCardContainer from '../../../container/chat/ChatCardContainer';
import { conversationTimeFormat } from '../../../utils/timeFormat';

const MessageBox = (props) => {
  const { filterMessages, currentUserProfile, isOnline, setAllMessage, targetId } = props;


  return (
    <>
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
              targetId={targetId}
            />
          ))
        }
      </div>
    </>
  );
};

export default MessageBox;