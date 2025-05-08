import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();
  
  const goBack = () => {
    window.history.back();
  };
  
  const goToHome = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-2xl mx-auto text-center">
        {/* The 404 illustration with person and phone cord */}
        <div className="w-full max-w-lg mx-auto mb-2">
            {/* 404 Numbers */}
            <img src='src/assets/Page Not Found 6.png' alt="404" className="mx-auto w-102" />          
  
        </div>
        
        <h1 className="text-4xl font-bold text-[#004AAD] mb-4">Page Not Found</h1>
        
        <p className="text-lg text-gray-600 mb-2">
          Something went wrong. It's look that your requested could not be found.
        </p>
        <p className="text-lg text-gray-600 mb-8">
          It's look like the link is broken or the page is removed.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button 
            onClick={goBack}
            className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            GO BACK
          </button>
          
          <button 
            onClick={goToHome}
            className="flex items-center justify-center px-6 py-3 bg-white border-2 border-blue-300 text-blue-600 rounded-md font-medium hover:bg-blue-100 transition-colors cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            GO TO HOME
          </button>
        </div>
      </div>
    </div>
  );
}