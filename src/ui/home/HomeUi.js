import { Affix, Layout } from 'antd';
import { useRef } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';
const { Sider, Content } = Layout;

const HomeUi = (props) => {
  const { users, handleChangeSearch, onChangeSwitch, userProfile, handleLogout, onlineUsers, isJoinMeetingModalVisible, showJoinMeetingModal, cancelJoinMeetingModal, isChatGroupModalVisible, showChatGroupModal, handleChatGroupCancel, setIsChatGroupModalVisible } = props;
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
          cancelJoinMeetingModal={cancelJoinMeetingModal}
          isChatGroupModalVisible={isChatGroupModalVisible}
          showChatGroupModal={showChatGroupModal}
          handleChatGroupCancel={handleChatGroupCancel}
          setIsChatGroupModalVisible={setIsChatGroupModalVisible}
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