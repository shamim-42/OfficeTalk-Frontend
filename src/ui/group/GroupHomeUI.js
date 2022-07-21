import { Affix, Button } from "antd";
import GroupBottom from "../../container/group/GroupBottom";
import GroupHead from "../../container/group/GroupHead";
import { getDateWiseMessages } from "../../utils/utils";
import GroupMessageBox from "./GroupMessageBox";


const GroupHomeUI = (props) => {
  const { groupInfo, allMessage, userProfile, setTargetId, userId, isGroupOnline, setAllMessage, groupId, handlePreviousMessage, nextPage, targetId } = props;

  const filteredMessages = getDateWiseMessages(allMessage);
  console.log(targetId)
  console.log(allMessage)

  return (
    <div>
      <Affix offsetTop={0}>
        <GroupHead
          isGroupOnline={isGroupOnline}
          groupInfo={groupInfo} />
      </Affix>

      <div className="group-chat-content">
        {nextPage > 0 &&
          <div className="previous-btn-container">
            <Button
              onClick={handlePreviousMessage}
              className="previous-btn">see previous</Button>
          </div>
        }
        <div className="all-messages-content">
          {filteredMessages?.length > 0 &&
            filteredMessages.map((filterMessages, index) => (
              <GroupMessageBox
                key={index}
                targetId={targetId}
                groupId={groupId}
                userProfile={userProfile}
                setAllMessage={setAllMessage}
                filterMessages={filterMessages}
                allMessage={allMessage}
              />
            ))}
        </div>
      </div>
      <GroupBottom
        setAllMessage={setAllMessage}
        setTargetId={setTargetId}
        userId={userId}
        groupId={groupId}
      />
    </div>
  );
};

export default GroupHomeUI;