import { Button, Divider } from "antd";
import CustomAvatar from "../helper/CustomAvatar";
import TextAvatar from "../helper/TextAvatar";

const UserProfileView = ({ closeProfileModal, userProfile }) => {
  console.log(userProfile)
  return (
    <div>
      <Button
        onClick={closeProfileModal}
        className="modal-cross-button">
        X
      </Button>
      <div className="user-profile-info">
        {userProfile.profileImage ? <CustomAvatar
          size={88}
          className="circle-img message-status-img"
          src={userProfile.profileImage}
        />
          :
          <TextAvatar
            name={userProfile?.fullname}
            size="88px" fontSize="48px" />}
        <p className="user-profile-fullname">
          {userProfile.fullname}
        </p>
        <p className="user-profile-email">
          {userProfile.email}
        </p>
      </div>
      <Divider />
    </div>
  );
};

export default UserProfileView;