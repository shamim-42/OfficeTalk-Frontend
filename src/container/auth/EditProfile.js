import { message } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { editprofileApi, editprofilePhotoApi } from '../../api/auth';
import { selectUserProfile, setUserProfile } from '../../redux/features/authSlice';
import EditProfileForm from '../../ui/auth/profile/EditProfileForm';


const EditProfile = () => {
  const userProfile = useSelector(selectUserProfile);
  const newProfile = JSON.parse(JSON.stringify(userProfile));
  const userId = userProfile.id;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [uploadPhoto, setUploadPhoto] = useState(null);
  const [photoChange, setPhotoChange] = useState(false)
  const [loader, setLoader] = useState(false);


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
    setLoader(true);
    const formData = new FormData();
    formData.append("file", uploadPhoto);

    async function successHandler(response) {
      const data = await response.json();
      newProfile.profileImage = data?.sm.Location;
      dispatch(setUserProfile(newProfile))
      setPhotoChange(false);
      setLoader(false);
    }

    async function handleBadReq(response) {
      let error = await response.json();
      console.log(error);
      setLoader(false);
    }

    return await editprofilePhotoApi(userId, formData, {
      successHandler, handleBadReq, encoder: (r) => r,
      removeContentType: true
    })
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
      message.success('User profile edited in successfully !');
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
    <>
      <EditProfileForm
        handleEditProfile={handleEditProfile}
        handleEditProfileImage={handleEditProfileImage}
        handleImageChange={handleImageChange}
        photoChange={photoChange}
        loader={loader}
        userProfile={userProfile} />
    </>
  );
};

export default EditProfile;