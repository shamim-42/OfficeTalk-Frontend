import { message, Spin } from 'antd';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { editPasswordApi } from '../../api/auth';
import { selectUserProfile } from '../../redux/features/authSlice';
import EditPasswordForm from '../../ui/profile/EditPasswordForm';


const EditPassword = () => {
  const userProfile = useSelector(selectUserProfile);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)


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
      navigate('/profile');
    }

    async function handleBadReq(response) {
      setLoading(false)
      let error = await response.json();
      console.log(error);
    }

    return await editPasswordApi(userId, newProfile, { successHandler, handleBadReq })
  }

  return (
    <Spin spinning={loading} delay={100}>
      <EditPasswordForm handleEditPassword={handleEditPassword} userProfile={userProfile} />
    </Spin>
  );
};

export default EditPassword;