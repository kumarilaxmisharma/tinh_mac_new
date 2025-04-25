import React from 'react'

const AboutMac = () => {
  // Data structure for special deals with images
  const deals = {
    leftColumn: [
      { title: "Special Deal", image: "src/assets/images/about_mac/Studio Display.png" },
      { title: "Special Deal", image: "src/assets/images/about_mac/Build to stand the test of time.jpg" },
      { title: "Special Deal", image: "src/assets/images/about_mac/Interaction.jpg" }
    ],
    middleColumn: [
      { title: "Special Deal", image: "src/assets/images/about_mac/connectivity_displays__er91a9b94oeq_large_2x.jpg" },
      { 
        smallDeals: [
          { title: "Special Deal", image: "src/assets/images/about_mac/IMac carousel 3.jpg" },
          { title: "Special Deal", image: "src/assets/images/about_mac/Mac is build to last.jpg" }
        ]
      },
      { title: "Special Deal", image: "src/assets/images/about_mac/Everything in one .png" }
    ],
    rightColumn: [
      { title: "Special Deal", image: "src/assets/images/about_mac/mac_iphone__n2863l0ne0q6_large_2x.jpg" },
      { title: "Special Deal", image: "src/assets/images/about_mac/Kids.jpg" },
      { title: "Special Deal", image: "src/assets/images/about_mac/Performance and Battery.jpg" }
    ]
  }

  // Helper function to render a deal box with image
  const renderDealBox = (deal, aspectRatio, titleSize = "text-xl") => (
    <div className={`bg-gray-200 rounded-3xl p-6 relative overflow-hidden ${aspectRatio}`}>
      {/* Image with overlay */}
      {deal.image && (
        <div className="absolute inset-0">
          <img 
            src={deal.image || "/placeholder.svg"} 
            alt={deal.title} 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/placeholder.jpg";
            }}
          />
          {/* Dark overlay for better text visibility */}
          <div className="absolute inset-0 bg-opacity-30"></div>
        </div>
      )}
      
      {/* Title with z-index to appear above the image */}
      <h2 className={`${titleSize} font-bold relative z-10 text-white`}>{deal.title}</h2>
    </div>
  )

  return (
    <div className="container max-w-screen px-22 py-14">
      <div className="grid grid-cols-12 gap-4">
        {/* First column */}
        <div className="col-span-12 md:col-span-3 flex flex-col gap-4 ">
          {renderDealBox(deals.leftColumn[0], "aspect-[4/3] transition delay-50 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105")}
          {renderDealBox(deals.leftColumn[1], "aspect-[4/5] transition delay-50 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105")}
          {renderDealBox(deals.leftColumn[2], "aspect-[4/3] transition delay-50 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105")}
        </div>

        {/* Middle column */}
        <div className="col-span-12 md:col-span-6 flex flex-col gap-4">
          {/* Large top middle block */}
          {renderDealBox(deals.middleColumn[0], "aspect-[8/5] transition delay-50 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105", "text-2xl")}

          {/* Two smaller blocks in middle */}
          <div className="grid grid-cols-2 gap-4">
            {renderDealBox(deals.middleColumn[1].smallDeals[0], "aspect-[4/3] transition delay-50 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105")}
            {renderDealBox(deals.middleColumn[1].smallDeals[1], "aspect-[4/3] transition delay-50 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105")}
          </div>

          {/* Bottom middle wide block */}
          {renderDealBox(deals.middleColumn[2], "aspect-[8/2.8] transition delay-50 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105")}
        </div>

        {/* Right column */}
        <div className="col-span-12 md:col-span-3 flex flex-col gap-4">
          {renderDealBox(deals.rightColumn[0], "aspect-[4/3] transition delay-50 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105")}
          {renderDealBox(deals.rightColumn[1], "aspect-[4/3] transition delay-50 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105")}
          {renderDealBox(deals.rightColumn[2], "aspect-[4/5] transition delay-50 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105")}
        </div>
      </div>
    </div>
  )
};

export default AboutMac;