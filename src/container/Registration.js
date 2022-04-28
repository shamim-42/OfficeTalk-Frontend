import { message } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userRegistrationApi } from '../api/auth';
import { setUser, setUserProfile } from '../redux/features/authSlice';
import RegistrationUi from '../ui/registration/RegistrationUi';

const Registration = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // on registration submit function
  const onRegisterHandler = async (values) => {
    const userData = {
      fullname: values.fullname,
      username: values.username,
      email: values.email,
      password: values.password,
    }

    // Success Handler func
    async function successHandler(response) {
      let data = await response.json();
      console.log(data, "Register Data");
      message.success('Your Account Created successfully !');

      dispatch(setUserProfile(data.user))
      dispatch(setUser(data.accessToken))
      navigate('/');
    }

    // Bad Request Handler func
    async function handleBadReq(response) {
      let err = await response.json();
      console.log("Register Error", err);
    }

    return await userRegistrationApi(userData, {
      successHandler,
      handleBadReq,
    });
  };

  return (
    <RegistrationUi
      onRegisterHandler={onRegisterHandler}
    />
  );
};

export default Registration;