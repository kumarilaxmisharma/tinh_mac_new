import React from 'react';
// import { useState } from 'react';
import AboutMac from '../../components/user/AboutMac';
import ProductCards from '../../components/user/product_card/ProductCards';
import WishedProduct from '../../components/user/wish_list/WishedProduct';
import NewArrival from '../../components/user/NewArrival';
import NanoTexture from '../../components/user/NanoTexture';

const HomePage = () => {
  return (
    <>
      <AboutMac />
      <ProductCards />
      <WishedProduct />
      <NewArrival />
      <NanoTexture />
    </>
  );
};

export default HomePage;