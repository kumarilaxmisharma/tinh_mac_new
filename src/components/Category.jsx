import React from 'react'
import { Link } from 'react-router-dom'

const Category = () => {
  return (
    <>
    <ul className="flex flex-wrap pt-30 items-center justify-center text-gray-700 gap-6">
        <li>
            <Link
              to="/macbook_air"
              className="text-[14px] me-4 hover:text-black md:me-6 ">
                MacBook Air
            </Link>
        </li>
        <li>
            <Link
              to="/macbook_pro" 
              className="text-[14px] me-4  hover:text-black md:me-6">
               MacBook Pro
            </Link>
        </li>
        <li>
            <Link
              to="/imac" 
              className="text-[14px] me-4 hover:text-black md:me-6 ">
                IMac
            </Link>
        </li>
    </ul>

    </>

  )
}

export default Category