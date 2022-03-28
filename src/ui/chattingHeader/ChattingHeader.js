import { Avatar, Badge, Button } from 'antd';
import React from 'react';
import { BiSearch } from "react-icons/bi";
import { IoPersonCircleSharp } from "react-icons/io5";
import { IoVideocam } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";
import { IoIosCall } from "react-icons/io";

const ChattingHeader = (props) => {
  const { currentUser } = props;
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
          dot={currentUser.status}
        >
          <Avatar
            className="user-img circle-img"
            src={currentUser.img}
          />
        </Badge>
        <div>
          <p className="user-name">{currentUser.name}</p>
          <p className="user-status">
            {currentUser.status ? "Active Now" : ''}
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
          <Button type="text">
            <IoCloseOutline />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChattingHeader;