import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store/auth';
import Errorpage from './Errorpage';

const Login = () => {
  const isLoggedin = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [Values, setValues] = useState({
    email: '',
    password: '',
  });

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };

  const handleSubmit = async () => {
    if (!Values.email || !Values.password) {
      toast.warning('Please fill in all fields');
      return;
    }

    try {
      const res = await axios.post(
        'http://localhost:7000/api/v1/users/login',
        Values,
        { withCredentials: true }
      );
      if (res?.data?.success) {
        toast.success('Login successful!');
        dispatch(authActions.login());
        setTimeout(() => navigate('/profile'), 1000);
      } else {
        toast.error(res.data.message || 'Login failed');
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || 'Something went wrong. Try again!'
      );
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
              PODCASTER 🎧
            </Link>
            <div className="flex flex-col space-y-4">
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
                🔐 Login
              </button>
              <p className="text-center text-sm mt-4">
                Don't have an account?{' '}
                <Link
                  to="/signup"
                  className="font-semibold text-green-800 hover:text-green-600"
                >
                  Signup
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
