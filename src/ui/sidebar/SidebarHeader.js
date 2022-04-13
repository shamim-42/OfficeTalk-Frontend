import { Avatar, Button, Col, Dropdown, Form, Input, Menu, Popover, Row } from 'antd';
import { CgMenuGridO } from "react-icons/cg";
import { BsChatTextFill } from "react-icons/bs";
import { MdCall } from "react-icons/md";
import { FiVideo } from "react-icons/fi";
import { IoOptions } from "react-icons/io5";
import { HiOutlineFolderRemove } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { IoChevronDownOutline } from "react-icons/io5";
import React from 'react';
import SettingPopover from './SettingPopover';
import FilterPopover from './FilterPopover';

const SidebarHeader = (props) => {
  const { handleChangeSearch, onChangeSwitch } = props;


  return (
    <div className="sidebar-header">
      <Row>
        <Col md={20}>
          <div className="sidebar-user">
            <Avatar
              src="https://i.ibb.co/FX9y91r/Ellipse-7.png"
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
              }}
            />
            <p className="sidebar-user-name">Abdullah</p>
          </div>
        </Col>
        <Col md={4}>
          <Row className="setting-preicon">
            <Popover placement="bottomLeft"
              content={<SettingPopover onChangeSwitch={onChangeSwitch} />}
              trigger="click">
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
                <Button className="dropdown-menu-button" type="link">Join a meeting</Button>
              </Menu.Item>
              <Menu.Item key="3">
                <Button className="dropdown-menu-button" type="link">Create a chat group</Button>
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
    </div>
  );
};

export default SidebarHeader;