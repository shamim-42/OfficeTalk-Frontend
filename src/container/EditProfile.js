import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { editprofileApi } from '../api/auth';
import { selectUserProfile, selectUserToken, setUserProfile } from '../redux/features/authSlice';
import EditProfileForm from '../ui/profile/EditProfileForm';


const EditProfile = () => {
  const userProfile = useSelector(selectUserProfile);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = useSelector(selectUserToken);


  // handle User sign out and
  async function handleEditProfile(values) {
    const userId = userProfile.id;

    const newProfile = {
      fullname: values?.fullname,
      city: values?.city,
      phoneNumber: values?.phone,
      aboutMe: values?.aboutMe,
    }


    async function successHandler(response) {
      console.log(response);
      const res = await response.json();
      console.log(res);
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