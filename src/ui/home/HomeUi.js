import { Affix, Layout } from 'antd';
import { useRef } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';
const { Sider, Content } = Layout;

const HomeUi = (props) => {
  const { userProfile, onlineUsers } = props;
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
            userProfile={userProfile}
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