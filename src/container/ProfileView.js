import React from 'react';
import { useSelector } from 'react-redux';
import { selectUserProfile } from '../redux/features/authSlice';
import ProfileViewUi from '../ui/profile/ProfileViewUi';

const ProfileView = () => {
  const userProfile = useSelector(selectUserProfile);

  return (
    <ProfileViewUi userProfile={userProfile} />
  );
};

export default ProfileView;