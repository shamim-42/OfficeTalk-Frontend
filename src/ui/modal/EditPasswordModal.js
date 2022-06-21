import { Button, Form, Input } from 'antd';

const EditPasswordModal = ({ handleEditPassword }) => {
  return (
    <>
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        labelAlign="left"
        name="editProfile"
        onFinish={handleEditPassword}
        scrollToFirstError
      >
        <Form.Item
          name="oldpass"
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
          name="newpass"
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
                if (!value || getFieldValue('newpass') === value) {
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
    </>
  );
};

export default EditPasswordModal;