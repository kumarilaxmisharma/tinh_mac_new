import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import MainLayout from '../src/layouts/MainLayout';
import GuestLayout from '../src/layouts/GuestLayout';
import AdminLayout from '../src/layouts/AdminLayout';
// import Dashboard from './pages/Dashboard';
import HomePage from './pages/HomePage';
import MacBookAirPage from './pages/MacBookAirPage';
import MacBookProPage from './pages/MacBookProPage';
// // import IMac from './pages/IMac';
import ProductDetail from './pages/ProductDetail';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import SignupAdmin from './pages/SignupAdmin';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/macbook_air" element={<MacBookAirPage />} />
          <Route path="/macbook_pro" element={<MacBookProPage />} />
          {/* <Route path='/imac' element={<IMac />} /> */}
          <Route path="/products/:productId" element={<ProductDetail />} />
        </Route>

        <Route element={<GuestLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signup-business" element={<SignupAdmin />} />
        </Route>


        <Route element={<AdminLayout />}>
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          {/* <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<AdminProducts />} /> */}
        </Route>

        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
