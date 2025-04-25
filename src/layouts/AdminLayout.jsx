import { Outlet } from 'react-router-dom';
import React from 'react';
import Navbar from '/src/components/admin/Navbar';
import Sidebar from '/src/components/admin/Sidebar';

const AdminLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />
      
      <div className="flex-grow flex">
        {/* Sidebar */}
        <Sidebar />
        
        <Outlet />
        </div>
      </div>
  );
};

export default AdminLayout;