import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    locationName: '',
    address: '',
    provice: '',
    district: '',
    email: '',
    phone: '',
    paymentMethod: '',
    cardName: '',
    cardNumber: '',
    expireDate: '',
    cvc: '',
    orderNotes: ''
  });

  const handleOrderPlacement = () => {
    // Here you can also validate the form before navigating
    // Perform any necessary order processing here

    // Navigate to the Order Confirmation page
    navigate('/order-confirmation');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="max-w-screen mx-auto px-22 py-5">
      <h2 className="text-3xl font-bold mb-8">Checkout</h2>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Billing Info */}
        <div className="lg:col-span-2 space-y-8">
          <h3 className="text-xl font-semibold">Billing Information</h3>

          <div className="grid grid-cols-2 gap-4">
            <input name="firstName" value={formData.firstName} onChange={handleChange} className="p-2 border border-gray-500 rounded-md" placeholder="First name" required />
            <input name="lastName" value={formData.lastName} onChange={handleChange} className="p-2 border border-gray-500 rounded-md" placeholder="Last name" required />
            <input name="companyName" value={formData.locationName} onChange={handleChange} className="p-2 border col-span-2 border-gray-500 rounded-md" placeholder="Location Name" required />
            <input name="address" value={formData.address} onChange={handleChange} className="p-2 border col-span-2 border-gray-500 rounded-md" placeholder="Address" required />
            <select name="country" value={formData.province} onChange={handleChange} className="p-2 border border-gray-500 rounded-md" required>
              <option value="">Country</option>
              
              {/* Add country options */}
            </select>
            <select name="state" value={formData.district} onChange={handleChange} className="p-2 border border-gray-500 rounded-md" required>
              <option value="">Region/State</option>
              {/* Add state options */}
            </select>
            <input name="email" value={formData.email} onChange={handleChange} className="p-2 border border-gray-500 rounded-md col-span-2" placeholder="Email" type="email (Optional)"  />
            <input name="phone" value={formData.phone} onChange={handleChange} className="p-2 border border-gray-500 rounded-md col-span-2" placeholder="Phone Number" type="tel" required />
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" />
            <label>Ship to a different address</label>
          </div>

          {/* Payment Option */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Payment Option</h3>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {[
                { name: 'Cash on Delivery', image: '/images/cash.png' },
                { name: 'ABA', image: '/images/aba.png' },
                { name: 'ACLEDA', image: '/images/acleda.png' },
                { name: 'Wing', image: '/images/wing.png' },
                { name: 'WB Bank', image: '/images/wb.png' },
                { name: 'AliPay', image: '/images/alipay.png' }
              ].map((item, idx) => (
                <label
                  key={idx}
                  className="flex flex-col items-center text-center cursor-pointer"
                >
                  {/* Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-contain mb-2"
                  />

                  {/* Name */}
                  <span className="text-sm font-medium mb-2">{item.name}</span>

                  {/* Radio Button */}
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={item.name}
                    onChange={handleChange}
                    className="cursor-pointer"
                  />
                </label>
              ))}
            </div>

            <input name="cardName" value={formData.cardName} onChange={handleChange} className="p-2 border border-gray-500 rounded-md w-full" placeholder="Name on Card" required />
            <input name="cardNumber" value={formData.cardNumber} onChange={handleChange} className="p-2 border border-gray-500 rounded-md w-full" placeholder="Card Number" required />
            <div className="grid grid-cols-2 gap-4">
              <input name="expireDate" value={formData.expireDate} onChange={handleChange} className="p-2 border border-gray-500 rounded-md" placeholder="Expire Date" required />
              <input name="cvc" value={formData.cvc} onChange={handleChange} className="p-2 border rounded" placeholder="CVC" required />
            </div>

            <textarea name="orderNotes" value={formData.orderNotes} onChange={handleChange} className="p-2 border rounded w-full" placeholder="Order Notes (Optional)" rows={3} />
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-100 p-6 rounded-2xl shadow-md space-y-4">
          <h3 className="text-xl font-semibold">Order Summary</h3>

          {/* Dynamic Order Items */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div>
                <p>MacBook Air 13-inch</p>
                <span className="text-sm">1 x $920.00</span>
              </div>
              <img src="/path-to-image-air.jpg" alt="MacBook Air" className="w-16 h-16 object-cover" />
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p>MacBook Pro 14-inch</p>
                <span className="text-sm">1 x $999.00</span>
              </div>
              <img src="/path-to-image-pro.jpg" alt="MacBook Pro" className="w-16 h-16 object-cover" />
            </div>
          </div>

          <div className="pt-4 space-y-1 text-sm">
            <div className="flex justify-between"><span>Sub-total</span><span>$1919</span></div>
            <div className="flex justify-between"><span>Shipping</span><span>Free</span></div>
            <div className="flex justify-between"><span>Discount</span><span>$19</span></div>
            <div className="flex justify-between"><span>Tax</span><span>10%</span></div>
          </div>

          <div className="flex justify-between font-bold text-lg">
            <span>Total</span><span>$2090.00 USD</span>
          </div>

          {/* Update the button to call handleOrderPlacement */}
          <div className="flex justify-center">
          <Link
            to="/order-confirmation"
            className="w-full text-center  bg-[#004AAD] text-white py-3 px-8 rounded-xl mt-4 hover:opacity-90 "
            onClick={handleOrderPlacement}
          >
            PLACE ORDER →
          </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;