import { Button, Col, Form, Input, Modal, Row } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import ForgotModal from './ForgotModal';

const LoginUi = (props) => {
  const { onSubmitHandler, onFinishModal, showModal, handleCancel, isModalVisible, modalNumber, onFinishOtp, onFinishPassword } = props;


  return (
    <section aria-label="Login Section" className="login-section">
      <div>
        <Row>
          <Col className="login-logo" lg={10}>
            <img className="login-logo-img" src="https://i.ibb.co/4TdfXcC/logo.png" alt="logo" />
            <h1>Office Talk</h1>
            <p className="title-slogun">For Better Chatting</p>
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
              onFinish={onSubmitHandler}
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
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || value.length >= 8) {
                        return Promise.resolve();
                      }

                      return Promise.reject(new Error('Password must be at least 8 characters!'));
                    },
                  }),
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
                  <Link to="/signup" style={{ paddingLeft: '10px' }} >
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
        >
          <ForgotModal
            isModalVisible={isModalVisible}
            handleCancel={handleCancel}
            onFinishModal={onFinishModal}
            modalNumber={modalNumber}
            onFinishOtp={onFinishOtp}
            onFinishPassword={onFinishPassword}
          />
        </Modal>
      </div>
    </section>
  );
};

export default LoginUi;