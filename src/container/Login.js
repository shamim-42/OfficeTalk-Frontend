import React, { useState } from 'react';
import { userLoginApi } from '../api/auth';
import LoginUi from '../ui/login/LoginUi';

const Login = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalNumber, setModalNumber] = useState(1);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setModalNumber(1);
  };

  const onFinishOtp = (values) => {
    console.log(values);
    setModalNumber(3)
  };

  // on login submit function
  const onSubmitHandler = async (values) => {
    // const loginData = {
    //   email: values.email,
    //   password: values.password,
    // }
    const loginData = {
      email: "tamim99@gmail.com",
      password: "tamim1234",
    }
    console.log(loginData);

    async function successHandler(response) {
      let data = await response.json();
      console.log(data, "login Data");
    }

    // Bad Request Handler func
    async function handleBadReq(response) {
      let err = await response.json();
      console.log("Register Error", err);
    }

    return await userLoginApi(loginData, {
      successHandler,
      handleBadReq,
    });
  };

  const onFinishModal = (values) => {
    console.log(values);
    setModalNumber(2)
  };

  const onFinishPassword = (values) => {
    console.log(values);
    setModalNumber(1)
    handleCancel()
  };


  return (
    <LoginUi
      onSubmitHandler={onSubmitHandler}
      onFinishModal={onFinishModal}
      isModalVisible={isModalVisible}
      showModal={showModal}
      handleCancel={handleCancel}
      modalNumber={modalNumber}
      onFinishOtp={onFinishOtp}
      onFinishPassword={onFinishPassword}
    />
  );
};

export default Login;