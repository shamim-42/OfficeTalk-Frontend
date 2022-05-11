import { Button, Form, Input, Spin } from 'antd';
import React from 'react';
import UploadProfile from './UploadProfile';


const EditProfileForm = (props) => {
  const { handleEditProfile, userProfile, handleEditProfileImage, handleImageChange, photoChange,loader } = props;
  const { fullname, email, username, aboutMe, city, phoneNumber } = userProfile;
  const [form] = Form.useForm();
  form.setFieldsValue({ fullname, email, username, aboutMe, city, phoneNumber });


  return (
    <>
      <WrapperTitle title="Edit Profile:" />
      <div className="edit-profile-container">
        <Spin spinning={loader} delay={100}>
          <UploadProfile
            handleEditProfileImage={handleEditProfileImage}
            handleImageChange={handleImageChange}
            userProfile={userProfile}
            photoChange={photoChange}
          />
        </Spin>

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
            name="username"
            label="Username"
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            name="email"
            label="E-mail"
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            name="aboutMe"
            label="About Me"
            rules={[
              {
                whitespace: true,
              },
            ]}
          >
            <Input.TextArea showCount maxLength={100} />
          </Form.Item>

          <Form.Item
            name="city"
            label="City"
            rules={[
              {
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="phoneNumber"
            label="Phone Number"
            rules={[
              {
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update Profile
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};


const WrapperTitle = ({ title }) => {
  return (
    <div>
      <div className="profile-titlebar">
        <h6 className="profile-title">
          {title}
        </h6>
      </div>
    </div>
  );
};

export default EditProfileForm;