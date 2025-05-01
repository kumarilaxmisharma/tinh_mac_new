import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {CircleCheck} from 'lucide-react';

const OrderConfirmationPage = () => {
  const navigate = useNavigate();

  const continueShopping = () => {
    navigate('/product/:id'); // You can change this to a specific product page if needed
  };

  const viewOrder = () => {
    navigate('/summary'); // ✅ corrected path
  };

  return (
    <div className=" min-h-screen max-w-6xl mx-auto px-4 py-25">
      <div className="flex justify-center mb-8">
      <CircleCheck size={'164px'} className="text-green-500 "/>
      </div>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-700">Your Order is Successfully Placed</h1>
        <p className="mt-4 text-lg text-gray-600">
          Thank you for your purchase! You will receive a confirmation email shortly.
        </p>
      </div>

      {/* Buttons for navigation */}
      <div className="flex justify-center gap-4 mb-10">
        <Link
          to="/"
          className="bg-[#004AAD] text-white px-6 py-2 rounded-lg hover:opacity-90 cursor-pointer hover:shadow-lg"
          onClick={continueShopping}
        >
          CONTINUE SHOPPING
        </Link>
        <Link
          to="/order-summary"
          className="border-2 border-[#004AAD] text-[#004AAD] px-6 py-2 rounded-lg hover:bg-gray-100 cursor-pointer hover:shadow-lg"
          onClick={viewOrder}
        >
          VIEW ORDER
        </Link>
      </div>

      {/* Footer Section */}
      <footer className="text-center mt-10">
        <div className="text-sm mb-4">
          {/* Optional footer links */}
        </div>
        <div className="text-xs">
          <p>{/* Optional copyright */}</p>
        </div>
      </footer>
    </div>
  );
};

export default OrderConfirmationPage;