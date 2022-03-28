import React from 'react';
import { Layout } from 'antd';
import Sidebar from '../sidebar/Sidebar';
import { Outlet } from 'react-router-dom';
const { Sider, Content } = Layout;

const HomeUi = (props) => {
  const { users, handleChangeSearch, onChangeSwitch } = props;

  return (
    <>
      <Sider
        width={460}
        className="sider-component"
      >
        <Sidebar
          handleChangeSearch={handleChangeSearch}
          onChangeSwitch={onChangeSwitch}
          users={users} />
      </Sider>

      <Content style={{ margin: '0 16px 0 460px', overflow: 'initial' }}>
        <Outlet />
      </Content>
    </>
  );
};

export default HomeUi;