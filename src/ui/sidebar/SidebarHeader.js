import { Avatar, Button, Col, Form, Input, Popover, Radio, Row, Select, Space, Switch } from 'antd';
import { CgMenuGridO } from "react-icons/cg";
import { BsChatTextFill } from "react-icons/bs";
import { BsMoon } from "react-icons/bs";
import { MdCall } from "react-icons/md";
import { FiVideo } from "react-icons/fi";
import { IoOptions } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { HiOutlineFolderRemove } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { BiRightArrowCircle } from "react-icons/bi";
import React from 'react';

const SidebarHeader = ({ handleChangeSearch }) => {
  function onChangeSwitch(evt) {
    console.log(evt)
  }

  const content = (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    }}>
      <p style={{}}>
        <IoMdSettings />
        <span style={{ marginLeft: '10px' }}>Setting</span>
      </p>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: '20px',
      }}>
        <p>
          <BsMoon />
          <span style={{ marginLeft: '10px' }}>Night mode</span>
        </p>
        <Switch size="small" defaultChecked onChange={onChangeSwitch} />
      </div>
      <p>
        <BiRightArrowCircle />
        <Button type="link" danger>
          Sign out
        </Button>
      </p>
    </div>
  );

  const contentRadio = (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    }}>
      <Radio.Group value={0}>
        <Space direction="vertical">
          <Radio value={0}>All</Radio>
          <Radio value={1}>People</Radio>
          <Radio value={2}>Groups</Radio>
          <Radio value={3}>Messages</Radio>
        </Space>
      </Radio.Group>
    </div>
  );

  const { Option } = Select;
  return (
    <div className="sidebar-header">
      <Row>
        <Col md={10}>
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

        <Col md={14}>
          <Row className="setting-preicon">
            <Popover placement="bottomLeft" content={content} trigger="click">
              <Button type="text" >
                <CgMenuGridO style={{ fontSize: '16px' }} />
              </Button>
            </Popover>
          </Row>

          <Row className="sidebar-header-icons">
            <Select
              size="small"
              className="sidebar-header-select"
              labelInValue
              defaultValue={{ value: 'lucy' }}
              style={{ width: 120, fontSize: '12px' }}
              onChange={handleChangeSearch}
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
              <Input prefix={<BiSearch className="site-form-item-icon" />} placeholder="people , groups , message" />
            </Form.Item>
          </Form>
        </Col>
        <Col md={4}>
          <Popover placement="bottomLeft" content={contentRadio} trigger="click">
            <Button type="text" style={{
              borderRadius: '10px',
            }}>
              <IoOptions style={{ fontSize: '16px' }} />
            </Button>
          </Popover>
        </Col>
      </Row>
    </div>
  );
};

export default SidebarHeader;