import { Avatar, Badge, Button, Col, Dropdown, Form, Input, Menu, Modal, Popover, Row, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { BiSearch } from "react-icons/bi";
import { BsChatTextFill } from "react-icons/bs";
import { CgMenuGridO } from "react-icons/cg";
import { FiVideo } from "react-icons/fi";
import { HiOutlineFolderRemove } from "react-icons/hi";
import { ImUpload } from "react-icons/im";
import { IoChevronDownOutline, IoOptions, IoPersonCircle } from "react-icons/io5";
import { MdCall } from "react-icons/md";
import { Link } from 'react-router-dom';
import FilterPopover from './FilterPopover';
import SettingPopover from './SettingPopover';

const columns = [
  {
    dataIndex: 'name',
  }
];

const data = [];

for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
  });
}


const SidebarHeader = (props) => {
  const { handleChangeSearch, onChangeSwitch, userProfile, handleLogout, isJoinMeetingModalVisible, showJoinMeetingModal, handleJoinMeetingCancel, isChatGroupModalVisible, showChatGroupModal, handleChatGroupCancel } = props;



  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (newSelectedRowKeys, n) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    order: 2
  };
  useEffect(() => {
    console.log(selectedRowKeys)
  }, [selectedRowKeys])

  return (
    <div className="sidebar-header">
      <Row>
        <Col md={20}>
          <div className="sidebar-user">
            <Badge
              offset={["-5%", "85%"]}
              style={{
                width: "8px",
                height: "8px",
                backgroundColor: "#67C148",
                textAlign: "left"
              }}
              dot={true}
            >
              <Link to="/profile">
                {userProfile?.profileImage ?
                  <Avatar
                    src={userProfile?.profileImage}
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                    }}
                  />
                  :
                  <IoPersonCircle style={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                  }} />
                }
              </Link>
            </Badge>
            <Link to="/profile">
              <p className="sidebar-user-name">{userProfile?.fullname}</p>
            </Link>
          </div>
        </Col>
        <Col md={4}>
          <Row className="setting-preicon">
            <Popover placement="bottomLeft"
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
        <Col md={14} className="sidebar-header-icons">
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
        <Col md={22}>
          <Form
            name="search_form"
            onFinish={handleChangeSearch}
            wrapperCol={{
              span: 22,
            }}
          // onFinish={onFinish}
          >
            <Form.Item
              name="search"
            >
              <Input prefix={<BiSearch className="site-form-item-icon" />} placeholder="people , groups , message" />
            </Form.Item>
          </Form>
        </Col>

        <Col md={2}>
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
          onClick={handleJoinMeetingCancel}
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
        <Button
          onClick={handleChatGroupCancel}
          className="modal-cross-button">
          X
        </Button>
        <h3 className="create-group-title">
          Create a chat group
        </h3>
        <Input className="create-group-input" />

        <div className="create-group-userlist">
          <Table pagination={false} onChange={(e) => console.log(e)} rowSelection={rowSelection} showHeader={false} columns={columns} dataSource={data} />
        </div>

      </Modal>
    </div >
  );
};

export default SidebarHeader;

