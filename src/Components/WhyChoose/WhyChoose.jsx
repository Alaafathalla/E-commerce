// components/WhyChooseUs.jsx
import React from 'react';
import { Truck, Utensils, Hamburger } from 'lucide-react';
import saladImg from '../../assets/home/choose.png';

export default function WhyChooseUs() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid md:grid-cols-2 gap-10 items-center">
      {/* Image */}
      <div className="w-full">
        <img src={saladImg} alt="Why Choose Us" className="rounded-xl shadow-lg object-cover" />
      </div>

      {/* Content */}
      <div className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Why People Choose us?</h2>

        <div className="space-y-4">
          <div className="flex items-start gap-4 bg-gray-50 p-4 rounded-lg">
            <Truck className="text-orange-500" />
            <div>
              <h4 className="font-semibold text-gray-800">Convenient and Reliable</h4>
              <p className="text-sm text-gray-600">
                Whether you dine in, take out, or order delivery, our service is fast, reliable, and hassle-free.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 bg-gray-50 p-4 rounded-lg">
            <Utensils className="text-yellow-500" />
            <div>
              <h4 className="font-semibold text-gray-800">Variety of Options</h4>
              <p className="text-sm text-gray-600">
                From hearty meals to light snacks, we offer a wide range of options to suit every taste.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 bg-gray-50 p-4 rounded-lg">
            <Hamburger className="text-red-500" />
            <div>
              <h4 className="font-semibold text-gray-800">Eat Burger</h4>
              <p className="text-sm text-gray-600">
                Our burgers are grilled to perfection with juicy patties and flavorful toppings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}