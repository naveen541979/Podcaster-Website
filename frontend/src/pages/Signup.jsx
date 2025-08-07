import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import Errorpage from './Errorpage';

const Signup = () => {
  const isLoggedin = useSelector((state) => state.auth.isLoggedIn);

  const [Values, setValues] = useState({
    username: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };

  const handleSubmit = async () => {
    if (!Values.username || !Values.email || !Values.password) {
      toast.warning('Please fill in all fields');
      return;
    }

    try {
      const res = await axios.post(`${import.meta.env.BASE_URL}/api/v1/users/signup`, Values);
      if (res?.data?.success) {
        toast.success(res.data.message || 'Signup successful!');
        setTimeout(() => navigate('/login'), 1500);
      } else {
        toast.error(res.data.message || 'Something went wrong!');
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Signup failed. Try again!';
      toast.error(errorMsg);
    }
  };

  return (
    <>
      <ToastContainer position="top-center" draggable />
      {isLoggedin ? (
        <Errorpage />
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-green-100 to-white flex items-center justify-center px-4">
          <div className="w-full sm:w-[90%] md:w-[70%] lg:w-[35%] bg-white p-8 rounded-xl shadow-lg">
            <Link
              to="/"
              className="text-3xl font-extrabold text-center w-full block text-green-900 mb-6"
            >
              PODCASTER 🎙️
            </Link>
            <div className="flex flex-col space-y-4">
              <div>
                <label htmlFor="username" className="text-sm font-semibold">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  value={Values.username}
                  onChange={change}
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-green-400 transition"
                />
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-semibold">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={Values.email}
                  onChange={change}
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-green-400 transition"
                />
              </div>
              <div>
                <label htmlFor="password" className="text-sm font-semibold">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={Values.password}
                  onChange={change}
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-green-400 transition"
                />
              </div>
              <button
                onClick={handleSubmit}
                className="w-full mt-2 bg-green-800 hover:bg-green-700 text-white font-semibold py-2 rounded transition-all duration-300"
              >
                🚀 Signup
              </button>
              <p className="text-center text-sm mt-4">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="font-semibold text-green-800 hover:text-green-600"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Signup;
