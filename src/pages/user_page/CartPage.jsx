import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'MacBook Air 13-inch',
      price: 920,
      oldPrice: 1000,
      quantity: 1,
      image: '/images/air.jpg',
    },
    {
      id: 2,
      name: 'MacBook Pro 14-inch',
      price: 990,
      quantity: 3,
      image: '/images/pro.jpg',
    },
  ]);

  const navigate = useNavigate(); // Initialize useNavigate

  const handleQuantityChange = (id, delta) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + delta) }
          : item
      )
    );
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = 24;
  const tax = 61.99;
  const total = subtotal - discount + tax;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-8">Your Cart</h2>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map(item => (
            <div
              key={item.id}
              className="flex items-center gap-4 bg-white shadow-md rounded-2xl p-4"
            >
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl" />
              <div className="flex-1">
                <h4 className="text-lg font-semibold">{item.name}</h4>
                <div className="flex items-center gap-2 mt-1">
                  {item.oldPrice && (
                    <span className="text-sm text-gray-400 line-through">${item.oldPrice}</span>
                  )}
                  <span className="text-base font-medium">${item.price}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleQuantityChange(item.id, -1)}
                  className="w-8 h-8 bg-gray-200 rounded-full text-lg font-bold"
                >
                  -
                </button>
                <span className="w-8 text-center font-medium">{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(item.id, 1)}
                  className="w-8 h-8 bg-gray-200 rounded-full text-lg font-bold"
                >
                  +
                </button>
              </div>
              <div className="text-right font-semibold">${(item.price * item.quantity).toFixed(2)}</div>
            </div>
          ))}
        </div>

        <div className="bg-gray-100 p-6 rounded-2xl shadow-md space-y-4">
          <h3 className="text-xl font-semibold">Cart Summary</h3>
          <div className="flex justify-between">
            <span>Sub-total</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between">
            <span>Discount</span>
            <span>-${discount}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>${tax}</span>
          </div>
          <div className="flex justify-between font-bold text-lg pt-2 border-t">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button
            onClick={() => navigate('/checkout')} // Navigate to checkout
            className="w-full bg-[#004aad] text-white py-2 rounded-xl mt-4 hover:opacity-90 cursor-pointer"
          >
            Proceed to Checkout →
          </button>
        </div>
      </div>
      <div className="mt-10 bg-white p-6 rounded-2xl shadow-md max-w-md">
        <h4 className="text-lg font-medium mb-2">Apply Coupon</h4>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Coupon Code"
            className="border rounded-xl px-4 py-2 w-full"
          />
          <button className="bg-gray-200 px-4 py-2 rounded-xl hover:bg-gray-300">Apply</button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;