import React from 'react';
import { userRegistrationApi } from '../api/auth';
import RegistrationUi from '../ui/registration/RegistrationUi';

const Registration = () => {

  // on registration submit function
  const onRegisterHandler = async (values) => {
    const userData = {
      fullname: values.fullname,
      username: values.username,
      email: values.email,
      password: values.password,
    }

    console.log(userData);
    // Success Handler func
    async function successHandler(response) {
      let data = await response.json();
      console.log(data, "Register Data");
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