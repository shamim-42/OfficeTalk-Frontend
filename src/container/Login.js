import React from 'react';
import LoginUi from '../ui/login/LoginUi';

const Login = () => {
  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <LoginUi
      onFinish={onFinish}
 />
  );
};

export default Login;