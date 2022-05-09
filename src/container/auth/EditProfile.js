import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { editprofileApi } from '../../api/auth';
import { selectUserProfile, selectUserToken, setUserProfile } from '../../redux/features/authSlice';
import EditProfileForm from '../../ui/profile/EditProfileForm';


const EditProfile = () => {
  const userToken = useSelector(selectUserToken);
  const userProfile = useSelector(selectUserProfile);
  const newProfile = JSON.parse(JSON.stringify(userProfile));
  const userId = userProfile.id;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [uploadPhoto, setUploadPhoto] = useState(null);
  const [photoChange, setPhotoChange] = useState(false)


  // Handle onChange profileImage function
  const handleImageChange = (event) => {
    setUploadPhoto(event.target.files[0])
    setPhotoChange(true);
  }

  // Handle edit profileImage function
  const handleEditProfileImage = async () => {
    if (!uploadPhoto) {
      return
    }
    const formData = new FormData();
    const fileName = uploadPhoto?.name?.replace(/ /g, "_");
    const dateTime = new Date().toString().replace(/ /g, "_");
    const randomNumber = Math.floor(Math.random() * (1000, 9999) + 1000);
    const fullFileName = fileName + dateTime + randomNumber;
    formData.append("file", uploadPhoto, fullFileName);


    await fetch(`http://192.168.1.3:4000/upload/${userId}`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: "bearer" + " " + userToken,
      }
    }).then((res) => res.json())
      .then((data) => {
        console.log("data res", data)
        newProfile.profileImage = data?.original?.Location;
        dispatch(setUserProfile(newProfile))
        setPhotoChange(false);
        console.log(newProfile)
      });
  };


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
    <EditProfileForm
      handleEditProfile={handleEditProfile}
      handleEditProfileImage={handleEditProfileImage}
      handleImageChange={handleImageChange}
      photoChange={photoChange}
      userProfile={userProfile} />
  );
};

export default EditProfile;