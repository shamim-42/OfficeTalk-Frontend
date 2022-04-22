import { Descriptions } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const ProfileViewUi = (props) => {
  const { userProfile } = props;


  return (
    <div className="profile-view">
      <WrapperTitle title="Profile info">
        <Descriptions
          bordered
          column={1}
          labelStyle={{
            fontWeight: 600,
          }}
        >
          <Descriptions.Item label="Name"> {userProfile?.fullname.toUpperCase()}</Descriptions.Item>
          <Descriptions.Item label="Email"> {userProfile?.email} </Descriptions.Item>
          <Descriptions.Item label="User ID"> {userProfile?.userId} </Descriptions.Item>
          <Descriptions.Item label="User Name"> {userProfile?.username} </Descriptions.Item>
        </Descriptions>
      </WrapperTitle>
    </div >
  );
};


const WrapperTitle = ({ title, children, header }) => {
  return (
    <div>
      <div className="profile-titlebar">
        <h6 className="profile-title">
          {title}
        </h6>
        <Link className="editprofile-link" to="/editprofile">
          Edit Profile
        </Link>
      </div>
      <div>
        {children}
      </div>
    </div>
  );
};

export default ProfileViewUi;
