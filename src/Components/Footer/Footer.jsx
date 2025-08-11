import React from "react";
import logo from "../../assets/logo.png";
import img1 from "../../assets/footer/1.png";
import img2 from "../../assets/footer/2.png";
import img3 from "../../assets/footer/3.png";
import img4 from "../../assets/footer/4.png";
import img5 from "../../assets/footer/5.png";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#fdfdfd] to-[#f4f4f4] dark:from-gray-900 dark:to-gray-800 text-gray-700 dark:text-gray-300 border-t border-gray-200 dark:border-gray-700 shadow-inner transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Logo + Info */}
        <div className="space-y-4 text-start">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Foody" className="w-12 h-12 rounded-full" />
            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">Foodzy</h2>
              <p className="text-sm text-gray-400">A Product of Tomato</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed">
            FoodTree is the biggest market of grocery products. Get your daily
            needs from our store.
          </p>
          <div className="flex items-start gap-3 text-sm">
            <FaMapMarkerAlt className="mt-1 text-red-500" />
            <p>51 Green St. Huntington chalo beach ontario, NY 11746 KY 4783, USA.</p>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <FaEnvelope className="text-red-500" />
            <p>example@email.com</p>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <FaPhoneAlt className="text-red-500" />
            <p>+91 123 4567890</p>
          </div>
        </div>

        {/* Company Links */}
        <div className="space-y-4 text-start">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Company</h3>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            {[
              "About Us",
              "Delivery Information",
              "Privacy Policy",
              "Terms & Conditions",
              "Contact Us",
              "Support Center",
            ].map((item, i) => (
              <li key={i} className="hover:text-red-500 transition">{item}</li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div className="space-y-4 text-start">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Category</h3>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            {[
              "Dairy & Bakery",
              "Fruits & Vegetable",
              "Snack & Spice",
              "Juice & Drinks",
              "Chicken & Meat",
              "Fast Food",
            ].map((item, i) => (
              <li key={i} className="hover:text-red-500 transition">{item}</li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Subscribe Our Newsletter</h3>
          <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-full overflow-hidden shadow-sm">
            <input
              type="text"
              placeholder="Search here.."
              className="w-full px-4 py-2 text-sm outline-none bg-white dark:bg-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
            />
            <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 transition">
              ➤
            </button>
          </div>

          {/* Social Icons */}
          <div className="flex space-x-4">
            {[FaFacebookF, FaTwitter, FaInstagram].map((Icon, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-700 p-3 rounded-2xl shadow hover:text-red-500 transition text-black dark:text-white cursor-pointer"
              >
                <Icon className="text-xl" />
              </div>
            ))}
          </div>

          {/* Gallery Images */}
          <div className="grid grid-cols-5 gap-2">
            {[img1, img2, img3, img4, img5].map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`thumb-${index + 1}`}
                className="w-full h-14 object-cover rounded-lg shadow"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="text-center text-sm text-gray-500 dark:text-gray-400 py-4 border-t border-gray-200 dark:border-gray-700 mt-8">
        © 2025 <span className="text-red-500 font-medium">Foodzy</span>, All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;


