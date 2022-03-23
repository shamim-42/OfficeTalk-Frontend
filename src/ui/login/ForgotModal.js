import { Button, Form, Input } from 'antd';
import React from 'react';

const ForgotModal = (props) => {
  const { handleCancel, onFinishModal, modalno, onFinishOtp, onFinishPassword } = props;
  if (modalno === 2) {
    return (
      <>
        <h3 className="forgot-title title-color-50">Enter OTP here</h3>
        <Form
          className="modal-form"
          name="modal"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinishOtp}
          autoComplete="off"
        >
          <Form.Item
            name="otp"
            align="center"
            rules={[
              {
                required: true,
                message: 'Please enter correct OTP code!',
              },
            ]}
          >
            <Input
              className="regular-input"
              placeholder="Please Enter the OTP code here!"
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
                Confirm
              </Button>
            </div>
          </Form.Item>
        </Form>
      </>
    )
  }
  else if (modalno === 3) {
    return (
      <>
        <h3 className="forgot-title title-color-50">Change password </h3>
        <Form
          className="modal-form"
          name="modal"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinishPassword}
          autoComplete="off"
        >
          <Form.Item
            name="password"
            align="center"
            rules={[
              {
                required: true,
                message: 'Password is required!',
              },
            ]}
          >
            <Input.Password
              className="regular-input"
              placeholder="New password"
            />
          </Form.Item>
          <Form.Item
            name="confirmPass"
            align="center"
            rules={[
              {
                required: true,
                message: 'Password is required!',
              },
            ]}
          >
            <Input.Password
              className="regular-input"
              placeholder="Confirm the password"
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
                Continue
              </Button>
            </div>
          </Form.Item>
        </Form>
      </>
    );
  }
  return (
    <>
      <h3 className="forgot-title title-color-50">Sent code via email </h3>
      <Form
        className="modal-form"
        name="modal"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinishModal}
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
              Continue
            </Button>
          </div>
        </Form.Item>
      </Form>
    </>
  );
};

export default ForgotModal;