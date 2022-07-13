import { Button, Divider, Switch } from "antd";
import { AiOutlineBell } from "react-icons/ai";
import { FiFolderMinus } from "react-icons/fi";
import { RiSettings3Line } from "react-icons/ri";
import CustomAvatar from "../helper/CustomAvatar";
import TextAvatar from "../helper/TextAvatar";

const UserProfileView = ({ closeProfileModal, userProfile, handleLogout }) => {

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
          <Switch size="small" defaultChecked />
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