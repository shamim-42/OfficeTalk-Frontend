import { Button, Col, Form, Input, Modal, Row } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginUi = (props) => {
  const { onFinish } = props;

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <section aria-label="Login Section" className="login-section">
      <div>
        <Row>
          <Col className="login-logo" lg={10}>
            <img className="login-logo-img" src="https://i.ibb.co/4TdfXcC/logo.png" alt="logo" />
            <h1>For Better Chatting</h1>
          </Col>
          <Col className="login-form-container" lg={14}>
            <h3 align="start" className="login-form-title">
              Sign In
            </h3>
            <Form
              className="login-form"
              name="basic"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item
                name="email"
                align="center"
                rules={[
                  {
                    required: true,
                    message: 'Please input your valid email!',
                    type: 'email'
                  },
                ]}
              >
                <Input
                  className="regular-input"
                  placeholder="Email  Address"
                />
              </Form.Item>

              <Form.Item
                name="password"
                align="center"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
              >
                <Input.Password
                  className="regular-input"
                  placeholder="Password" />
              </Form.Item>
              <Form.Item className="forgot-password">
                <Button type="link" onClick={showModal}>
                  Forgot password
                </Button>
              </Form.Item>

              <Form.Item
                align="center"
                wrapperCol={{
                  span: 22,
                }}
              >
                <Button
                  className="btn-theme-primary-fluid filled-btn login-button"
                  type="primary"
                  htmlType="submit">
                  Submit
                </Button>
                <p className="havenotaccount">Dont have an account ?
                  <Link to="/register" style={{ paddingLeft: '10px' }} >
                    Sign Up
                  </Link>
                </p>
              </Form.Item>
            </Form>
          </Col>
        </Row>
        <Modal
          visible={isModalVisible}
          closable={false}
          footer={null}
          onCancel={handleCancel}
        >
          <h3 className="forgot-title title-color-50">Sent code via email </h3>
          <Form
            className="modal-form"
            name="modal"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              name="forgot-email"
              align="center"
              rules={[
                {
                  required: true,
                  message: 'Please input your valid email!',
                  type: 'email'
                },
              ]}
            >
              <Input
                className="regular-input"
                placeholder="anyname@gmail.com"
              />
            </Form.Item>
            <Form.Item
              align="center"
              wrapperCol={{
                span: 16,
              }}
            >
              <div className="modal-buttons">
                <Button
                  className="btn-theme-primary-fluid default-btn login-button"
                  type="default"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button
                  className="btn-theme-primary-fluid filled-btn login-button"
                  htmlType="submit">
                  Submit
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </section>
  );
};

export default LoginUi;