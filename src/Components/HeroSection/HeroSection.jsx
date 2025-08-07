import React from 'react';
import background from '../../assets/home/background.png';
import turkeyImage from '../../assets/home/hero.png';
import chiliLeft from '../../assets/home/hero2.png';
import chiliRight from '../../assets/home/hero3.png';
import heading from '../../assets/home/heading.png';

import {
  Facebook,
  Instagram,
  Twitter,
  ArrowRight,
} from 'lucide-react';

export default function RoastTurkeyHero() {
  return (
    <section
      className="relative w-full min-h-[80vh] bg-cover bg-center text-white dark:text-white flex items-center justify-center px-4 sm:px-6 md:px-16 overflow-hidden transition-colors duration-300"
      style={{ backgroundImage: `url(${background})` }}
    >
      {/* Left Chili */}
      <img
        src={chiliLeft}
        alt="chili"
        className="absolute top-10 left-0 w-16 sm:w-24 md:w-40 lg:w-60"
      />

      {/* Right Chili */}
      <img
        src={chiliRight}
        alt="chili"
        className="absolute bottom-50 right-10 w-40 sm:w-24 md:w-32 lg:w-50 rotate-45"
      />

      {/* Content */}
      <div className="max-w-7xl w-full flex flex-col md:flex-row items-center justify-between z-10 gap-10">
        {/* Left Text */}
        <div className="w-full md:w-1/2 space-y-4 md:space-y-6 text-center md:text-left">
          <img
            src={heading}
            alt="Roast Turkey"
            className="w-[300px] sm:w-[400px] md:w-[600px]"
          />
        </div>

        {/* Turkey Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={turkeyImage}
            alt="Roast Turkey"
            className="w-[250px] sm:w-[350px] md:w-[450px] lg:w-[500px]"
          />
        </div>
      </div>

      {/* Order Now Button */}
      <div className="absolute bottom-6 left-1/2 md:left-10 transform -translate-x-1/2 md:translate-x-0 z-10">
        <button className="bg-yellow-400 hover:bg-yellow-500 text-[#3f2e1e] font-semibold px-6 py-3 rounded-full text-base flex items-center gap-2 shadow-md transition">
          <ArrowRight size={20} /> Order Now
        </button>
      </div>

      {/* Contact Info and Social Icons */}
      <div className="absolute bottom-6 right-6 text-sm text-gray-200 dark:text-gray-300 space-y-1 text-right z-10">
        <div className="flex justify-end gap-4 text-lg">
          <Facebook className="hover:text-yellow-400 transition" size={18} />
          <Instagram className="hover:text-yellow-400 transition" size={18} />
          <Twitter className="hover:text-yellow-400 transition" size={18} />
        </div>
        <p>Call Us: +688-7854-9634</p>
        <p>TypoLuvKitchen</p>
      </div>
    </section>
  );
}





