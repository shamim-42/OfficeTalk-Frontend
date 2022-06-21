import { message } from 'antd';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { editPasswordApi } from '../../api/auth';
import { selectUserProfile } from '../../redux/features/authSlice';
import ProfileViewUi from '../../ui/auth/profile/ProfileViewUi';

const ProfileView = () => {
  const userProfile = useSelector(selectUserProfile);
  const [loading, setLoading] = useState(false);
  const [openPasswordModal, setOpenPasswordModal] = useState(false);


  const showPasswordModal = () => {
    setOpenPasswordModal(true);
  };

  // handle User password edit
  async function handleEditPassword(values) {
    setLoading(true)
    const userId = userProfile.id;
    const newProfile = {
      oldpass: values?.oldpass,
      newpass: values?.newpass,
    }

    async function successHandler(response) {
      const res = await response.json();
      setLoading(false)
      message.success(res.message);
      setOpenPasswordModal(false);
    }

    async function handleBadReq(response) {
      setLoading(false)
      let error = await response.json();
      message.error(error.message);
    }
    return await editPasswordApi(userId, newProfile, { successHandler, handleBadReq })
  }

  return (
    <ProfileViewUi
      handleEditPassword={handleEditPassword}
      showPasswordModal={showPasswordModal}
      openPasswordModal={openPasswordModal}
      setOpenPasswordModal={setOpenPasswordModal}
      loading={loading}
      userProfile={userProfile} />
  );
};

export default ProfileView;