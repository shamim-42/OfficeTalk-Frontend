import { Button, Divider, Switch } from "antd";
import { AiOutlineBell } from "react-icons/ai";
import { FiFolderMinus } from "react-icons/fi";
import { RiSettings3Line } from "react-icons/ri";
import CustomAvatar from "../helper/CustomAvatar";
import TextAvatar from "../helper/TextAvatar";

const UserProfileView = ({ closeProfileModal, userProfile, handleLogout }) => {

  const handleNotification = (checked) => {
    if (checked) {
      Notification.requestPermission()
        .then((permission) => {
          console.log(permission)
        }).catch(err => console.log(err));
    } else {
      // Notification.close();
    }
    console.log(`switch to ${checked}`);
  };

  return (
    <div>
      <Button
        onClick={closeProfileModal}
        className="modal-cross-button">
        X
      </Button>
      <div className="user-profile-info">
        {(userProfile.profileImageResize || userProfile.profileImage) ? <CustomAvatar
          size={88}
          className="circle-img message-status-img"
          src={userProfile.profileImageResize || userProfile.profileImage}
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
      <div className="profile-modal-options">
        <div className="profile-option">
          <FiFolderMinus />
          <span>Drive</span>
        </div>
        <div className="profile-notification-option">
          <div className="profile-option">
            <AiOutlineBell />
            <span>Notification</span>
          </div>
          <Switch size="small" onChange={handleNotification} />
        </div>
        <Button className="profile-option">
          <RiSettings3Line />
          <span>Settings</span>
        </Button>
      </div>

      <div className="logout-modal-btn">
        <Button
          className="btn-theme-primary-fluid"
          type="primary"
          htmlType="submit"
          onClick={handleLogout}
        >
          Log Out
        </Button>
      </div>
    </div>
  );
};

export default UserProfileView;