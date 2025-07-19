import React from 'react';
import { Link } from 'react-router-dom';

const Errorpage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-blue-200">
      <div className="text-center text-white">
        <h1 className="text-8xl font-extrabold animate__animated animate__fadeInDown animate__delay-1s">
          Oops!
        </h1>
        <p className="text-3xl font-medium mt-4 animate__animated animate__fadeInUp animate__delay-1s">
          Page Not Found
        </p>

        <div className="mt-6">
          <Link
            to="/"
            className="bg-white text-blue-600 py-2 px-6 rounded-lg font-semibold text-lg transform transition-all duration-300 hover:bg-blue-600 hover:text-white hover:scale-105 animate__animated animate__fadeIn animate__delay-2s"
          >
            Go Back Home
          </Link>
        </div>
      </div>
      
      <div className="absolute bottom-10 animate__animated animate__zoomIn animate__delay-2s">
        <div className="w-24 h-24 border-8 border-t-transparent border-blue-300 rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default Errorpage;
