import { Avatar, Button, Col, Dropdown, Form, Input, Menu, Modal, Popover, Row } from 'antd';
import { BiSearch } from "react-icons/bi";
import { BsChatTextFill } from "react-icons/bs";
import { CgMenuGridO } from "react-icons/cg";
import { FiVideo } from "react-icons/fi";
import { HiOutlineFolderRemove } from "react-icons/hi";
import { ImUpload } from "react-icons/im";
import { IoChevronDownOutline, IoOptions } from "react-icons/io5";
import { MdCall } from "react-icons/md";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CreateGroup from '../../container/group/CreateGroup';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { selectUserProfile } from '../../redux/features/authSlice';
import CustomAvatar from '../helper/CustomAvatar';
import TextAvatar from '../helper/TextAvatar';
import UserProfileView from '../modal/UserProfileView';
import FilterPopover from './FilterPopover';
import SearcUsersPopover from './SearcUsersPopover';
import SettingPopover from './SettingPopover';


const SidebarHeaderUI = (props) => {
  const { handleChangeSearch, onChangeSwitch,  handleLogout, isJoinMeetingModalVisible, showJoinMeetingModal, cancelJoinMeetingModal, isChatGroupModalVisible, showChatGroupModal, handleChatGroupCancel, setIsChatGroupModalVisible, showProfileOpenModal, friendList, isOnline, openProfile, closeProfileModal, foundUsers, handleBlur } = props;

  const { width: windowWidth } = useWindowDimensions();
  const userProfile = useSelector(selectUserProfile);

  return (
    <>
      <div className="sidebar-header">
        <Row>
          <Col span={20}>
            <div className="sidebar-user">
              {(userProfile.profileImageResize || userProfile.profileImage) ?
                <div onClick={showProfileOpenModal}>
                  <CustomAvatar
                    size={44}
                    icon="small"
                    src={userProfile.profileImageResize || userProfile.profileImage} />
                </div>
                :
                <div onClick={showProfileOpenModal}>
                  <TextAvatar name={userProfile.fullname} size="44px" fontSize="20px" />
                </div>
              }
              <Link to="/profile">
                <p className="sidebar-user-name">{userProfile?.fullname}</p>
              </Link>
            </div>
          </Col>
          <Col span={4}>
            <Row className="setting-preicon">
              <Popover placement="bottomLeft"
                className="sidebar-setting"
                content={<SettingPopover handleLogout={handleLogout} onChangeSwitch={onChangeSwitch} />}
                trigger="click"
              >
                <Button type="text" >
                  <CgMenuGridO style={{ fontSize: '16px' }} />
                </Button>
              </Popover>
            </Row>
          </Col>
        </Row>
        <Row className="sidebar-icon-container">
          <Col span={windowWidth > 480 ? 14 : 18} className="sidebar-header-icons">
            <Dropdown
              placement="bottom"
              overlay={<Menu>
                <Menu.Item key="1">
                  <Button className="dropdown-menu-button" type="link">Host a meeting</Button>
                </Menu.Item>
                <Menu.Item key="2">
                  <Button className="dropdown-menu-button" onClick={showJoinMeetingModal} type="link">Join a meeting</Button>
                </Menu.Item>
                <Menu.Item key="3">
                  <Button className="dropdown-menu-button" onClick={showChatGroupModal} type="link">Create a chat group</Button>
                </Menu.Item>
              </Menu>}
              trigger={['click']}>
              <Button className="dropdown-button">
                <p>Meeting / Chat</p>
                <IoChevronDownOutline />
              </Button>
            </Dropdown>

            <Button type="text">
              <BsChatTextFill style={{ color: '#008DDC' }} />
            </Button>
            <Button type="text">
              <MdCall />
            </Button>
            <Button type="text">
              <FiVideo />
            </Button>
            <Button type="text">
              <HiOutlineFolderRemove />
            </Button>
          </Col>
        </Row>
        <Row>
          <Col span={22}>
            <Popover
              visible={foundUsers.length > 0}
              placement="bottom"
              content={<SearcUsersPopover users={foundUsers} />}
              trigger="contextMenu">
              <Form
                name="search_form"
                wrapperCol={{
                  span: 22,
                }}
              >
                <Form.Item
                  name="search"
                >
                  <Input
                    prefix={<BiSearch className="site-form-item-icon" />}
                    onChange={handleChangeSearch}
                    onBlur={handleBlur}
                    placeholder="people , groups , message" />
                </Form.Item>
              </Form>
            </Popover>
          </Col>

          <Col span={2}>
            <Popover placement="bottomLeft" content={<FilterPopover />} trigger="click">
              <Button className="filter-button" type="text">
                <IoOptions style={{ fontSize: '16px' }} />
              </Button>
            </Popover>
          </Col>
        </Row>
        <Modal
          visible={isJoinMeetingModalVisible}
          className="join-meeting-modal"
          closable={false}
          footer={null}
          width="auto"
        >
          <Button
            onClick={cancelJoinMeetingModal}
            className="modal-cross-button">
            X
          </Button>
          <h3 className="join-meeting-title">
            Join A Meeting
          </h3>
          <p className="join-meeting-subtitle">Meeting link or code</p>
          <Input className="join-meeting-input" suffix={<ImUpload />} />
          <Button
            className="btn-theme-primary-fluid join-meeting-button"
            type="primary"
            htmlType="submit">
            Join
          </Button>
        </Modal>
        <Modal
          visible={isChatGroupModalVisible}
          className="create-group-modal"
          closable={false}
          footer={null}
          width="auto"
        >
          <CreateGroup setIsChatGroupModalVisible={setIsChatGroupModalVisible} handleChatGroupCancel={handleChatGroupCancel} />
        </Modal>
        <Modal
          visible={openProfile}
          className="profile-modal"
          closable={false}
          footer={null}
        >
          <UserProfileView handleLogout={handleLogout} userProfile={userProfile} closeProfileModal={closeProfileModal} />
        </Modal>
      </div >
      <div className="online-users">
        <Avatar.Group className="online-user-group">
          {
            friendList.map((user, index) => (
              isOnline(user.id) &&
              <Link to={`chat/${user.id}`} key={user.id || index}>
                {
                  user.profileImageResize ?
                    <CustomAvatar
                      size={40}
                      src={user.profileImageResize}
                      icon={isOnline(user.id) && "small"}
                    />
                    :
                    <TextAvatar name={user.fullname}
                      icon={isOnline(user.id) && "small"}
                      size="40px" fontSize="18px" />
                }
              </Link>
            ))
          }
          {/* {users.length > 8 &&
            <button className="all-user-button">
              All
            </button>
          } */}
        </Avatar.Group>
      </div>

    </>
  );
};

export default SidebarHeaderUI;

