import { Affix, Layout } from 'antd';
import React, { useRef } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';
const { Sider, Content } = Layout;

const HomeUi = (props) => {
  const { users, handleChangeSearch, onChangeSwitch, userProfile, handleLogout, onlineUsers, isJoinMeetingModalVisible, showJoinMeetingModal, handleJoinMeetingCancel, isChatGroupModalVisible, showChatGroupModal, handleChatGroupCancel } = props;
  const sideBarRef = useRef(null)

  return (
    <>
    <Affix offsetTop={0}>
      <Sider
        width={460}
        className="sider-component"
        trigger={sideBarRef?.current}
        collapsed={false}
      >
        <Sidebar
          handleLogout={handleLogout}
          userProfile={userProfile}
          handleChangeSearch={handleChangeSearch}
          onChangeSwitch={onChangeSwitch}
          isJoinMeetingModalVisible={isJoinMeetingModalVisible}
          showJoinMeetingModal={showJoinMeetingModal}
          handleJoinMeetingCancel={handleJoinMeetingCancel}
          isChatGroupModalVisible={isChatGroupModalVisible}
          showChatGroupModal={showChatGroupModal}
          handleChatGroupCancel={handleChatGroupCancel}
          users={users}
          onlineUsers={onlineUsers} />
      </Sider>
      </Affix>
      <Content className="content-area">
        <Outlet ji="ji" />
      </Content>
    </>
  );
};

export default HomeUi;