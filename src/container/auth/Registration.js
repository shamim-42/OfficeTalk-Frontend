import { message, Spin } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userRegistrationApi } from '../../api/auth';
import { setUser, setUserProfile } from '../../redux/features/authSlice';
import RegistrationUi from '../../ui/registration/RegistrationUi';

const Registration = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // on registration submit function
  const onRegisterHandler = async (values) => {
    setLoading(true);
    const userData = {
      fullname: values.fullname,
      username: values.username,
      email: values.email,
      password: values.password,
    }

    // Success Handler func
    async function successHandler(response) {
      let data = await response.json();
      setLoading(false);
      message.success('Your Account Created successfully !');
      dispatch(setUserProfile(data.user))
      dispatch(setUser(data.accessToken))
      navigate('/');
    }

    // Bad Request Handler func
    async function handleBadReq(response) {
      let err = await response.json();
      console.log("Register Error", err);
      setLoading(false);
    }

    return await userRegistrationApi(userData, {
      successHandler,
      handleBadReq,
    });
  };

  return (
    <Spin spinning={loading} delay={100}>
      <RegistrationUi
        onRegisterHandler={onRegisterHandler}
      />
    </Spin>
  );
};

export default Registration;