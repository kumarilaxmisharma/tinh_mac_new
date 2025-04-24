import React from 'react';
import Navbar from '/src/components/admin/Navbar';
import Sidebar from '/src/components/admin/Sidebar';
import DashboardPage from '/src/pages/admin_page/DashboardPage';

const AdminLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />
      
      <div className="flex-grow flex">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main Content */}
        <div className="flex flex-col ml-60 min-h-screen bg-gray-100">
          <DashboardPage />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;