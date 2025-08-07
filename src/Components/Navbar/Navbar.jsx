import React from "react";
import {
  Menu,
  Search,
  Phone,
  User,
  Heart,
  ShoppingCart,
  ChevronDown,
} from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const Navbar = () => {
  return (
    <header className="w-full border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 transition-colors duration-300">
      {/* Top Navbar */}
      <div className="flex items-center justify-between px-4 py-3 lg:px-8">
        {/* Left: Mobile Menu + Logo */}
        <div className="flex items-center gap-4">
          <Menu className="lg:hidden cursor-pointer text-gray-700 dark:text-gray-200" />
          <div className="flex items-center gap-2">
            <img src={logo} alt="logo" className="w-14 h-14 rounded-full" />
            <div className="leading-tight">
              <p className="text-lg font-bold text-gray-800 dark:text-white">Foodzy</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">A Treasure of Tastes</p>
            </div>
          </div>
        </div>

        {/* Middle: Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-700 dark:text-gray-200">
          <Link to="/">Home</Link>
          <Link to="/category" className="flex items-center gap-1">
            Category <ChevronDown size={14} />
          </Link>
          <Link to="#" className="flex items-center gap-1">
            Products <ChevronDown size={14} />
          </Link>
          <Link to="#" className="flex items-center gap-1">
            Pages <ChevronDown size={14} />
          </Link>
          <Link to="#">Blog</Link>
          <Link to="#" className="flex items-center gap-1">
            Elements <ChevronDown size={14} />
          </Link>
        </nav>

        {/* Phone Number */}
        <div className="hidden lg:flex items-center gap-1 text-sm text-gray-500 dark:text-gray-300">
          <Phone size={16} />
          <span>+123 ( 456 ) 7890</span>
        </div>
      </div>

      {/* Search + Actions */}
      <div className="px-4 pb-3 lg:px-8 hidden lg:flex items-center justify-between gap-6">
        {/* Search Bar */}
        <div className="flex w-full max-w-4xl border border-gray-300 dark:border-gray-600 rounded overflow-hidden bg-white dark:bg-gray-800">
          <input
            type="text"
            placeholder="Search For Items..."
            className="px-3 py-2 w-full bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none"
          />
          <select className="text-sm border-l border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 px-3 outline-none">
            <option>All Categories</option>
            <option>Snacks</option>
            <option>Drinks</option>
          </select>
          <button className="bg-black hover:bg-gray-800 text-white px-4 flex items-center justify-center">
            <Search size={16} />
          </button>
        </div>

        {/* User Icons */}
        <div className="flex items-center gap-6 text-sm whitespace-nowrap text-gray-700 dark:text-gray-200">
          <Link to="/account" className="flex items-center gap-1 hover:text-red-500">
            <User size={18} />
            <span>Account</span>
          </Link>
          <Link to="/wishlist" className="flex items-center gap-1 hover:text-red-500">
            <Heart size={18} />
            <span>Wishlist</span>
          </Link>
          <Link to="/cart" className="flex items-center gap-1 hover:text-red-500">
            <ShoppingCart size={18} />
            <span>Cart</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;




