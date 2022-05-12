import React from 'react';
import { Layout } from 'antd';
import Sidebar from '../sidebar/Sidebar';
import { Outlet } from 'react-router-dom';
const { Sider, Content } = Layout;

const HomeUi = (props) => {
  const { users, handleChangeSearch, onChangeSwitch, userProfile, handleLogout, onlineUsers } = props;

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