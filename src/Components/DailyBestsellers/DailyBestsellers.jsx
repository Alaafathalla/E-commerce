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
    <section className="py-16 px-4 sm:px-6 lg:px-10 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800 dark:text-white">
        Daily Best Sells
      </h2>

      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-6">
        {/* Promo card */}
        <div className="bg-green-100 dark:bg-green-900 text-gray-800 dark:text-white p-6 rounded-lg flex flex-col justify-between min-h-[300px] col-span-1">
          <h3 className="text-xl font-semibold mb-4">
            Bring nature into your home
          </h3>
          <button className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 dark:hover:bg-gray-700 transition">
            Shop Now
          </button>
        </div>

        {/* Product cards */}
        {products.map((product, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-4 rounded-lg shadow hover:shadow-md transition"
          >
            <img
              src={product.image}
              alt={product.title}
              className="h-56 sm:h-64 w-full object-cover rounded"
            />
            <h4 className="mt-3 font-semibold text-base sm:text-lg">{product.title}</h4>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-green-600 dark:text-green-400 font-bold">
                {product.price}
              </span>
              <span className="line-through text-gray-400 dark:text-gray-500">
                {product.oldPrice}
              </span>
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


