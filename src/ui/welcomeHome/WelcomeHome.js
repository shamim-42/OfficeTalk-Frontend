import React from 'react';
import { useSelector } from 'react-redux';
import { selectUserProfile } from '../../redux/features/authSlice';


const WelcomeHome = () => {
  const userProfile = useSelector(selectUserProfile);

  return (
    <div className="home-content">
      <img className="circle-img"
        src="https://i.ibb.co/FX9y91r/Ellipse-7.png"
        width="190px"
        height="190px"
        alt="Ellipse-7" border="0" />
      <h2>Hi&nbsp;{userProfile?.fullname}!</h2>
      <p className="start-chat">Start chatting ! </p>
    </div>
  );
};

export default WelcomeHome;