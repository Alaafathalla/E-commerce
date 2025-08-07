import React from 'react';
import { Truck, Utensils, Hamburger } from 'lucide-react';
import saladImg from '../../assets/home/choose.png';

export default function WhyChooseUs() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid md:grid-cols-2 gap-10 items-center bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Image */}
      <div className="w-full">
        <img
          src={saladImg}
          alt="Why Choose Us"
          className="rounded-xl shadow-lg object-cover"
        />
      </div>

      {/* Content */}
      <div className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
          Why People Choose us?
        </h2>

        <div className="space-y-4">
          <div className="flex items-start gap-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg transition-colors">
            <Truck className="text-orange-500" />
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-white">
                Convenient and Reliable
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Whether you dine in, take out, or order delivery, our service is fast, reliable, and hassle-free.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg transition-colors">
            <Utensils className="text-yellow-500" />
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-white">
                Variety of Options
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                From hearty meals to light snacks, we offer a wide range of options to suit every taste.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg transition-colors">
            <Hamburger className="text-red-500" />
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-white">
                Eat Burger
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Our burgers are grilled to perfection with juicy patties and flavorful toppings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

