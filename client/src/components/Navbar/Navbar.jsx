import React, { useState, useEffect, useRef, useSyncExternalStore } from 'react';
import Logo from "@/assets/logo.png";
import "./style.css";
import { Navlinks, UserMenuLinks } from "@/constants.jsx";
import { useLocation, Link } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { validUser } from "@/redux/user/"

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [CurrentPath, setCurrentPath] = useState(null)
  // check redux state
  const userState = useSelector((state) => state.user);

  const dispatch = useDispatch();

  // ones request server to check user valid or not 
  useEffect(() => {
    return () => {
      dispatch(validUser())
    }
  }, [])


  let location = useLocation()

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  const handleLinkClick = () => {
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener('click', handleClickOutside, true);
    } else {
      document.removeEventListener('click', handleClickOutside, true);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [isDropdownOpen]);

  useEffect(() => {
    setCurrentPath(location.pathname)
  }, [location])

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 h-full">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 relative">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={Logo} className="h-8" alt="Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Url Shorter</span>
        </Link>
        <div className={`${userState.isValidUser ? 'flex' : 'hidden'} items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse`}>
          <button
            type="button"
            className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            id="user-menu-button"
            aria-expanded={isDropdownOpen}
            onClick={toggleDropdown}
          >
            <span className="sr-only">Open user menu</span>
            <img className="w-8 h-8 rounded-full" src="https://avatars.githubusercontent.com/u/583231?v=4" alt="user photo" />
          </button>
          {/* Dropdown menu */}
          <div
            ref={dropdownRef}
            className={`z-50 ${isDropdownOpen ? '' : 'hidden'} text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 absolute top-[60px] right-0`}
            id="user-dropdown"
          >
            <div className="px-4 py-3">
              <span className="block text-sm text-gray-900 dark:text-white">{userState.userInfo?.fullName}</span>
              <span className="block text-sm text-gray-500 truncate dark:text-gray-400">{userState.userInfo?.email}</span>
            </div>
            <ul className="py-2" aria-labelledby="user-menu-button">
              {
                UserMenuLinks.map(({ name, href }, index) => (
                  <li key={index}>
                    <Link to={href} className="dropdown-menu-links">{name}</Link>
                  </li>
                ))
              }
            </ul>
          </div>
          <button
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-user"
            aria-expanded={isMobileMenuOpen}
            onClick={toggleMobileMenu}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>

        {/* // if user not signin */}
        <div className={`${userState.isValidUser ? 'hidden' : 'flex'} items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse`}>
          <Link to='/sign_in' type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 align-center items-start">
            Sign In
            <svg className="hidden w-3 h-3 ml-2 xl:inline" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"></path></svg>
          </Link>
        </div>

        <div className={`items-center justify-between ${isMobileMenuOpen ? '' : 'hidden'} w-full md:flex md:w-auto md:order-1`} id="navbar-user">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {
              Navlinks.map(({ name, href }, index) => (
                <li key={index}>
                  <Link to={href} className={`navbar-links ${String(CurrentPath).toLowerCase() == href.toLowerCase() ? "navbar-link-active" : null}`}>{name}</Link>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
