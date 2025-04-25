
const MacBookAirPage = () => {
  
  return (
    <>
      {/* Hero Section */}
      <div className="relative">
        <video class="w-full" autoplay muted controls>
          <source src="src/assets/images/macbook_air/large_2x.mp4" type="video/mp4"/>
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Gallery */}
      <h1 className="text-8xl font-bold text-center mt-10 text-[#004AAD]">
        MacBook <i className="text-white bg-[#004AAD] px-2">Air.</i>
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

      {/*Mansory Grid*/}

      <div className="mt-30 mb-20 mx-1">
        <h1 className="text-[#004AAD] text-6xl font-bold text-center mb-10">
          Get Productive With <i className="text-white bg-[#004AAD] p-2 text-bold"> Afforable Price. </i>
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20">
          <div className="grid gap-4">
            <div>
              <img
                className="h-auto max-w-full rounded-lg"
                src="src/assets/images/macbook_air/design_top_starlight.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                className="h-auto max-w-full rounded-lg"
                src="src/assets/images/macbook_air/design_magsafe_midnight.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                className="h-auto max-w-full rounded-lg"
                src="src/assets/images/macbook_air/design_portability_1.jpg"
                alt=""
              />
            </div>
          </div>
          <div className="grid gap-4">
            <div>
              <img
                className="h-auto max-w-full rounded-lg"
                src="src/assets/images/macbook_air/connectivity_displays.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                className="h-auto max-w-full rounded-lg"
                src="src/assets/images/macbook_air/design_top_silver.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                className="h-auto max-w-full rounded-lg"
                src="src/assets/images/macbook_air/apps.png"
                alt=""
              />
            </div>
          </div>
          <div className="grid gap-4">
            <div>
              <img
                className="h-auto max-w-full rounded-lg"
                src="src/assets/images/macbook_air/design_top_midnight.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                className="h- max-w-full rounded-lg"
                src="src/assets/images/macbook_air/design_portability_2.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                className="h-auto max-w-full rounded-lg"
                src="src/assets/images/macbook_air/mac_iphone__n2863l0ne0q6_large_2x.jpg"
                alt=""
              />
            </div>
          </div>
          <div className="grid gap-4">
            <div>
              <img
                className="h-auto max-w-full rounded-lg"
                src="src/assets/images/macbook_air/touch id.png"
                alt=""
              />
            </div>
            <div>
              <img
                className="h-auto max-w-full rounded-lg"
                src="src/assets/images/macbook_air/design_top_skyblue.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                className="h-auto max-w-full rounded-lg"
                src="src/assets/images/macbook_air/design_portability_3.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MacBookAirPage;