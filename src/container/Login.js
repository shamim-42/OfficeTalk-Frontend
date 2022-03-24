import React, { useEffect, useState } from 'react';
import LoginUi from '../ui/login/LoginUi';

const Login = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalno, setModalno] = useState(3);
  const [newPassword, setNewPassword] = useState('')


  const onChangeNewPassword = (e) => {
    setNewPassword(e.target.value);
  }

  const confirmPassword = (e) => {
    const confirmPass = e.target.value;
    if (confirmPass && confirmPass !== newPassword) {
      console.log('Both password are not the same')
    }
  }

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinishOtp = (values) => {
    console.log(values);
    setModalno(3)
  };

  const onFinish = (values) => {
    console.log(values);
  };

  const onFinishModal = (values) => {
    console.log(values);
    setModalno(2)
  };

  const onFinishPassword = (values) => {
    console.log(values);
    setModalno(0)
    handleCancel()
  };

  useEffect(() => {
    console.log(newPassword)
  }, [newPassword])

  return (
    <LoginUi
      onFinish={onFinish}
      onFinishModal={onFinishModal}
      isModalVisible={isModalVisible}
      showModal={showModal}
      handleCancel={handleCancel}
      modalno={modalno}
      onFinishOtp={onFinishOtp}
      onFinishPassword={onFinishPassword}
      onChangeNewPassword={onChangeNewPassword}
      confirmPassword={confirmPassword}
    />
  );
};

export default Login;