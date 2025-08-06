import React from 'react';
import HeroSection from '../../Components/HeroSection/HeroSection';
import CategoriesSection from '../../Components/CategoriesSection/Categories';
import DailyBestsellers from '../../Components/DailyBestsellers/DailyBestsellers';
import SpecialDishes from '../../Components/SpecialDishes/SpecialDishes';
import DealsOfTheDay from '../../Components/DealsOfTheDay/DealsOfTheDay';
import WhyChoose from '../../Components/WhyChoose/WhyChoose';  
import Pros from '../../Components/Pros/Pros'; 

export default function Home() {
  return (
    <main>
      <HeroSection />
      <CategoriesSection />
      <DailyBestsellers />
        <SpecialDishes />
        <DealsOfTheDay />
        <WhyChoose />
        <Pros/> 
    </main>
  );
}

