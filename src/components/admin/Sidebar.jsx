import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  // State to hold the number of orders
  const [orderCount, setOrderCount] = useState(0);
  const location = useLocation();

  // Get current path to determine active link
  const currentPath = location.pathname;

  // Simulate fetching the order count (replace this with an API call if needed)
  useEffect(() => {
    const fetchOrderCount = async () => {
      // Simulate an API call to fetch the number of orders
      const simulatedOrderCount = 5; // Replace this with dynamic data from your backend
      setOrderCount(simulatedOrderCount);
    };

    fetchOrderCount();
  }, []); // Empty dependency array ensures this runs once on component mount

  // Helper function to determine if a link is active
  const isActive = (path) => {
    return currentPath === path;
  };

  // Class for active and inactive links
  const getLinkClasses = (path) => {
    return `flex items-center p-2 rounded-lg group ${
      isActive(path)
        ? 'bg-white text-[#004AAD]' // Active state
        : 'text-white hover:bg-white hover:text-[#004AAD]' // Inactive state
    }`;
  };

  // Class for SVG icons
  const getIconClasses = (path) => {
    return `w-5 h-5 transition duration-75 ${
      isActive(path)
        ? 'text-[#004AAD]' // Active state
        : 'text-white group-hover:text-[#004AAD]' // Inactive state
    }`;
  };

  return (
    <div>
      <button
        data-drawer-target="sidebar-multi-level-sidebar"
        data-drawer-toggle="sidebar-multi-level-sidebar"
        aria-controls="sidebar-multi-level-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="sidebar-multi-level-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 bg-[#004AAD]"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 overflow-y-auto">
          {/* Logo */}
          <Link 
            to="/dashboard" 
            className="flex items-center space-x-1 mb-5">
            <img
              src="src/assets/images/logo/Logo-white-t.png"
              alt="Logo"
              className="h-24 object-contain"
            />
          </Link>

          {/* Sidebar Menu */}
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to="/dashboard"
                className={getLinkClasses('/dashboard')}
              >
                <svg
                  className={getIconClasses('/dashboard')}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span className="ms-3">Dashboard</span>
              </Link>
            </li>
          
            <li>
              <Link 
                to="/orders" 
                className={getLinkClasses('/orders')}>
                <svg 
                  className={getIconClasses('/orders')} 
                  aria-hidden="true" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="currentColor" 
                  viewBox="0 0 18 21">
                  <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z"/>
                </svg>
                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                  Orders
                </span>
                {/* Dynamic Badge*/}
                {orderCount > 0 && (
                <span className={`inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium ${isActive('/orders') ? 'text-white bg-[#004AAD]' : 'text-[#004AAD] bg-white'} rounded-full`}>
                  {orderCount}
                </span>
                )}
              </Link>
            </li>

            {/* Customers Button */}
            <li>
              <Link
                to="/customers"
                className={getLinkClasses('/customers')}
              >
                <svg
                  className={getIconClasses('/customers')}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Customers</span>
              </Link>
            </li>

            {/* Products Button */}
            <li>
              <Link
                to="/products"
                className={getLinkClasses('/products')}
              >
                <svg
                  className={getIconClasses('/products')}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 20"
                >
                  <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Products
                </span>
              </Link>
            </li>

            {/* Category */}
            <li>
              <Link 
                to="/category" 
                className={getLinkClasses('/category')}>
                <svg 
                  className={getIconClasses('/category')} 
                  aria-hidden="true" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="currentColor" 
                  viewBox="0 0 18 18">
                  <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/>
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Category</span>
              </Link>
            </li>
            
            <li>
              <Link
                to="/activity-log"
                className={getLinkClasses('/activity-log')}
              >
                <svg
                  className={getIconClasses('/activity-log')}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Activity Log</span>
                <span className={`inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium ${isActive('/activity-log') ? 'text-white bg-[#004AAD]' : 'text-[#004AAD] bg-white'} rounded-full`}>
                  3
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;