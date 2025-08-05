import React from 'react';
import turkeyImage from '../../assets/home/hero.png'; 
import chiliLeft from '../../assets/home/hero2.png';
import chiliRight from '../../assets/home/hero2.png';
import background from '../../assets/home/background.png';

export default function RoastTurkeyHero() {
  return (
   <section
  className="relative w-full min-h-screen bg-cover bg-center text-white flex items-center justify-center px-6 md:px-16 overflow-hidden"
  style={{ backgroundImage: `url(${background})` }}
>

      {/* Left Chili */}
      <img
        src={chiliLeft}
        alt="chili"
        className="absolute top-10 left-0 w-16 md:w-24 "
      />

      {/* Right Chili */}
      <img
        src={chiliRight}
        alt="chili"
        className="absolute bottom-10 right-0 w-16 md:w-24"
      />

      <div className="max-w-6xl w-full flex flex-col-reverse md:flex-row items-center justify-between gap-10">
        {/* Text Block */}
        <div className="text-center md:text-left space-y-6 md:max-w-md z-10">
          <p className="text-yellow-200 font-cursive text-xl">Super</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">Delicious</h1>
          <div className="bg-yellow-500 inline-block px-2 py-1 -ml-1">
            <h2 className="text-3xl md:text-4xl font-bold text-[#3f2e1e] tracking-wide">ROAST TURKEY</h2>
          </div>

          <button className="mt-6 bg-yellow-500 hover:bg-yellow-600 text-[#3f2e1e] font-semibold px-6 py-2 rounded-full flex items-center gap-2">
            <span className="text-lg">→</span> Order Now
          </button>
        </div>

        {/* Turkey Image */}
        <div className="relative z-10">
          <img src={turkeyImage} alt="Roast Turkey" className="w-[350px] md:w-[450px] rounded-lg" />
        </div>
      </div>

      {/* Contact / Social */}
      <div className="absolute bottom-6 right-6 text-sm text-gray-300 space-y-1 text-right z-10">
        <div className="flex justify-end gap-2 text-lg">
          <i className="fab fa-facebook-f" />
          <i className="fab fa-instagram" />
          <i className="fab fa-twitter" />
        </div>
        <p>Call Us: +688-7854-9634</p>
        <p>TypoLuvKitchen</p>
      </div>
    </section>
  );
}

