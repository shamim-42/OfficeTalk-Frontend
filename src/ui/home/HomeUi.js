import { Layout } from 'antd';
import React, { useRef } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';
const { Sider, Content } = Layout;

const HomeUi = (props) => {
  const { users, handleChangeSearch, onChangeSwitch, userProfile, handleLogout, onlineUsers, unreadCount } = props;
  const sideBarRef = useRef(null)

  return (
    <>
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
          unreadCount={unreadCount}
          users={users}
          onlineUsers={onlineUsers} />
      </Sider>

      <Content className="content-area">
        <Outlet />
      </Content>
    </>
  );
};

export default HomeUi;