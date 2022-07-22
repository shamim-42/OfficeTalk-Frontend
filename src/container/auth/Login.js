import { Form, message, Spin } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetLoginSession, userLoginApi } from '../../api/auth';
import { setUser, setUserProfile } from '../../redux/features/authSlice';
import { selectLoading, updateLoading } from '../../redux/features/layoutSlice';
import LoginErrorModal from '../../ui/auth/login/LoginErrorModal';
import LoginUi from '../../ui/auth/login/LoginUi';

const Login = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isErrorModal, setIsErrorModal] = useState(false);
  const [isMultipleLogin, setIsMultipleLogin] = useState(false);
  const [modalNumber, setModalNumber] = useState(1);
  const [errorMessage, setErrorMessage] = useState('');
  const loading = useSelector(selectLoading);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  // All function for handle login page modal
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
    setIsMultipleLogin(false);
  };

  const onFinishModal = (values) => {
    // console.log(values);
    setModalNumber(2)
  };

  const onFinishPassword = (values) => {
    // console.log(values);
    setModalNumber(1)
    handleCancel()
  };

  // function for handle otp
  const onFinishOtp = (values) => {
    // console.log(values);
    setModalNumber(3)
  };

  // Action after loggin function
  const onLogginHandler = (res) => {
    const userLoginData = res.profile;
    const accessToken = res.accessToken;
    dispatch(updateLoading(false));
    message.success('User logged in successfully !');
    dispatch(setUserProfile(userLoginData))
    dispatch(setUser(accessToken))
    navigate('/');
  }

  // on login submit function
  const onSubmitHandler = async (values) => {
    if (!values) return;
    dispatch(updateLoading(true));
    const loginData = {
      email: values.email,
      password: values.password,
    }

    // on Login success handler function
    async function successHandler(response) {
      let res = await response.json();
      console.log(res)
      onLogginHandler(res);
    }

    // Bad Request Handler function
    async function handleBadReq(response) {
      let err = await response.json();
      console.log(err)
      if (err?.loggedIn) {
        setIsMultipleLogin(err.loggedIn);
      }
      const message = err.message;
      setErrorMessage(message);
      // console.log("Login Error", err.message);
      dispatch(updateLoading(false));
      showErrorModal();
    }

    return await userLoginApi(loginData, {
      successHandler,
      handleBadReq,
    });
  };

  // on login submit function
  const handleLogginSession = async () => {
    const email = form.getFieldValue("email");
    const mailData = {
      email: email,
    }

    // on Login success handler function
    async function successHandler(response) {
      let res = await response.json();
      console.log(res)
      onLogginHandler(res);
    }

    // Bad Request Handler function
    async function handleBadReq(response) {
      let err = await response.json();
      console.log(err);
      message.error("Somthing went wrong!")
    }

    return await resetLoginSession(mailData, {
      successHandler,
      handleBadReq,
    });
  };


  return (
    <>
      <LoginErrorModal
        isErrorModal={isErrorModal}
        isMultipleLogin={isMultipleLogin}
        handleLogginSession={handleLogginSession}
        handleOk={handleOk}
        errorMessage={errorMessage}
      />
      <Spin spinning={loading} delay={100}>
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
      </Spin>
    </>
  );
};

export default Login;