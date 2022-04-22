import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { editprofileApi } from '../api/auth';
import { selectUserProfile } from '../redux/features/authSlice';
import EditProfileForm from '../ui/profile/EditProfileForm';

const EditProfile = () => {
  const userProfile = useSelector(selectUserProfile);
  const navigate = useNavigate();


  // handle User sign out and
  async function handleEditProfile(values) {
    const userId = userProfile.userId;

    const newProfile = {
      email: values.email,
      oldPassword: values.oldPassword,
      newPassword: values.password,
      newPasswordAgain: values.confirm,
      fullname: values.fullname,
    }

    console.log(newProfile);

    async function successHandler(response) {
      const res = await response.json();
      console.log(res);
      // navigate('/profile');
    }

    async function handleBadReq(response) {
      let error = await response.json();
      console.log(error);
    }

    return await editprofileApi(userId, newProfile, { successHandler, handleBadReq })
  }

  return (
    <EditProfileForm handleEditProfile={handleEditProfile} />
  );
};

export default EditProfile;