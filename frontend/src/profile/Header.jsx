import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/auth';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [Userdata, setUserdata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const baseUrl = import.meta.env.BASE_URL;

  useEffect(() => {
    const fetchUserdetails = async () => {
      try {
        const res = await axios.get(
          `https://podcaster-website-1.onrender.com/api/v1/users/user-details`,
          { withCredentials: true }
        );
        setUserdata(res.data.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch user details', err);
        setErrorMsg('Unable to load user data. Please try again later.');
        setLoading(false);
      }
    };

    fetchUserdetails();
  }, []);

  const LogoutHandler = async () => {
    try {
      await axios.post(
        `https://podcaster-website-1.onrender.com/api/v1/users/logout`,
        {},
        { withCredentials: true }
      );
      dispatch(authActions.logout());
      navigate('/');
    } catch (err) {
      alert('Logout failed. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="py-8 px-4 lg:p-12 text-center text-white">
        <p className="text-lg animate-pulse">Loading your profile...</p>
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className="py-8 px-4 text-center text-white">
        <p>{errorMsg}</p>
      </div>
    );
  }

  return (
    Userdata && (
      <div className="border border-white/20 shadow-md rounded-2xl py-8 flex flex-col md:flex-row items-center justify-center gap-4 md:justify-between px-4 lg:p-12">
        <div className="flex flex-col items-center md:items-start">
          <p className="text-zinc-500">Welcome back 👋</p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center md:text-left">
            {Userdata.username}
          </h1>
          <p className="text-zinc-600 mt-1">{Userdata.email}</p>
        </div>
        <div>
          <button
            onClick={LogoutHandler}
            className="bg-white px-4 py-2 rounded text-zinc-800 font-semibold hover:shadow-lg hover:bg-zinc-100 transition-all duration-300"
            title="Click to logout"
          >
            Log Out
          </button>
        </div>
      </div>
    )
  );
};

export default Header;
