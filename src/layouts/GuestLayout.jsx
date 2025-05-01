import { Outlet } from "react-router-dom";
import Navbar from '/src/components/Navbar';
import Footer from '/src/components/Footer';

const GuestLayout= () =>{
  return (
    <>
      <Navbar />
        <Outlet />
      <Footer />

    </>
  );
};

export default GuestLayout;