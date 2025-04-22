import React from 'react'

const NanoTexture = () => {
  return (
    <>
    <div className="flex flex-col items-center justify-center p-33 pb-0">
      <img className="justify-center rounded-[28px] h-auto max-w-full transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0" 
      src="src/assets/images/NanoTexture.png" 
      alt="image description"/>
    </div>
    <div className="flex justify-end pr-33  pb-22">
      <div className= "text-gray-700 text-xl font-medium">MacBook Pro with nano-texture display</div>
    </div>

    
    {/* <div className=" text-black text-6xl font-bold font-['Poppins'] mt-30 ">MacBook Pro MacBook Air IMac MacBook Pro MacBook Air IMac MacBook Pro</div>
    <div className=" text-black text-6xl font-bold font-['Poppins']">MacBook Pro MacBook Air IMac MacBook Pro MacBook Air IMac MacBook Pro</div> */}
    </>

  )
}

export default NanoTexture