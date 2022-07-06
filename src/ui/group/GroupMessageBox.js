import { Divider } from 'antd';
import { useEffect, useRef } from 'react';
import GroupCardContainer from '../../container/group/GroupCardContainer';
import { conversationTimeFormat } from '../../utils/timeFormat';

const GroupMessageBox = (props) => {
  const { filterMessages, userProfile, allMessage, setAllMessage, groupId } = props;
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
            <GroupCardContainer
              CurrentUserProfile={message.user}
              singleMessage={message}
              userProfile={userProfile}
              groupId={groupId}
              setAllMessage={setAllMessage}
              index={index}
              key={index}
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