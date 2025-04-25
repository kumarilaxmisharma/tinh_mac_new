import React from 'react';

const SummaryPage = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Order Summary</h1>
        <input
          type="text"
          placeholder="Search"
          className="border rounded p-2"
        />
      </div>

      {/* Order Details */}
      <div className="border p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">#96459761</h2>
        <p className="text-sm mb-2">Order Placed: 28 March, 2025 at 7:22 PM</p>
        <p className="text-sm mb-4">Order expected: 31 March, 2025</p>

        <h3 className="text-lg font-semibold mb-2">Total: $2090.00</h3>
      </div>

      {/* Order Activity */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-lg font-semibold mb-4">Order Activity</h3>
        <ul className="space-y-2">
          <li>Order has been delivered. Thank you for shopping at TrimMac!</li>
          <li>Order is being packaged.</li>
          <li>Order is on the way! Estimated delivery date: 31 March, 2025.</li>
        </ul>
      </div>

      
    </div>
  );
};

export default SummaryPage;