import { Outlet } from 'react-router-dom';
import Footer from '/src/components/Footer';
import Navbar from '/src/components/Navbar';
import Category from '/src/components/Category';

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Category />
      <Outlet />
      <Footer /> 
    </>
  )
};

export default MainLayout;
