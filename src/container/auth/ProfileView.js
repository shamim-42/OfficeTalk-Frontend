import { useSelector } from 'react-redux';
import { selectUserProfile } from '../../redux/features/authSlice';
import ProfileViewUi from '../../ui/auth/profile/ProfileViewUi';

const ProfileView = () => {
  const userProfile = useSelector(selectUserProfile);

  return (
    <ProfileViewUi userProfile={userProfile} />
  );
};

export default ProfileView;