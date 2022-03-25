import React from 'react';

import { Avatar, Badge, Divider } from 'antd';
import SidebarHeader from './SidebarHeader';
import SidebarCard from './SidebarCard';

const users = [
  {
    name: 'Hasan Mahamud',
    img: 'https://i.ibb.co/n8yn9CM/Ellipse-4.png',
    status: true,
  },
  {
    name: 'Abu Sayeed',
    img: 'https://i.ibb.co/ZMDbjf7/Ellipse-4-3.png',
    status: true,
  },
  {
    name: 'Muaaj Muhammad',
    img: 'https://i.ibb.co/mXz61cM/Ellipse-4-1.png',
    status: true,
  },
  {
    name: 'Saidul Islam',
    img: 'https://i.ibb.co/ZWwbcST/Ellipse-4-2.png',
    status: true,
  },
  {
    name: 'Adnan ',
    img: 'https://i.ibb.co/rsJ7tdT/Ellipse-12.png',
    status: true,
  },
  {
    name: 'Ahamed Sabbir',
    img: 'https://i.ibb.co/nCR4Z9N/Ellipse-10.png',
    status: true,
  },
  {
    name: 'Nayeem Hasan',
    img: 'https://i.ibb.co/f8vbXxB/Ellipse-18.png',
    status: true,
  },
  {
    name: 'Shad Ahamed',
    img: 'https://i.ibb.co/FqN6tTg/Ellipse-14.png',
    status: true,
  },
  {
    name: 'Adnan ',
    img: 'https://i.ibb.co/rsJ7tdT/Ellipse-12.png',
    status: true,
  },
  {
    name: 'Ahamed Sabbir',
    img: 'https://i.ibb.co/nCR4Z9N/Ellipse-10.png',
    status: true,
  },
  {
    name: 'Shamim Hossain',
    img: 'https://i.ibb.co/Q89Q7wV/Ellipse-8.png',
    status: true,
  },
]

const Sidebar = () => {

  function handleChangeSearch(value) {
    console.log(value);
  }

  return (
    <div className="sidebar-container">
      <SidebarHeader
        handleChangeSearch={handleChangeSearch} />
      <div className="online-users">
        <Avatar.Group className="online-user-group">
          {
            users.map((user, index) => (
              <Badge
                key={index}
                offset={["-5%", "85%"]}
                style={{
                  width: "8px",
                  height: "8px",
                  backgroundColor: "#67C148"
                }}
                dot={user.status}
              >
                <Avatar
                  className="online-user-img"
                  src={user.img}
                />
              </Badge>
            ))
          }
        </Avatar.Group>
      </div>
      <Divider />
      <div className="sidebar-card-container">
        <div className="sidebar-cards">
          {
            users.map((user, i) => (
              <SidebarCard key={i} user={user} />
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default Sidebar;