import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import MainLayout from '../src/layouts/MainLayout';
import GuestLayout from '../src/layouts/GuestLayout';
import AdminLayout from '../src/layouts/AdminLayout';
import DashboardPage from './pages/admin_page/DashboardPage';
import ProductsPage from './pages/admin_page/ProductsPage';
import HomePage from './pages/HomePage';
import MacBookAirPage from './pages/MacBookAirPage';
import MacBookProPage from './pages/MacBookProPage';
// // import IMac from './pages/IMac';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import SignupAdmin from './pages/SignupAdmin';


function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Main Layout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/macbook_air" element={<MacBookAirPage />} />
          <Route path="/macbook_pro" element={<MacBookProPage />} />
          {/* <Route path='/imac' element={<IMac />} /> */}
          <Route path="/products/:productId" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Route>

        {/* Geust Layout */}
        <Route element={<GuestLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signup-business" element={<SignupAdmin />} />
        </Route>

        {/* Admin Layout */}
        <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/admin/products" element={<ProductsPage />} />
        </Route>

        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
