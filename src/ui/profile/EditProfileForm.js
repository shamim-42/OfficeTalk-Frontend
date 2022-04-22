import { Button, Form, Input } from 'antd';
import React from 'react';


const EditProfileForm = ({ handleEditProfile }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (
    <WrapperTitle title="Edit Profile:">
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        labelAlign="left"
        form={form}
        name="editProfile"
        onFinish={onFinish}
        scrollToFirstError
      >
        <Form.Item
          name="fullname"
          label="Full Name"
          rules={[
            {
              required: true,
              message: 'Please input your nickname!',
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="oldPassword"
          label="Old Password"
          rules={[
            {
              required: true,
              message: 'Please input your Old password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
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
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }

                return Promise.reject(new Error('The two passwords that you entered do not match!'));
              },
            }),
          ]}
        >
          <Input type="password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update Profile
          </Button>
        </Form.Item>
      </Form>
    </WrapperTitle>
  );
};


const WrapperTitle = ({ title, children, header }) => {
  return (
    <div className="edit-profile-container">
      <div className="profile-titlebar">
        <h6 className="profile-title">
          {title}
        </h6>
      </div>
      <div>
        {children}
      </div>
    </div>
  );
};

export default EditProfileForm;