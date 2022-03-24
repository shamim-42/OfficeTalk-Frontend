import React, { useState } from 'react';
import LoginUi from '../ui/login/LoginUi';

const Login = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalno, setModalno] = useState(1);



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
    setModalno(1)
    handleCancel()
  };


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
    />
  );
};

export default Login;