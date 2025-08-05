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
    <header className="w-full border-b bg-white">
      {/* Top Navbar */}
      <div className="flex items-center justify-between px-4 py-3 lg:px-8">
        <div className="flex items-center mx-2 gap-4">
          <Menu className="lg:hidden cursor-pointer" />
          <div className="flex items-center mx-2 gap-2">
            <img src={logo} alt="logo" className="w-20 h-20" />
            <div className="leading-tight">
              <p className="text-lg font-bold">Foodzy</p>
              <p className="text-xs text-gray-500">A Treasure of Tastes</p>
            </div>
          </div>
        </div>

        {/* Middle: Nav Links */}
        <nav className="hidden mx-2 lg:flex items-center gap-6 text-sm font-medium text-gray-700">
          <Link to="/">Home</Link>
          <Link to="/category" className="flex mx-2 items-center gap-1">
            Category <ChevronDown size={14} />
          </Link>
          <Link to="#" className="flex mx-2 items-center gap-1">
            Products <ChevronDown size={14} />
          </Link>
          <Link to="#" className="flex mx-2 items-center gap-1">
            Pages <ChevronDown size={14} />
          </Link>
          <Link to="#">Blog</Link>
          <Link to="#" className="flex mx-2 items-center gap-1">
            Elements <ChevronDown size={14} />
          </Link>
        </nav>

        <div className="hidden mx-2  lg:flex items-center gap-1 text-sm text-gray-500">
          <Phone size={16} />
          <span>+123 ( 456 ) 7890</span>
        </div>
      </div>


      <div className="px-4 pb-3 mx-2 lg:px-8 hidden lg:flex items-center justify-between gap-6">
        <div className="flex w-full mx-2 max-w-4xl border rounded overflow-hidden">
          <input
            type="text"
            placeholder="Search For Items..."
            className="px-3 py-2 w-full focus:outline-none"
          />
          <select className="text-sm border-l outline-none px-3">
            <option>All Categories</option>
            <option>Snacks</option>
            <option>Drinks</option>
          </select>
          <button className="bg-black text-white px-4 flex items-center justify-center">
            <Search size={16}  />
          </button>
        </div>


        <div className="flex items-center gap-6 text-sm text-gray-700 whitespace-nowrap">
          <Link to="/account" className="flex items-center gap-1">
            <User size={18} />
            <span>Account</span>
          </Link>
          <Link to="/wishlist" className="flex items-center gap-1">
            <Heart size={18} />
            <span>Wishlist</span>
          </Link>
          <Link to="/cart" className="flex items-center gap-1">
            <ShoppingCart size={18} />
            <span>Cart</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;



