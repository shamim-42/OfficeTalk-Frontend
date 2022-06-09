import { Avatar } from 'antd';
import React from 'react';

const CustomAvatar = (props) => {
  const { size, src, icon } = props;

  return (
    <div className="custom-avatar">
      <Avatar size={size} src={src} alt="Avatar" />
      <span className={`online-green-icon ${icon}`}></span>
    </div>
  );
};

export default CustomAvatar;