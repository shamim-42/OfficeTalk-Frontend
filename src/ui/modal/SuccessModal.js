import { Alert, Modal } from 'antd';
import React from 'react';

const SuccessModal = () => {
  return (
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
  );
};

export default SuccessModal;