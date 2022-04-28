import { Alert, Form, Modal } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userLoginApi } from '../api/auth';
import { setUser, setUserProfile } from '../redux/features/authSlice';
import LoginUi from '../ui/login/LoginUi';

const Login = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isErrorModal, setIsErrorModal] = useState(false);
  const [modalNumber, setModalNumber] = useState(1);
  const [message, setMessage] = useState('')
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setModalNumber(1);

  };

  const showErrorModal = () => {
    setIsErrorModal(true);
  };

  const handleOk = () => {
    form.resetFields(["password"]);
    setIsErrorModal(false);
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
      const message = err.message;
      setMessage(message);
      console.log("Login Error", err.message);
      showErrorModal()
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
    <>
      <Modal
        visible={isErrorModal}
        className="error-modal"
        cancelButtonProps={{ style: { display: 'none' } }}
        closable={false}
        onOk={handleOk}>
        <Alert
          message="Login Error"
          description={message}
          type="error"
          showIcon
        />
      </Modal>

      <LoginUi
        form={form}
        onSubmitHandler={onSubmitHandler}
        onFinishModal={onFinishModal}
        isModalVisible={isModalVisible}
        showModal={showModal}
        handleCancel={handleCancel}
        modalNumber={modalNumber}
        onFinishOtp={onFinishOtp}
        onFinishPassword={onFinishPassword}
      />
    </>
  );
};

export default Login;