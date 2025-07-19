import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IoReorderThreeOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [MobileNav, setMobileNav] = useState(false);

  const navlinks = [
    { name: "Home", path: "/" },
    { name: "Categories", path: "/categories" },
    { name: "All Podcasts", path: "/all-podcasts" },
  ];

  return (
    <nav className="px-4 md:px-8 lg:px-12 py-3 relative bg-white z-50">
      {/* Desktop Navbar */}
      <div className="hidden lg:flex items-center justify-between">
        <div className="flex items-center gap-4 w-1/3">
          <img
            src="https://cdn-icons-png.flaticon.com/128/9043/9043096.png"
            alt="podcaster"
            className="h-12"
          />
          <Link to="/" className="text-2xl font-bold">Podcaster</Link>
        </div>

        <div className="flex justify-center gap-6 w-1/3">
          {navlinks.map((item, i) => (
            <Link
              key={i}
              to={item.path}
              className="hover:font-semibold transition-all duration-300"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="flex justify-end gap-4 w-1/3">
          {isLoggedIn ? (
            <Link to="/profile" className="px-6 py-2 border border-black rounded-full hover:bg-black hover:text-white transition-all">
              Profile
            </Link>
          ) : (
            <>
              <Link to="/login" className="px-6 py-2 border border-black rounded-full hover:bg-black hover:text-white transition-all">
                Login
              </Link>
              <Link to="/signup" className="px-6 py-2 border border-black rounded-full hover:bg-black hover:text-white transition-all">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="lg:hidden flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src="https://cdn-icons-png.flaticon.com/128/9043/9043096.png"
            alt="podcaster"
            className="h-12"
          />
          <Link to="/" className="text-2xl font-bold">Podcaster</Link>
        </div>

        <button
          className={`text-4xl transition-transform duration-300 z-50 ${MobileNav ? "rotate-180" : "rotate-0"}`}
          onClick={() => setMobileNav(!MobileNav)}
        >
          {MobileNav ? <RxCross2 /> : <IoReorderThreeOutline />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <div
        className={`fixed w-full h-screen bg-blue-100 top-0 left-0 z-40 
        ${MobileNav ? "translate-y-0" : "-translate-y-full"} 
        transition-transform duration-500`}
      >
        <div className="h-full flex flex-col items-center justify-center pt-20">
          {navlinks.map((item, i) => (
            <Link
              key={i}
              to={item.path}
              onClick={() => setMobileNav(false)}
              className="mb-12 text-3xl hover:font-semibold transition-all duration-300"
            >
              {item.name}
            </Link>
          ))}

          {isLoggedIn ? (
            <Link
              to="/profile"
              onClick={() => setMobileNav(false)}
              className="mb-12 text-3xl font-semibold border border-black px-6 py-2 rounded-full hover:bg-black hover:text-white transition-all duration-300"
            >
              Profile
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => {
                  setMobileNav(false);
                  window.scrollTo(0, 0);
                }}
                className="mb-8 text-3xl border border-black px-6 py-2 rounded-full hover:bg-black hover:text-white transition-all duration-300"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => {
                  setMobileNav(false);
                  window.scrollTo(0, 0);
                }}
                className="mb-12 text-3xl font-semibold border border-black px-6 py-2 rounded-full hover:bg-black hover:text-white transition-all duration-300"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
