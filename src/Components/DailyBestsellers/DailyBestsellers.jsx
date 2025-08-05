// DailyBestsellers.jsx
import React from 'react';
import product1 from "../../assets/home/product1.png";
import product2 from "../../assets/home/product2.png";
import product3 from "../../assets/home/product3.png";
import product4 from "../../assets/home/product4.png";

const products = [
  {
    title: "Aegle marmelos Fruit",
    price: "$32.00",
    oldPrice: "$40.00",
    image: product1, 
  },
  {
    title: "Organic Tomato Chips",
    price: "$18.00",
    oldPrice: "$25.00",
    image: product2,
  },
  {
    title: "Toasted Turmeric Crispy",
    price: "$22.00",
    oldPrice: "$28.00",
    image: product3,
  },
  {
    title: "Avocado Lighting",
    price: "$16.00",
    oldPrice: "$20.00",
    image: product4, 
  },
];


export default function DailyBestsellers() {
  return (
    <section className="py-16 bg-gray-100 px-6">
      <h2 className="text-3xl font-bold text-center mb-10">Daily Best Sells</h2>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-green-100 p-6 rounded-lg flex flex-col justify-between">
          <h3 className="text-xl font-semibold mb-4">Bring nature into your home</h3>
          <button className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition">
            Shop Now
          </button>
        </div>
        {products.map((product, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow">
            <img src={product.image} alt={product.title} className="h-40 w-full object-cover rounded" />
            <h4 className="mt-3 font-semibold">{product.title}</h4>
            <div className="flex items-center gap-2">
              <span className="text-green-600 font-bold">{product.price}</span>
              <span className="line-through text-gray-400">{product.oldPrice}</span>
            </div>
            <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400 transition">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
