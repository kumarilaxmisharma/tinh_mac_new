import React, { useEffect, useState } from 'react';
// import {CircleDollarSign } from "react-feather";

const CheckoutPage = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const discount = 19;
  const total = subtotal + tax - discount;

  return (
    <div className=" font-sans min-h-screen m-10  border-gray-100 rounded-[14px] shadow-lg bg-white">
      <div className="max-w-screen mx-auto p-6 bg-white shadow-md mt-8 rounded-md">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Billing Form */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold mb-4">Billing Information</h2>
            <form className="space-y-6">
              {/* User Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block mb-1 font-medium">First name</label>
                  <input type="text" placeholder="First name" className="border border-gray-400 p-2 rounded w-full" />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Last name</label>
                  <input type="text" placeholder="Last name" className="border border-gray-400 p-2 rounded w-full" />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Location name (Optional)</label>
                  <input type="text" placeholder="Location name (Optional)" className="border border-gray-400 p-2 rounded w-full" />
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block mb-1 font-medium">Address</label>
                <input type="text" placeholder="Address" className="border border-gray-400 p-2 rounded w-full required:**:" />
              </div>

              {/* Country/State/City/Zip */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block mb-1 font-medium">Provice</label>
                  <select className="border border-gray-400 p-2 rounded w-full">
                    <option>Phnom Penh</option>
                    <option>Siem Reap</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1 font-medium">District</label>
                  <select className="border border-gray-400 p-2 rounded w-full">
                    <option>Toul Kok</option>
                    <option>Boeng Keng Kang</option>
                    <option>Doun Penh</option>

                  </select>
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 font-medium">Email (Optional)</label>
                  <input type="email" placeholder="Email" className="border border-gray-400 p-2 rounded w-full" />
                </div>
                <div>
                  <label className="block mb-1 font-medium  ">Phone Number </label>
                  <input type="tel" placeholder="Phone Number" className="border border-gray-400 p-2 rounded w-full required:" />
                </div>
              </div>

              {/* Shipping Address Checkbox */}
              <label className="inline-flex items-center">
                <input type="checkbox" className="mr-2" />
                Ship into different address
              </label>

              {/* Payment Option */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Payment Option</h3>
                <div className="grid grid-c sm:grid-cols-6 gap-4 items-center">
                  {[
                    { name: 'Cash', logo:'src/assets/images/payment_option/dollar-symbol.png' },
                    { name: 'ABA', logo: 'src/assets/images/payment_option/aba.webp' },
                    { name: 'ACLEDA', logo: 'src/assets/images/payment_option/acleda bank.webp' },
                    { name: 'Wing', logo: 'src/assets/images/payment_option/wingbank.webp' },
                    { name: 'AliPay', logo: 'src/assets/images/payment_option/alipay-logo.webp' },
                  ].map((method) => (
                    <label className="flex flex-col items-center cursor-pointer space-y-2">
                      <img src={method.logo} alt={method.name} className="w-10 h-10 object-contain" />
                      <span className="text-sm">{method.name}</span>
                      <input type="radio" name="payment" value={method.value} className="mt-1" />
                    </label>
                  ))}
                </div>
              </div>


              {/* Card Info */}
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block mb-1 font-medium">Name on Card</label>
                  <input type="text" placeholder="Name on Card" className="border border-gray-400 p-2 rounded w-full" />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Card Number</label>
                  <input type="text" placeholder="Card Number" className="border border-gray-400 p-2 rounded w-full" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1 font-medium">MM/YY</label>
                    <input type="text" placeholder="MM/YY" className="border border-gray-400 p-2 rounded w-full" />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">CVC</label>
                    <input type="text" placeholder="CVC" className="border border-gray-400 p-2 rounded w-full" />
                  </div>
                </div>
              </div>

              {/* Order Notes */}
              <div className="grid gap-4">
                <div>
                  <label className="block mb-1 font-medium">Order Notes (Optional)</label>
                  <textarea rows="3" placeholder="Order Notes (Optional)" className="border border-gray-400 p-2 rounded w-full"></textarea>
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium">Order Notes (Optional)</label>
                  <textarea rows="3" placeholder="Order Notes (Optional)" className="border border-gray-400 p-2 rounded w-full"></textarea>
                </div>
              </div>
            </form>

          </div>

          {/* Order Summary */}
          <div className="summary-section bg-gray-50 p-6 rounded-md shadow-inner">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            {cart.map((item, index) => (
              <div key={index} className="flex items-center mb-4 gap-4">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm">{item.quantity} × ${item.price}</p>
                </div>
              </div>
            ))}
            <div className="text-sm mt-4 space-y-1">
              <p>Sub-total: <span className="float-right">${subtotal.toFixed(2)}</span></p>
              <p>Shipping: <span className="float-right">Free</span></p>
              <p>Discount: <span className="float-right">-${discount}</span></p>
              <p>Tax (10%): <span className="float-right">${tax.toFixed(2)}</span></p>
            </div>
            <div className="font-bold text-lg mt-4">Total: ${total.toFixed(2)} USD</div>
            <button className=" w-full bg-[#004aad] text-white py-2 mt-4 rounded-[6px] hover:bg-blue-800 cursor-pointer">PLACE ORDER →</button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default CheckoutPage;
