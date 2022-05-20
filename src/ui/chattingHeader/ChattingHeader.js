import { Avatar, Badge, Button } from 'antd';
import React from 'react';
import { BiSearch } from "react-icons/bi";
import { IoPersonCircleSharp } from "react-icons/io5";
import { IoVideocam } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";
import { IoIosCall } from "react-icons/io";
import { Link } from 'react-router-dom';
import { activeTimeFormat } from '../../utils/utils';

const ChattingHeader = (props) => {
  const { currentUserProfile, isOnline } = props;


  return (
    <div className="chatting-header">
      <div className="user-info">
        <Badge
          offset={["-5%", "85%"]}
          style={{
            width: "8px",
            height: "8px",
            backgroundColor: "#67C148",
            textAlign: "left"
          }}
          dot={isOnline}
        >
          <Avatar
            className="user-img circle-img"
            src={currentUserProfile?.profileImage}
          />
        </Badge>
        <div>
          <p className="user-name">{currentUserProfile?.fullname || ""}</p>
          <p className="user-status">
            {isOnline ? "Active Now" : (currentUserProfile?.lastLoggedin && "Last seen" + " " + activeTimeFormat(currentUserProfile?.lastLoggedin))}
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