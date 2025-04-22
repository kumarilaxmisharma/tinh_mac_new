import React from 'react'
// import { useState } from 'react'  
import AboutMac from '../components/sections/AboutMac';
import ProductCards from '../components/sections/ProductCards';
import WishedProduct from '../components/sections/WishedProduct';
import NewArrival from '../components/sections/NewArrival';
import NanoTexture from '../components/sections/NanoTexture';

const HomePage = () => {
  return (
    <>
    <AboutMac />
    <ProductCards />
    <WishedProduct />
    <NewArrival />
    <NanoTexture />
    </>
  )
};

export default HomePage