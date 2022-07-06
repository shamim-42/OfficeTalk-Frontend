import { Button, Modal } from 'antd';
import { BiSearch } from "react-icons/bi";
import { IoIosCall } from "react-icons/io";
import { IoCloseOutline, IoPersonCircleSharp, IoVideocam } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { activeTimeFormat } from '../../../utils/timeFormat';
import CustomAvatar from '../../helper/CustomAvatar';
import TextAvatar from '../../helper/TextAvatar';
import FriendProfileModal from '../../modal/FriendProfileModal';

const ChattingHeader = (props) => {
  const { currentUserProfile, isOnline } = props;

  return (
    <>
      <div className="chatting-header">
        <div className="user-info">
          {
            (currentUserProfile?.profileImageResize || currentUserProfile?.groupImage) ?
              <CustomAvatar
                size={40}
                icon={isOnline && "small"}
                src={currentUserProfile?.profileImageResize || currentUserProfile?.groupImage}
              />
              :
              <TextAvatar name={currentUserProfile?.fullname || currentUserProfile.name || ""}
                icon={isOnline && "small"}
                size="40px" fontSize="18px" />
          }
          <div>
            <p className="user-name">{currentUserProfile?.fullname || currentUserProfile.name || ""}</p>
            <p className="user-status">
              {isOnline ? "Active Now" : (currentUserProfile?.lastLoggedin && ("Last seen " + activeTimeFormat(currentUserProfile?.lastLoggedin)))}
            </p>
          </div>
        </div>

        <div className="header-icons">
          <div>
            <Button type="text">
              <BiSearch />
            </Button>
            <Button type="text">
              <IoPersonCircleSharp />
            </Button>
            <Button type="text">
              <IoVideocam />
            </Button>
            <Button type="text">
              <IoIosCall />
            </Button>
          </div>
          <div className="cross-icon">
            <Link to='/'>
              <Button type="text">
                <IoCloseOutline />
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <Modal
        // visible={cancelFriendModal}
        className="friend-profile-modal"
        closable={false}
        footer={null}
        currentUserProfile={currentUserProfile}
        width="auto"
      >
        <FriendProfileModal />
      </Modal>
    </>
  );
};

export default ChattingHeader;