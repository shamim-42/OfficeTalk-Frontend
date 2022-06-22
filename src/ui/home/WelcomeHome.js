import { useSelector } from 'react-redux';
import { selectUserProfile } from '../../redux/features/authSlice';
import CustomAvatar from '../helper/CustomAvatar';
import TextAvatar from '../helper/TextAvatar';


const WelcomeHome = () => {
  const userProfile = useSelector(selectUserProfile);

  return (
    <div className="home-content">
      {userProfile?.profileImage ?
        <CustomAvatar size={190}
          src={userProfile.profileImage} />
        :
        <TextAvatar name={userProfile.fullname} size="190px" fontSize="96px" />
      }
      <h2>Hi&nbsp;{userProfile?.fullname}!</h2>
      <p className="start-chat">Start chatting ! </p>
    </div>
  );
};

export default WelcomeHome;