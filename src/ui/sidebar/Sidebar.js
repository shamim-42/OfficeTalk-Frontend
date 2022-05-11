import React from 'react';
import { Avatar, Badge, Divider, Tooltip } from 'antd';
import SidebarHeader from './SidebarHeader';
import SidebarCard from './SidebarCard';

const Sidebar = (props) => {
  const { users, handleChangeSearch, onChangeSwitch, userProfile, handleLogout } = props;

  return (
    <div className="sidebar-container">
      <SidebarHeader
        handleLogout={handleLogout}
        userProfile={userProfile}
        onChangeSwitch={onChangeSwitch}
        handleChangeSearch={handleChangeSearch} />
      <div className="online-users">
        <Avatar.Group className="online-user-group">
          {
            users.map((user, index) => (
              <Tooltip key={index} title={user.name} overlayInnerStyle={{
                padding: '0 4px',
                minHeight: 'fit-content',
                fontSize: '12px',
              }} placement="top">
                <Badge
                  offset={["-5%", "85%"]}
                  className="online-badge"
                  style={{
                    width: "8px",
                    height: "8px",
                    backgroundColor: "#67C148"
                  }}
                  dot={user.status}
                >
                  <Avatar
                    className="online-user-img"
                    src={user.profileImage}
                  />
                </Badge>
              </Tooltip>
            ))
          }
        </Avatar.Group>
      </div>
      <Divider />
      <div className="sidebar-card-container">
        <div className="sidebar-cards">
          {
            users.map((user, i) => (
              <SidebarCard key={i} user={user} />
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default Sidebar;