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
    <section className="py-16 bg-white text-center">
      <p className="text-red-500 font-medium tracking-wide">CUSTOMER FAVORITES</p>
      <h2 className="text-3xl font-bold mb-10">Popular Categories</h2>
      <div className="flex flex-wrap justify-center gap-6">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="w-40 h-40 shadow-lg bg-white rounded-lg flex flex-col items-center justify-center space-y-3"
          >
            <img src={cat.icon} alt={cat.label} className="w-16 h-16 bg-neutral-200 p-2  rounded-full" />
            <h3 className="font-semibold text-lg">{cat.label}</h3>
            <p className="text-sm text-gray-500">{cat.count}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
