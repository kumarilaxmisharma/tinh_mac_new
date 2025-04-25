import React, { useState, useEffect } from 'react';

const MacBookProPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = [
    "src/assets/images/macbook_pro/Macpro 14'' 16''.jpg",
    "src/assets/images/macbook_pro/Macpro 16''.jpg",
    "src/assets/images/macbook_pro/sideview.jpg",
    "src/assets/images/macbook_pro/Macpro.jpg",
    "src/assets/images/macbook_pro/topview.jpg",
  ];

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  // Automatically transition slides
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [currentSlide]);

  return (
    <>
      {/* Carousel Menu */}
      <div className="relative w-full">
        {/* Carousel Wrapper */}
        <div className="relative h-52 overflow-hidden rounded-lg md:h-screen">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={image}
                className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                alt={`Slide ${index + 1}`}
              />
            </div>
          ))}
        </div>

        {/* Slider Indicators */}
        <div className="absolute z-20 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3">
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`w-3 h-3 rounded-full ${
                index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'
              }`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>

        {/* Slider Controls */}
        <button
          type="button"
          className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          onClick={handlePrev}
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50">
            <svg
              className="w-4 h-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
            <span className="sr-only">Previous</span>
          </span>
        </button>
        <button
          type="button"
          className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          onClick={handleNext}
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50">
            <svg
              className="w-4 h-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
            <span className="sr-only">Next</span>
          </span>
        </button>
      </div>

      {/* Gallery */}
      <h1 className="text-8xl font-bold text-center mt-10 text-[#004AAD]">
        MacBook <i className="text-white bg-[#004AAD] px-2">Pro.</i>
      </h1>
      <h2 className="text-6xl font-medium text-center mt-8 text-gray-600">
        Everything In One Device
      </h2>

      <div className="grid grid-cols-2 gap-8 container mx-auto mt-20">
        <div>
          <img
            className="h-auto max-w-full rounded-4xl"
            src="src/assets/images/macbook_pro/coding.jpg"
            alt="Coding with Macbook Pro"
          />
          <h4 className="relative text-4xl font-bold text-center mt-5 text-gray-700">
            Coding
          </h4>
        </div>
        <div>
          <img
            className="h-auto max-w-full rounded-4xl"
            src="src/assets/images/macbook_pro/graphic_design.jpg"
            alt="Graphic Design with Mabook Pro"
          />
          <h4 className="relative text-4xl font-bold text-center mt-5 text-gray-700">
            Graphic Design
          </h4>
        </div>
        <div>
          <img
            className="h-auto max-w-full rounded-4xl"
            src="src/assets/images/macbook_pro/music production.jpg"
            alt="Music Production with Macbook Pro"
          />
          <h4 className="relative text-4xl font-bold text-center mt-5 text-gray-700">
            Music Production
          </h4>
        </div>
        <div>
          <img
            className="h-auto max-w-full rounded-4xl"
            src="src/assets/images/macbook_pro/video_editing.jpg"
            alt="Video Edititng with Macbook Pro"
          />
          <h4 className="relative text-4xl font-bold text-center mt-5 text-gray-700">
            Video Editing
          </h4>
        </div>
      </div>
    </>
  );
};

export default MacBookProPage;