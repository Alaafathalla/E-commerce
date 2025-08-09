import React from "react";
import pastaImg from "../../assets/home/pastaImg.png"; // Your right-side pasta image
import bgImg from "../../assets/home/background.png"; // Your background image

const HeroSection = () => {
  return (
    <section
      className="relative bg-cover bg-center min-h-[70vh] flex items-center"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className="w-full  px-6 lg:px-12  flex flex-col lg:flex-row items-center justify-between">
        
        {/* Left Content */}
        <div className="text-white max-w-lg space-y-4">
          {/* <p className="text-gray-300">Super Delicious</p>
          <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight">
            THE BEST WAY TO <br /> STUFF YOUR WALLET.
          </h1>
          <p className="text-gray-400">Today's Best Deal</p> */}

          {/* Discount & Button */}
          <div className="flex items-center gap-6 mt-6">
            {/* <div className="border-2 border-white rounded-full px-4 py-2 text-center">
              <span className="text-xl font-bold">50% OFF</span>
            </div> */}
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 mt-50 ml-55 rounded-full font-semibold">
              ORDER NOW
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="mt-10 lg:mt-0 lg:w-1/2 flex justify-center relative">
<img
  src={pastaImg}
  alt="Delicious Pasta"
  className="w-56 sm:w-72 md:w-[420px] lg:w-[520px] xl:w-[620px] 2xl:w-[700px] h-auto object-contain drop-shadow-lg"
/>

        </div>
      </div>

      {/* Contact Info */}
      <div className="absolute bottom-4 right-8 text-orange-400 text-sm font-bold">
        609-791-3583 <br />
        <span className="text-white">WWW.EXEMPLE.COM</span>
      </div>
    </section>
  );
};

export default HeroSection;







