import { Alert, Button, Modal } from 'antd';
import React from 'react';

const LoginErrorModal = (props) => {
  const { isErrorModal, isMultipleLogin, handleLogginSession, handleOk, errorMessage } = props;
  return (
    <Modal
      visible={isErrorModal}
      className="error-modal"
      cancelButtonProps={{ style: { display: 'none' } }}
      closable={false}
      footer={isMultipleLogin &&
        <div className="modal-logout-button">
          <p>Do you want to logout from other devices?</p>
          <Button
            className="btn-theme-primary-fluid"
            type="primary"
            htmlType="submit"
            onClick={handleLogginSession}
            danger
          >
            Log Out
          </Button>
        </div>
      }
    >
      <>
        <Button
          className="modal-cross-button"
          onClick={handleOk}
        >
          X
        </Button>

        <Alert
          message="Login Error"
          description={errorMessage}
          type="error"
          showIcon
        />
      </>
    </Modal>
  );
};

export default LoginErrorModal;