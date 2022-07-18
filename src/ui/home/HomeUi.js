import { Affix, Layout } from 'antd';
import { useRef } from 'react';
import { Outlet } from 'react-router-dom';
import Ring from '../../assest/iphone_notification.mp3';
import Sidebar from '../../container/sidebar/Sidebar';
const { Sider, Content } = Layout;

const HomeUi = (props) => {
  const { Audio } = props;
  const sideBarRef = useRef(null)

  return (
    <>
      <audio src={Ring} loop ref={Audio} muted="muted" />
      <Affix offsetTop={0}>
        <Sider
          width={460}
          className="sider-component"
          trigger={sideBarRef?.current}
          collapsed={false}
        >
          <Sidebar />
        </Sider>
      </Affix>
      <Content className="content-area">
        <Outlet ji="ji" />
      </Content>
    </>
  );
};

export default HomeUi;