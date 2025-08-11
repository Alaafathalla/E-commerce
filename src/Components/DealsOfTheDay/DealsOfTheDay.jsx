import React from 'react';
import { ArrowRight, Star } from 'lucide-react';
import deal1 from '../../assets/home/deal1.png';
import deal2 from '../../assets/home/deal2.png';
import deal3 from '../../assets/home/deal3.png';
import deal4 from '../../assets/home/deal4.png';

const products = [
  {
    title: "Seeds of Change Organic Quinoa, Brown, & Red Rice",
    brand: "NestFood",
    price: "$32.85",
    oldPrice: "$33.80",
    rating: 4.0,
    image: deal1,
  },
  {
    title: "Perdue Simply Smart Organics Gluten Free",
    brand: "Old El Paso",
    price: "$24.85",
    oldPrice: "$26.80",
    rating: 4.0,
    image: deal2,
  },
  {
    title: "Signature Wood-Fired Mushroom and Caramelized",
    brand: "Progresso",
    price: "$12.85",
    oldPrice: "$15.80",
    rating: 3.0,
    image: deal3,
  },
  {
    title: "Simply Lemonade with Raspberry Juice",
    brand: "Yoplait",
    price: "$15.85",
    oldPrice: "$16.80",
    rating: 3.0,
    image: deal4,
  },
];

export default function DealsOfTheDay() {
  return (
    <section className="max-w-7xl mx-auto py-10 px-6 sm:px-12 lg:px-8 bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white">
          Deals Of The Day
        </h2>
        <a
          href="/deals"
          className="flex items-center text-sm sm:text-base text-gray-600 dark:text-gray-300 hover:text-red-500 font-medium transition"
        >
          Show All Deals <ArrowRight className="ml-1 w-4 h-4" />
        </a>
      </div>

      {/* Product Cards */}
      <div className="flex flex-wrap justify-between gap-y-6 sm:gap-6">
        {products.map((product, idx) => (
          <div
            key={idx}
            className="w-[47%] sm:w-[48%] md:w-[31%] lg:w-[23%] bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
          >
            {/* Image */}
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-40 sm:h-44 md:h-48 object-cover"
            />

            {/* Card Content */}
            <div className="-mt-4 bg-white dark:bg-gray-800 mx-4 p-4 rounded-lg shadow relative z-10 space-y-2 text-sm text-gray-800 dark:text-white">
              <h3 className="font-medium leading-snug text-sm sm:text-base">
                {product.title}
              </h3>

              {/* Rating */}
              <div className="flex items-center text-yellow-500 text-xs">
                {[...Array(Math.round(product.rating))].map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
                ))}
                <span className="text-gray-500 dark:text-gray-400 ml-2">
                  ({product.rating.toFixed(1)})
                </span>
              </div>

              <p className="text-xs text-gray-500 dark:text-gray-400">
                By <span className="text-green-600 dark:text-green-400">{product.brand}</span>
              </p>

              {/* Prices & Add Button */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="text-sm space-x-2">
                  <span className="text-green-600 dark:text-green-400 font-semibold">
                    {product.price}
                  </span>
                  <span className="text-gray-400 dark:text-gray-500 line-through">
                    {product.oldPrice}
                  </span>
                </div>
                <button className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-1.5 rounded w-full sm:w-auto transition">
                  🛒 Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}




