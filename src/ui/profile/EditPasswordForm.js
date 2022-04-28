import { Button, Form, Input } from 'antd';
import React from 'react';


const EditPasswordForm = (props) => {
  const { handleEditProfile, userProfile } = props;
  const { fullname, email } = userProfile;
  const [form] = Form.useForm();
  form.setFieldsValue({ fullname, email });

  return (
    <>
      <WrapperTitle title="Update Password:" />
      <div className="edit-profile-container">
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          labelAlign="left"
          form={form}
          name="editProfile"
          onFinish={handleEditProfile}
          scrollToFirstError
        >
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
              Update Password
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};


const WrapperTitle = ({ title, children, header }) => {
  return (
    <div>
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

export default EditPasswordForm;