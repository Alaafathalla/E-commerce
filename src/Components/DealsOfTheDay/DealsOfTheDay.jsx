import React from 'react';
import { ArrowRight } from 'lucide-react';
import deal1 from '../../assets/home/deal1.png';
import deal2 from '../../assets/home/deal2.png';
import deal3 from '../../assets/home/deal3.png';
import deal4 from '../../assets/home/deal4.png';

// Sample product data
const products = [
  {
    title: "Seeds of Change Organic Quinoa, Brown, & Red Rice",
    brand: "NestFood",
    price: "$32.85",
    oldPrice: "$33.8",
    rating: 4.0,
    image: deal1
  },
  {
    title: "Perdue Simply Smart Organics Gluten Free",
    brand: "Old El Paso",
    price: "$24.85",
    oldPrice: "$26.8",
    rating: 4.0,
    image: deal2
  },
  {
    title: "Signature Wood-Fired Mushroom and Caramelized",
    brand: "Progresso",
    price: "$12.85",
    oldPrice: "$15.8",
    rating: 3.0,
    image:deal3
  },
  {
    title: "Simply Lemonade with Raspberry Juice",
    brand: "Yoplait",
    price: "$15.85",
    oldPrice: "$16.8",
    rating: 3.0,
    image: deal4
  }
];

export default function DealsOfTheDay() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Deals Of The Day</h2>
        <a href="/deals" className="flex items-center text-sm text-gray-600 hover:text-red-500 font-medium">
          Show All Deals <ArrowRight className="ml-1 w-4 h-4" />
        </a>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden">
            <img src={product.image} alt={product.title} className="w-full h-40 object-cover" />
            <div className="p-4 space-y-2">
              <h3 className="text-sm font-medium text-gray-800">{product.title}</h3>
              <p className="text-xs text-gray-500">By {product.brand}</p>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-green-600 font-semibold">{product.price}</span>
                <span className="text-gray-400 line-through">{product.oldPrice}</span>
              </div>
              <button className="mt-2 bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-1.5 rounded">
                Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
