import React from 'react';
import { BadgePercent, Truck, Gift, ShoppingBag, Undo2, Mail } from 'lucide-react';
import ctaGuy from '../../assets/home/delivery.png';

export default function CTASection() {
  return (
    <>
      {/* CTA Banner */}
      <section className="relative min-h-[30vh] bg-gradient-to-r from-[#686964] to-[#2c2d2a] text-white rounded-2xl mx-4 sm:mx-6 lg:mx-8 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between py-12 gap-10">
          {/* Text */}
          <div className="max-w-md space-y-2 px-6 sm:px-14">
            <h2 className="text-2xl font-bold leading-snug">
              Stay home & get your daily needs from our shop
            </h2>
            <p className="text-sm text-gray-300 dark:text-gray-300">
              Start Your Daily Shopping with <span className="text-green-400 font-medium">Nest Mart</span>
            </p>

            {/* Subscription Input */}
            <div className="flex items-center w-full bg-white dark:bg-gray-800 rounded-full overflow-hidden shadow-sm mt-4">
              <div className="pl-4 text-gray-400">
                <Mail size={18} />
              </div>
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-2 py-2 text-sm text-gray-700 dark:text-white bg-white dark:bg-gray-800 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none"
              />
              <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 text-sm font-semibold rounded-r-full transition">
                Subscribe
              </button>
            </div>
          </div>

          {/* Right Image */}
          <img
            src={ctaGuy}
            alt="Delivery"
            className="hidden lg:block w-80 lg:w-96 absolute top-5 right-6"
          />
        </div>
      </section>

      {/* Feature Icons */}
      <section className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 px-4 sm:px-6 lg:px-8 py-8 text-center text-sm">
        {[
          { icon: <BadgePercent className="mx-auto text-green-500" />, title: "Best prices & offers", desc: "Orders $50 or more" },
          { icon: <Truck className="mx-auto text-blue-500" />, title: "Free delivery", desc: "24/7 amazing services" },
          { icon: <Gift className="mx-auto text-yellow-500" />, title: "Great daily deal", desc: "When you sign up" },
          { icon: <ShoppingBag className="mx-auto text-purple-500" />, title: "Wide assortment", desc: "Mega Discounts" },
          { icon: <Undo2 className="mx-auto text-red-500" />, title: "Easy returns", desc: "Within 30 days" },
          { icon: <Truck className="mx-auto text-orange-500" />, title: "Fast Shipping", desc: "Nationwide Coverage" },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-[#f9f9f9] dark:bg-gray-800 p-4 rounded-xl shadow-sm transition-colors"
          >
            {item.icon}
            <p className="font-medium text-gray-800 dark:text-white mt-2">{item.title}</p>
            <p className="text-gray-500 dark:text-gray-400 text-xs">{item.desc}</p>
          </div>
        ))}
      </section>
    </>
  );
}

