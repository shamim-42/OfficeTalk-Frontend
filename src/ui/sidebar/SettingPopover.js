import { Button } from 'antd';
import React from 'react';
import { BiRightArrowCircle } from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";


const SettingPopover = ({ onChangeSwitch, handleLogout }) => {
  return (
    <div className="setting-popover" style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    }}>
      <p>
        <IoMdSettings />
        <span style={{ marginLeft: '10px' }}>Setting</span>
      </p>
      {/* <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: '20px',
      }}>
        <p>
          <BsMoon />
          <span style={{ marginLeft: '10px' }}>Night mode</span>
        </p>
        <Switch size="small" defaultChecked onChange={onChangeSwitch} />
      </div> */}
      <div>
        <Button type="text" style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: '10px',
          padding: 0,
        }} onClick={handleLogout} danger>
          <BiRightArrowCircle />
          Sign out
        </Button>
      </div>
    </div>
  );
};

export default SettingPopover;