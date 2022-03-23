import React from 'react';
import RegistrationUi from '../ui/registration/RegistrationUi';

const Registration = () => {
  const onFinish = (values) => {
    console.log(values);
  };
  return (
    <RegistrationUi
      onFinish={onFinish}
    />
  );
};

export default Registration;