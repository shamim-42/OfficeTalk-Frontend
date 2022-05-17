import { Layout } from 'antd';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';
const { Sider, Content } = Layout;

const HomeUi = (props) => {
  const { users, handleChangeSearch, onChangeSwitch, userProfile, handleLogout, onlineUsers, unreadCount } = props;

  return (
    <>
      <Sider
        width={460}
        className="sider-component"
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