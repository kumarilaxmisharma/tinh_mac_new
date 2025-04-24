import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, ChevronDown } from "lucide-react";
import React, { useState } from 'react';


const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <header className="md:ml-0 fixed top-0 left-0 right-0 z-20 h-20 bg-white border-b border-gray-200 shadow-xs">
      <div className="container max-w-full h-full px-22 flex justify-between items-center">
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
        <div className="flex items-center space-x-8">            
          <Link
            to="/wishlist"
            className="flex items-center justify-center text-sm gap-1 px-4 py-2 bg-[#004AAD] text-white rounded-full hover:bg-blue-600 transition-colors"
          >
            <Heart className="h-4 w-4 fill-white text-white"/>
            Wishlist
          </Link>
          <Link
            to="/dashboard"
            className="flex items-center justify-center text-sm gap-1 px-4 py-2 bg-[#004AAD] text-white rounded-full hover:bg-blue-600 transition-colors"
          >
            Admin
          </Link>

          <div className="relative flex items-center space-x-2">
            {/* Login/Signup Button */}      
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
              <div className="absolute top-full mt-2 left-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44">
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
                </ul>
              </div>
            )}
          </div>

          <Link 
            to="/cart"
            className="flex items-center justify-center text-sm gap-1 px-4 py-2 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition-colors"
          >
            <ShoppingCart className="h-4 w-4"/>
            Cart
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;