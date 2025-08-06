import React from 'react';
import { BadgePercent, Truck, Gift, ShoppingBag, Undo2, Mail } from 'lucide-react';
import ctaGuy from '../../assets/home/delivery.png'; // 🧠 replace with your actual image path

export default function CTASection() {
  return (
    <>
      {/* CTA Banner */}
      <section className=" relative min-h-[30vh] bg-gradient-to-r  from-[#686964] to-[#2c2d2a] text-white rounded-2xl mx-4 sm:mx-6 lg:mx-8 overflow-hidden">
        <div className="max-w-7xl px  mx-auto flex flex-col lg:flex-row items-center justify-between  py-12 gap-10">
          {/* Text */}
          <div className="max-w-md space-y-2 px-14">
            <h2 className="text-2xl font-bold leading-snug">
              Stay home & get your daily needs from our shop
            </h2>
            <p className="text-sm text-gray-300">
              Start Your Daily Shopping with <span className="text-green-400 font-medium">Nest Mart</span>
            </p>

            {/* Subscription Input */}
            <div className="flex items-center w-full bg-white rounded-full overflow-hidden shadow-sm mt-4">
              <div className="pl-4 text-gray-400">
                <Mail size={18} />
              </div>
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-2 py-2 text-sm text-gray-700 focus:outline-none"
              />
              <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 text-sm font-semibold rounded-r-full">
                Subscribe
              </button>
            </div>
          </div>

          {/* Right Image */}
          <img src={ctaGuy} alt="Delivery" className="w-80  sm:w-80 lg:w-120 absolute top-5 right-6 "  />
        </div>
      </section>

      {/* Feature Icons */}
      <section className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 px-4 sm:px-6 lg:px-8 py-8 text-center text-sm">
        <div className="bg-[#f9f9f9] p-4 rounded-xl shadow-sm">
          <BadgePercent className="mx-auto text-green-500" />
          <p className="font-medium text-gray-800 mt-2">Best prices & offers</p>
          <p className="text-gray-500 text-xs">Orders $50 or more</p>
        </div>
        <div className="bg-[#f9f9f9] p-4 rounded-xl shadow-sm">
          <Truck className="mx-auto text-blue-500" />
          <p className="font-medium text-gray-800 mt-2">Free delivery</p>
          <p className="text-gray-500 text-xs">24/7 amazing services</p>
        </div>
        <div className="bg-[#f9f9f9] p-4 rounded-xl shadow-sm">
          <Gift className="mx-auto text-yellow-500" />
          <p className="font-medium text-gray-800 mt-2">Great daily deal</p>
          <p className="text-gray-500 text-xs">When you sign up</p>
        </div>
        <div className="bg-[#f9f9f9] p-4 rounded-xl shadow-sm">
          <ShoppingBag className="mx-auto text-purple-500" />
          <p className="font-medium text-gray-800 mt-2">Wide assortment</p>
          <p className="text-gray-500 text-xs">Mega Discounts</p>
        </div>
        <div className="bg-[#f9f9f9] p-4 rounded-xl shadow-sm">
          <Undo2 className="mx-auto text-red-500" />
          <p className="font-medium text-gray-800 mt-2">Easy returns</p>
          <p className="text-gray-500 text-xs">Within 30 days</p>
        </div>
        <div className="bg-[#f9f9f9] p-4 rounded-xl shadow-sm">
          <Truck className="mx-auto text-orange-500" />
          <p className="font-medium text-gray-800 mt-2">Fast Shipping</p>
          <p className="text-gray-500 text-xs">Nationwide Coverage</p>
        </div>
      </section>
    </>
  );
}
