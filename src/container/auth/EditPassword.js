import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { editPasswordApi } from '../../api/auth';
import { selectUserProfile } from '../../redux/features/authSlice';
import EditPasswordForm from '../../ui/profile/EditPasswordForm';


const EditPassword = () => {
  const userProfile = useSelector(selectUserProfile);
  const navigate = useNavigate();

  // handle User password edit
  async function handleEditPassword(values) {
    const userId = userProfile.id;

    const newProfile = {
      oldpass: values?.oldpass,
      newpass: values?.newpass,
    }

    async function successHandler(response) {
      const res = await response.json();
      navigate('/profile');
    }

    async function handleBadReq(response) {
      let error = await response.json();
      console.log(error);
    }

    return await editPasswordApi(userId, newProfile, { successHandler, handleBadReq })
  }

  return (
    <EditPasswordForm handleEditPassword={handleEditPassword} userProfile={userProfile} />
  );
};

export default EditPassword;