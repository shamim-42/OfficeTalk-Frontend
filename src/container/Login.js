import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userLoginApi } from '../api/auth';
import { setUser, setUserProfile } from '../redux/features/authSlice';
import LoginUi from '../ui/login/LoginUi';

const Login = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalNumber, setModalNumber] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();


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
    const loginData = {
      email: values.email,
      password: values.password,
    }


    async function successHandler(response) {
      let res = await response.json();
      const userLoginData = res.data;
      const accessToken = res.accessToken;
      console.log(userLoginData, accessToken);

      dispatch(setUserProfile(userLoginData))
      dispatch(setUser(accessToken))
      navigate('/');
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