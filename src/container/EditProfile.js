import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { editprofileApi } from '../api/auth';
import { selectUserProfile,  setUserProfile } from '../redux/features/authSlice';
import EditProfileForm from '../ui/profile/EditProfileForm';


const EditProfile = () => {
  const userProfile = useSelector(selectUserProfile);
  const navigate = useNavigate();
  const dispatch = useDispatch();
 

  // handle User profile edit
  async function handleEditProfile(values) {
    const userId = userProfile.id;

    const newProfile = {
      fullname: values?.fullname,
      city: values?.city,
      phoneNumber: values?.phoneNumber,
      aboutMe: values?.aboutMe,
    }

    async function successHandler(response) {
      const res = await response.json();
      dispatch(setUserProfile(res))
      navigate('/profile');
    }

    async function handleBadReq(response) {
      let error = await response.json();
      console.log(error);
    }

    return await editprofileApi(userId, newProfile, { successHandler, handleBadReq })
  }

  return (
    <EditProfileForm handleEditProfile={handleEditProfile} userProfile={userProfile} />
  );
};

export default EditProfile;