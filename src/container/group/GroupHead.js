import GroupHeaderUI from "../../ui/group/GroupHeaderUI";

const GroupHead = (props) => {
  const { groupInfo, isGroupOnline } = props;


  return (
    <GroupHeaderUI
      groupProfile={groupInfo}
      isOnline={isGroupOnline} />
  );
};

export default GroupHead;