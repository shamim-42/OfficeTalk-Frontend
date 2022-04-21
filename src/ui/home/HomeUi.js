import React from 'react';
import { Layout } from 'antd';
import Sidebar from '../sidebar/Sidebar';
import { Outlet } from 'react-router-dom';
const { Sider, Content } = Layout;

const HomeUi = (props) => {
  const { users, handleChangeSearch, onChangeSwitch, userProfile } = props;

  return (
    <>
      <Sider
        width={460}
        className="sider-component"
      >
        <Sidebar
          userProfile={userProfile}
          handleChangeSearch={handleChangeSearch}
          onChangeSwitch={onChangeSwitch}
          users={users} />
      </Sider>

      <Content className="content-area">
        <Outlet />
      </Content>
    </>
  );
};

export default HomeUi;