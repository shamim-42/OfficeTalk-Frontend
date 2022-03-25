import React from 'react';
import { Layout } from 'antd';

import Sidebar from '../sidebar/Sidebar';

const { Sider, Content } = Layout;

const HomeUi = () => {

  return (
    <>
      <Sider
        width={460}
        style={{
          // overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <Sidebar />
      </Sider>
      <Content style={{ margin: '24px 16px 0 500px', overflow: 'initial' }}>
        <div className="home-content">
          <img className="circle-img"
            src="https://i.ibb.co/FX9y91r/Ellipse-7.png"
            width="190px"
            height="190px"
            alt="Ellipse-7" border="0" />
          <h2>Hi Abdullah!</h2>
          <p className="start-chat">Start chatting ! </p>
        </div>
      </Content>
    </>
  );
};

export default HomeUi;