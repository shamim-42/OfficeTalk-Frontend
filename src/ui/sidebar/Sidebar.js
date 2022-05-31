import { Avatar, Badge, Divider, Tooltip } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectConversationList } from '../../redux/features/layoutSlice';
import SidebarCard from './SidebarCard';
import SidebarHeader from './SidebarHeader';

const Sidebar = (props) => {
  const { users, handleChangeSearch, onChangeSwitch, userProfile, handleLogout, onlineUsers, isJoinMeetingModalVisible, showJoinMeetingModal, handleJoinMeetingCancel, isChatGroupModalVisible, showChatGroupModal, handleChatGroupCancel } = props;
  const conversationList = useSelector(selectConversationList);


  function isOnline(userid) {
    return onlineUsers.indexOf(parseInt(userid)) !== -1;
  }

  return (
    <div className="sidebar-container">
      <SidebarHeader
        handleLogout={handleLogout}
        isJoinMeetingModalVisible={isJoinMeetingModalVisible}
        handleJoinMeetingCancel={handleJoinMeetingCancel}
        showJoinMeetingModal={showJoinMeetingModal}
        userProfile={userProfile}
        onChangeSwitch={onChangeSwitch}
        handleChangeSearch={handleChangeSearch}
        isChatGroupModalVisible={isChatGroupModalVisible}
        showChatGroupModal={showChatGroupModal}
        handleChatGroupCancel={handleChatGroupCancel} />
      <div className="online-users">
        <Avatar.Group className="online-user-group">
          {
            users.map((user, index) => (
              <Link to={`chat/${user.id}`} key={user.id || index}>
                <Tooltip title={user.fullname} overlayInnerStyle={{
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
                    dot={isOnline(user.id)}
                  >
                    <Avatar
                      className="online-user-img"
                      src={user.profileImage}
                    />
                  </Badge>
                </Tooltip>
              </Link>
            ))
          }
        </Avatar.Group>
      </div>
      <Divider />
      <div className="sidebar-card-container">
        <div className="sidebar-cards">
          {
            conversationList.length > 0 && conversationList.map((user, i) => (
              <SidebarCard userid={userProfile.id} isOnline={isOnline} key={i} user={user} />
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default Sidebar;