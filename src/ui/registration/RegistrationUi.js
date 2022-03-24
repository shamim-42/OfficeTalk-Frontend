import { Button, Col, Form, Input, Row } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const RegistrationUi = (props) => {
  const { onFinish } = props;

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
              Create Account
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
                name="name"
                align="center"
                rules={[
                  {
                    required: true,
                    message: 'Please input your name!',
                  },
                ]}
              >
                <Input
                  className="regular-input"
                  placeholder="Full Name"
                />
              </Form.Item>
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
                  Create Account
                </Button>
                <p className="havenotaccount">Allready have an account?
                  <Link to="/login" style={{ paddingLeft: '10px' }} >
                    Login
                  </Link>
                </p>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default RegistrationUi;