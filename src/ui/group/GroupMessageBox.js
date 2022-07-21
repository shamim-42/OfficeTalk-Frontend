import { Divider } from 'antd';
import GroupCardContainer from '../../container/group/GroupCardContainer';
import { conversationTimeFormat } from '../../utils/timeFormat';

const GroupMessageBox = (props) => {
  const { filterMessages, userProfile, setAllMessage, groupId, targetId } = props;

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
              targetId={targetId}
              messages={filterMessages?.data?.messages}
            />
          ))
        }
      </div>
    </>
  );
};

export default GroupMessageBox;