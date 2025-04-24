import React from 'react';
import { Link } from 'react-router-dom';

const CartPage = () => {
  return (
    <div className="font-popins min-h-screen border-1 border-gray-100 rounded-[14px] m-10 shadow-lg bg-white">
      <div className="max-w-screen mx-auto px-5 py-5">
        <h2 className="text-2xl font-semibold mb-6">Shopping Cart</h2>
        <table className="w-full border-collapse">
          <thead className="bg-blue-100">
            <tr>
              <th className="text-left p-3 text-[#004aad]">PRODUCTS</th>
              <th className="text-left p-3 text-[#004aad]">PRICE</th>
              <th className="text-left p-3 text-[#004aad]">QUANTITY</th>
              <th className="text-left p-3 text-[#004aad]">SUB-TOTAL</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-300">
              <td className="p-3 flex items-center">
                <img src="macbook-air.jpg" alt="MacBook Air" className="w-12 mr-3" />
                MacBook Air 13-inch
              </td>
              <td className="p-3">
                <del>$1000</del> <span className="text-red-600 font-semibold">$920</span>
              </td>
              <td className="p-3">01</td>
              <td className="p-3">$70</td>
            </tr>
            <tr className="border-b border-gray-300">
              <td className="p-3 flex items-center">
                <img src="macbook-pro.jpg" alt="MacBook Pro" className="w-12 mr-3" />
                MacBook Pro 14-inch
              </td>
              <td className="p-3">$990</td>
              <td className="p-3">03</td>
              <td className="p-3">$250</td>
            </tr>
          </tbody>
        </table>


        <div className="flex flex-col md:flex-row justify-between gap-6 mt-5">
        <div className="flex flex-col gap-4">
          <button className="px-5 py-2 border border-black bg-white">← RETURN TO SHOP</button>
          <button className="px-5 py-2 border border-black bg-white">UPDATE CART</button>
        </div>

        
          {/* <div className="border border-gray-200 p-5">
            <h3 className="text-lg font-semibold mb-3">Coupon Code</h3>
            <input
              type="text"
              placeholder="Enter coupon code"
              className="px-3 py-2 border border-gray-300 w-full md:w-64 mb-3"
            />
            <button className="px-5 py-2 border border-black bg-white">APPLY COUPON</button>
          </div> */}

        <div className=" bg-gray-100 p-5 border border-gray-200 w-1/3">
            <h3 className="text-lg font-semibold mb-3">Cart Totals</h3>
            <p>Sub-total: <span className="float-right">$320</span></p>
            <p>Shipping: <span className="float-right">Free</span></p>
            <p>Discount: <span className="float-right">$24</span></p>
            <p>Tax: <span className="float-right">$61.99</span></p>
            <p className="font-bold text-lg mt-3">Total: <strong>$357.99 USD</strong></p>
            <div className="mt-2 flex justify-start ">
              <Link 
                to="/checkout"
                className="flex justify-center w-full mt-5 px-5 py-2 text-white rounded-[6px] bg-[#004aad] hover:bg-blue-800 cursor-pointer">
                PROCEED TO CHECKOUT →
              </Link>
            </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
