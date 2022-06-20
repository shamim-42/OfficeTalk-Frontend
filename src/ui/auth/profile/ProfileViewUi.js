import { Button, Descriptions, Form, Modal, Spin } from 'antd';
import { Link } from 'react-router-dom';
import EditPasswordModal from '../../modal/EditPasswordModal';

const ProfileViewUi = (props) => {
  const { userProfile, handleEditPassword, showPasswordModal, setOpenPasswordModal, openPasswordModal, loading } = props;
  const { fullname, email } = userProfile;
  const [form] = Form.useForm();
  form.setFieldsValue({ fullname, email });



  return (
    <>
      <div className="profile-view">
        <WrapperTitle showPasswordModal={showPasswordModal} title="Profile info">
          <Descriptions
            bordered
            column={1}
            labelStyle={{
              fontWeight: 600,
            }}
          >
            <Descriptions.Item label="Name"> {userProfile?.fullname.toUpperCase()}</Descriptions.Item>
            <Descriptions.Item label="Email"> {userProfile?.email} </Descriptions.Item>
            <Descriptions.Item label="User Name"> {userProfile?.username} </Descriptions.Item>
            <Descriptions.Item label="Bio Data"> {userProfile?.aboutMe} </Descriptions.Item>
            <Descriptions.Item label="City"> {userProfile?.city} </Descriptions.Item>
            <Descriptions.Item label="Phone Number"> {userProfile?.phoneNumber} </Descriptions.Item>
          </Descriptions>
        </WrapperTitle>
      </div >
      <Modal
        className="change-password-modal"
        footer={null}
        visible={openPasswordModal}
        closable={false}
      >
        <Button
          onClick={() => setOpenPasswordModal(false)}
          className="modal-cross-button">
          X
        </Button>
        <Spin spinning={loading}>
          <EditPasswordModal handleEditPassword={handleEditPassword} />
        </Spin>
      </Modal>
    </>
  );
};

const WrapperTitle = ({ title, children, header, showPasswordModal }) => {
  return (
    <div>
      <div className="profile-titlebar">
        <h6 className="profile-title">
          {title}
        </h6>
        <div className="profile-buttons">
          <Link to="/editprofile">
            <Button type="primary" shape="round">
              Edit Profile
            </Button>
          </Link>
          <Button type="primary"
            onClick={showPasswordModal}
            shape="round">
            Edit Password
          </Button>
        </div>
      </div>
      <div>
        {children}
      </div>
    </div>
  );
};

export default ProfileViewUi;
