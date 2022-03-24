import React from 'react';
import { CgMenuGridO } from "react-icons/cg";
import { BsChatTextFill } from "react-icons/bs";
import { MdCall } from "react-icons/md";
import { FiVideo } from "react-icons/fi";
import { IoOptions } from "react-icons/io5";
import { HiOutlineFolderRemove } from "react-icons/hi";
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UserOutlined,
  UploadOutlined,
  VideoCameraOutlined,
  SearchOutlined,
  HolderOutlined
} from '@ant-design/icons';
import { Avatar, Button, Col, Form, Input, Menu, Row, Select } from 'antd';

const Sidebar = () => {

  const { Option } = Select;

  function handleChange(value) {
    console.log(value); // { value: "lucy", key: "lucy", label: "Lucy (101)" }
  }

  const iconsidebar = [AppstoreOutlined,
    BarChartOutlined,
    CloudOutlined,
    ShopOutlined,
    TeamOutlined,
    UserOutlined,
    UploadOutlined,
    VideoCameraOutlined,
    SearchOutlined,
    HolderOutlined]
  return (
    <div className="sidebar-container">
      <div className="sidebar-header">
        <Row>
          <Col md={10}>
            <div className="sidebar-user">
              <Avatar
                src="https://i.ibb.co/N37F3Zy/Ellipse-7.png"
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                }}
              />
              <p className="sidebar-user-name">Abdullah</p>
            </div>
          </Col>
          <Col md={14}>
            <Row className="setting-preicon">
              <Button type="text" >
                <CgMenuGridO style={{ fontSize: '16px' }} />
              </Button>
            </Row>
            <Row className="sidebar-header-icons">
              <Select
                size="small"
                className="sidebar-header-select"
                labelInValue
                defaultValue={{ value: 'lucy' }}
                style={{ width: 120, fontSize: '12px' }}
                onChange={handleChange}
              >
                <Option value="jack">Meeting / Chat</Option>
                <Option value="lucy">Meeting / Chat</Option>
              </Select>
              <BsChatTextFill style={{ fontSize: '16px', color: '#008DDC' }} />
              <MdCall style={{ fontSize: '16px' }} />
              <FiVideo style={{ fontSize: '16px' }} />
              <HiOutlineFolderRemove style={{ fontSize: '16px' }} />
            </Row>
          </Col>
        </Row>
        <Row>
          <Col md={20}>
            <Form
              name="normal_login"
              className="login-form"
              wrapperCol={{
                span: 22,
              }}
            // onFinish={onFinish}
            >
              <Form.Item
                name="search"
              >
                <Input prefix={<SearchOutlined className="site-form-item-icon" />} placeholder="people , groups , message" />
              </Form.Item>
            </Form>
          </Col>
          <Col md={4}>
            <Button type="text">
              <IoOptions style={{ fontSize: '16px' }} />
            </Button>
          </Col>
        </Row>
      </div>
      <Menu className="home-sidebar" mode="inline" defaultSelectedKeys={['4']}>
        {
          iconsidebar.map((iconn, index) => (
            <Menu.Item key={index}>
              nav {index}
            </Menu.Item>
          ))
        }
      </Menu>
    </div>
  );
};

export default Sidebar;