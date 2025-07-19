import React from 'react';
import Errorpage from './Errorpage';
import { useSelector } from 'react-redux';
import Header from '../profile/Header.jsx';
import Mypodcasts from '../profile/Mypodcasts.jsx';

const Profile = () => {
  const isLoggedin = useSelector((state) => state.auth.isLoggedIn);

  return (
    <div>
      {isLoggedin ? (
        <div className="bg-blue-50 min-h-screen">
          <Header />
          <Mypodcasts />
        </div>
      ) : (
        <Errorpage />
      )}
    </div>
  );
};

export default Profile;
