import { Button, Drawer } from 'antd';
import { useState } from 'react';
import { BiSearch } from "react-icons/bi";
import { IoIosCall } from "react-icons/io";
import { IoCloseOutline, IoPersonCircleSharp, IoVideocam } from "react-icons/io5";
import { Link } from 'react-router-dom';
import CustomAvatar from '../helper/CustomAvatar';
import GroupDrawer from '../helper/GroupDrawer';
import TextAvatar from '../helper/TextAvatar';

const GroupHeaderUI = (props) => {
  const [visible, setVisible] = useState(false);
  const { groupProfile, isOnline } = props;
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <div className="chatting-header">
        <div className="user-info">
          {
            (groupProfile?.groupImage) ?
              <CustomAvatar
                size={40}
                icon={isOnline && "small"}
                src={groupProfile?.groupImage}
              />
              :
              <TextAvatar name={groupProfile.name || ""}
                icon={isOnline && "small"}
                size="40px" fontSize="18px" />
          }
          <div>
            <p className="user-name">{groupProfile.name || ""}</p>
            <p className="user-status">
              {isOnline && "Active Now"}
            </p>
          </div>
        </div>

        <div className="header-icons">
          <div>
            <Button type="text">
              <BiSearch />
            </Button>
            <Button type="text" onClick={showDrawer}>
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
      <Drawer
        title="Group Info"
        placement="right"
        className="group-profile"
        width={250}
        onClose={onClose}
        visible={visible}

      >
        <GroupDrawer groupProfile={groupProfile} />
      </Drawer>
    </>
  );
};

export default GroupHeaderUI;