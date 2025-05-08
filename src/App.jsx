import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
// Importing ScrollToTop component
import ScrollToTop from './components/ScrollToTop';         


import NotFoundPage from './pages/NotFoundPage'; // Importing NotFoundPage component
{/* Importing layouts and pages */}
import MainLayout from '../src/layouts/MainLayout';
import GuestLayout from '../src/layouts/GuestLayout';
import AdminLayout from '../src/layouts/AdminLayout';
{/* Importing admin pages */}
import DashboardPage from './pages/admin_page/DashboardPage';
import ProductsPage from './pages/admin_page/ProductsPage';
import AddProductPage from './pages/admin_page/AddProductPage';
import AdminProfilePage from './pages/admin_page/AdminProfilePage';
import CustomersPage from './pages/admin_page/CustomersPage';
import CategoryPage from './pages/admin_page/CategoryPage';
import OrdersPage from './pages/admin_page/OrdersPage';
import ActivityLogPage from './pages/admin_page/ActivityLogPage';

{/* User pages */}
import HomePage from './pages/user_page/HomePage';
import MacBookAirPage from './pages/user_page/MacBookAirPage';
import MacBookProPage from './pages/user_page/MacBookProPage';
import SettingPage from './pages/user_page/SettingPage';
import OrderConfirmationPage from './pages/user_page/OrderConfirmationPage';
import SummaryPage from './pages/user_page/SummaryPage';
import ProductDetail from './pages/user_page/ProductDetail';
import CartPage from './pages/user_page/CartPage';
import CheckoutPage from './pages/user_page/CheckoutPage';
import WishedListPage from './pages/user_page/WishedListPage';
import ChangePassword from './components/user/ChangePassword';

{/* Authentication guest pages */}
import LoginPage from './pages/authentication/LoginPage';
import SignupPage from './pages/authentication/SignupPage';
import SignupAdmin from './pages/authentication/SignupAdmin';
import ForgetPasswordPage from './pages/authentication/ForgetPasswordPage';


function App() {
  return (
    <BrowserRouter>
      
      
      <ScrollToTop /> {/* Add ScrollToTop here */}
      <Routes>

        {/* Main Layout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/macbook_air" element={<MacBookAirPage />} />
          <Route path="/macbook_pro" element={<MacBookProPage />} />
          {/* <Route path='/imac' element={<IMac />} /> */}
          <Route path="/products/:productId" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage/>} />
          <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
          <Route path="/order-summary" element={<SummaryPage />} />
          <Route path="/wished-list" element={<WishedListPage />} />
          <Route path="/settings" element={<SettingPage />} />
         
        </Route>

        {/* Geust Layout */}
        <Route element={<GuestLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signup-business" element={<SignupAdmin />} />
          <Route path="/login/forget-password" element={<ForgetPasswordPage />} />
        </Route>

        {/* Admin Layout */}
        <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/add-product" element={<AddProductPage/>} />
          <Route path="/profile" element={<AdminProfilePage />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/activity-log" element={<ActivityLogPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
