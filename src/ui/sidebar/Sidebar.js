import { Avatar, Divider } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectConversationList } from '../../redux/features/layoutSlice';
import CustomAvatar from '../helper/CustomAvatar';
import SidebarCard from './SidebarCard';
import SidebarHeader from './SidebarHeader';

const Sidebar = (props) => {
  const { users, handleChangeSearch, onChangeSwitch, userProfile, handleLogout, onlineUsers, isJoinMeetingModalVisible, showJoinMeetingModal, cancelJoinMeetingModal, isChatGroupModalVisible, showChatGroupModal, handleChatGroupCancel } = props;
  const conversationList = useSelector(selectConversationList);


  function isOnline(userid) {
    return onlineUsers.indexOf(parseInt(userid)) !== -1;
  }

  return (
    <div className="sidebar-container">
      <SidebarHeader
        handleLogout={handleLogout}
        isJoinMeetingModalVisible={isJoinMeetingModalVisible}
        cancelJoinMeetingModal={cancelJoinMeetingModal}
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
                <CustomAvatar
                  size={40}
                  src={user.profileImage}
                  icon={isOnline(user.id) && "small"}
                />
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

