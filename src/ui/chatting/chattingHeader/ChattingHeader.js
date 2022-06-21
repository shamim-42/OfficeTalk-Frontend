import { Button } from 'antd';
import { BiSearch } from "react-icons/bi";
import { IoIosCall } from "react-icons/io";
import { IoCloseOutline, IoPersonCircleSharp, IoVideocam } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { activeTimeFormat } from '../../../utils/timeFormat';
import CustomAvatar from '../../helper/CustomAvatar';

const ChattingHeader = (props) => {
  const { currentUserProfile, isOnline } = props;

  return (
    <div className="chatting-header">
      <div className="user-info">
        <CustomAvatar
          size={40}
          icon={isOnline && "small"}
          src={currentUserProfile?.profileImage || currentUserProfile?.groupImage}
        />
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
  );
};

export default ChattingHeader;