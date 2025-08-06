// CategoriesSection.jsx
import React from 'react';
import item1 from "../../assets/home/item1.png"; 
import item2 from "../../assets/home/item2.png"; 
import item3 from "../../assets/home/item3.png"; 
import item4 from "../../assets/home/item4.png"; 
import item5 from "../../assets/home/item5.png"; 

const categories = [
  { label: "Main Dish", count: "98 Dishes", icon: item1 },
  { label: "Break Fast", count: "12 break fast", icon: item2 },
  { label: "Dessert", count: "48 dessert", icon: item3 },
  { label: "Browse All", count: "205 items", icon: item4 },
  { label: "Breakfast Food", count: "205 items", icon: item5 },
];

export default function CategoriesSection() {
  return (
    <section className="py-16 bg-white text-center px-4">
      <p className="text-red-500 font-medium tracking-wide">CUSTOMER FAVORITES</p>
      <h2 className="text-3xl md:text-4xl font-bold mb-10">Popular Categories</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="w-full h-40 sm:h-44 lg:h-56 shadow-md hover:shadow-xl transition-shadow duration-300 bg-white rounded-lg flex flex-col items-center justify-center space-y-3"
          >
            <img 
              src={cat.icon} 
              alt={cat.label} 
              className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-neutral-200 p-2 rounded-full" 
            />
            <h3 className="font-semibold text-base sm:text-lg lg:text-xl">{cat.label}</h3>
            <p className="text-xs sm:text-sm lg:text-base text-gray-500">{cat.count}</p>
          </div>
        ))}
      </div>
    </section>
  );
}


