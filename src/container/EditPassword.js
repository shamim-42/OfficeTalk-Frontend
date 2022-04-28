import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { editprofileApi } from '../api/auth';
import { selectUserProfile, selectUserToken } from '../redux/features/authSlice';
import EditPasswordForm from '../ui/profile/EditPasswordForm';


const EditPassword = () => {
  const userProfile = useSelector(selectUserProfile);
  const navigate = useNavigate();
  const accessToken = useSelector(selectUserToken);
  console.log(accessToken);


  // handle User sign out and
  async function handleEditProfile(values) {
    const userId = userProfile.userId;

    const newProfile = {
      email: values?.email,
      oldPassword: values?.oldPassword,
      newPassword: values?.password,
      newPasswordAgain: values?.confirm,
      fullname: values?.fullname,
    }

    // const requestOptions = {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: "bearer" + " " + accessToken
    //   },
    //   body: JSON.stringify(newProfile)
    // };

    // fetch('http://192.168.1.21:4000/users/edit/3', requestOptions)
    //   .then(response => response.json())
    //   .then(data => console.log(data));


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
    <EditPasswordForm handleEditProfile={handleEditProfile} userProfile={userProfile} />
  );
};

export default EditPassword;