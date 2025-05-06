import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, ChevronDown, User, LogOut, Settings } from "lucide-react";
import React, { useState, useEffect } from 'react';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  // Toggle dropdown menu
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest('.dropdown-container')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
    setIsDropdownOpen(false);
  };

  // For demonstration purposes only - temporary UI change that doesn't persist
  const toggleLoginState = () => {
    if (!isLoggedIn) {
      // Simulate login - only for this session, won't persist on refresh
      setIsLoggedIn(true);
      setUserName('John Doe');
    } else {
      handleLogout();
    }
  };

  //Asking user if sure to logout using toastify
  const confirmLogout = () => {
    toast.success("Logged out successfully!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  //Confirm before logout
  const handleLogoutConfirm = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      handleLogout();
    }
  }

  return (

    <header className="md:ml-0 fixed top-0 left-0 right-0 z-20 h-20 bg-white border-b border-gray-200 shadow-xs">

      <div className="container max-w-full h-full px-22 flex justify-between items-center">
        <ToastContainer />
        {/* Logo */}
        <Link to={"/"} className="flex items-center space-x-1 cursor-pointer">
          <img 
            src="src/assets/images/logo/Logo.png"
            alt="Logo" 
            className="h-24 object-contain" 
          />
        </Link>
        
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <input
            type="search"
            placeholder="Search"
            className="w-full h-9 px-4 py-2 rounded-[32px] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        {/* Right side items */}

        {/* Wishlist */}
        <div className="flex items-center space-x-8">            
          <Link
            to="/wished-list"
            className="flex items-center justify-center text-sm gap-1 px-4 py-2 bg-[#004AAD] text-white rounded-full hover:bg-blue-600 transition-colors"
          >
            <Heart className="h-4 w-4 fill-white text-white"/>
            Wishlist
          </Link>

        {/* Cart */}
          <Link 
            to="/cart"
            className="flex items-center justify-center text-sm gap-1 px-4 py-2 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition-colors"
          >
            <ShoppingCart className="h-4 w-4"/>
            Cart
          </Link>
          
          {/* Auth Section - Dynamic based on login state */}      
          <div className="relative dropdown-container flex items-center space-x-2">
            {isLoggedIn ? (
              // User Profile Icon and Menu for logged-in users
              <div className="relative">
                <button 
                  onClick={toggleDropdown}
                  className="flex items-center text-[#004AAD] hover:bg-blue-100 hover:rounded-full transition-all p-2"
                >
                  <div className="h-9 w-9 rounded-full bg-[#004AAD] flex items-center justify-center text-white">
                    <User size={18} />
                  </div>
                  <ChevronDown className="h-4 w-4 ml-1" />
                </button>
                
                {/* User dropdown menu */}
                {isDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-md w-48">
                    <div className="px-4 py-3 text-sm text-gray-900">
                      <div className="font-medium">{userName}</div>
                      <div className="truncate text-gray-500">user@example.com</div>
                    </div>
                    <ul className="py-2 text-sm text-gray-700">
                      <li>
                        <Link to="/user-profile" className="flex items-center px-4 py-2 hover:bg-gray-100">
                          <User className="h-4 w-4 mr-2" />
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link to="/settings" className="flex items-center px-4 py-2 hover:bg-gray-100">
                          <Settings className="h-4 w-4 mr-2" />
                          Settings
                        </Link>
                      </li>
                      <li>
                        <button 
                          onClick={handleLogoutConfirm}
                          className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Sign out
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              // Login/Signup Button for guests
              <div className="relative">
                <button 
                  onClick={toggleDropdown}
                  className="text-[#004AAD] bg-white hover:bg-blue-100 hover:rounded-[28px] font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center gap-1 cursor-pointer" 
                  type="button"
                >
                  Log in/Sign up 
                  <ChevronDown className="h-4 w-4" />
                </button>
                
                {/* Dropdown menu */}
                {isDropdownOpen && (
                  <div className="absolute top-full mt-2 right-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44">
                    <ul className="py-2 text-sm text-gray-700">
                      <li>
                        <Link
                          to="/login" 
                          className="block px-5 py-2.5 hover:bg-gray-100"
                        >
                          Log in
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/signup" 
                          className="block px-5 py-2.5 hover:bg-gray-100"
                        >
                          Sign up
                        </Link>
                      </li>
                      {/* Temporary button for demo purposes */}
                      <li className="border-t border-gray-200">
                        <button
                          onClick={toggleLoginState}
                          className="block w-full text-left px-5 py-2.5 text-blue-600 hover:bg-gray-100"
                        >
                          Demo: Toggle Login
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;