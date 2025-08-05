// HeroSection.jsx
import React from 'react';
import hero from "../../assets/home/hero.png"; 
export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-r from-zinc-800 to-black text-white h-[500px] flex items-center justify-center px-6">
      <div className="text-center z-10">
        <h2 className="text-4xl font-light mb-2">So... Delicious</h2>
        <h1 className="text-6xl font-bold mb-4">ROAST TURKEY</h1>
        <button className="bg-yellow-500 text-black px-6 py-3 rounded-full hover:bg-yellow-400 transition">
          Order Now
        </button>
      </div>
      <img
        src={hero}
        alt="Roast Turkey"
        className="absolute right-10 bottom-0 w-[300px] hidden md:block"
      />
      <img
        src="/images/banana.png"
        alt="Decor"
        className="absolute top-10 left-10 w-20"
      />
    </section>
  );
}
