import { Button, Switch } from 'antd';
import React from 'react';
import { IoMdSettings } from "react-icons/io";
import { BsMoon } from "react-icons/bs";
import { BiRightArrowCircle } from "react-icons/bi";


const SettingPopover = ({ onChangeSwitch }) => {
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
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: '20px',
      }}>
        <p>
          <BsMoon />
          <span style={{ marginLeft: '10px' }}>Night mode</span>
        </p>
        <Switch size="small" defaultChecked onChange={onChangeSwitch} />
      </div>
      <p>
        <BiRightArrowCircle />
        <Button type="link" danger>
          Sign out
        </Button>
      </p>
    </div>
  );
};

export default SettingPopover;