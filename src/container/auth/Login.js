import { Alert, Form, message, Modal, Spin } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userLoginApi } from '../../api/auth';
import { setUser, setUserProfile } from '../../redux/features/authSlice';
import LoginUi from '../../ui/auth/login/LoginUi';

const Login = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isErrorModal, setIsErrorModal] = useState(false);
  const [modalNumber, setModalNumber] = useState(1);
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)

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

  // on login submit function
  const onSubmitHandler = async (values) => {
    setLoading(true);
    const loginData = {
      email: values.email,
      password: values.password,
    }

    // on Login success handler function
    async function successHandler(response) {
      let res = await response.json();
      const userLoginData = res.profile;
      const accessToken = res.accessToken;
      setLoading(false);
      message.success('User logged in successfully !');
      dispatch(setUserProfile(userLoginData))
      dispatch(setUser(accessToken))
      navigate('/');
    }

    // Bad Request Handler function
    async function handleBadReq(response) {
      let err = await response.json();
      const message = err.message;
      setErrorMessage(message);
      // console.log("Login Error", err.message);
      setLoading(false);
      showErrorModal()
    }

    return await userLoginApi(loginData, {
      successHandler,
      handleBadReq,
    });
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
          description={errorMessage}
          type="error"
          showIcon
        />
      </Modal>
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