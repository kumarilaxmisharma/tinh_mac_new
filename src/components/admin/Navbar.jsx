import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, User, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ml-60">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Sales Dashboard</h1>
            </div>
            {/* Search Bar */}
            <div className="flex items-center">
              <div className="relative mr-4">
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              </div>
              {/* Notification and User Profile */}
              <div className="relative mr-4 cursor-pointer">
                <Bell className="text-gray-500" size={20} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">3</span>
              </div>
              
              {/* Profile Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <div 
                  className="flex items-center cursor-pointer" 
                  onClick={toggleDropdown}
                >
                  <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white mr-2">
                    <User size={16} />
                  </div>
                  <ChevronDown size={16} className={`text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </div>
                
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-blue-100 text-white rounded-md shadow-lg z-10 py-2">
                    <div className="px-4 py-3 border-b border-gray-700">
                      <p className="text-lg font-medium text-gray-800">Laxmi</p>
                      <p className="text-sm text-gray-800">kumarilaxmisharma@gmail.com</p>
                    </div>
                    <nav>
                      <a href="/dashboard" className="block px-4 py-2 hover:bg-blue-300 transition text-gray-800">Profiles</a>
                      <a href="/settings" className="block px-4 py-2 hover:bg-blue-300 transition text-gray-800">Settings</a>
                      <a href="/sign-out" className="block px-4 py-2 hover:bg-blue-300 transition text-gray-800">Sign out</a>
                    </nav>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;