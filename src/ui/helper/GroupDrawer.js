import CustomAvatar from "./CustomAvatar";
import TextAvatar from "./TextAvatar";

const GroupDrawer = ({ groupProfile }) => {

  return (
    <div className="group-profile-info">
      <div className="group-profile-avatar">
        {
          (groupProfile?.groupImage) ?
            <CustomAvatar
              size={68}
              src={groupProfile?.groupImage}
            />
            :
            <TextAvatar name={groupProfile.name || ""}
              size="68px" fontSize="30px" />
        }
      </div>
      <p className="group-profile-name">{groupProfile.name}</p>

    </div>
  );
};

export default GroupDrawer;