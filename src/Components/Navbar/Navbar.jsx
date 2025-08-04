// src/components/Navbar.jsx
import { Menu, Phone, Search, User, Heart, ShoppingCart, ChevronDown } from "lucide-react";

const Navbar = () => {
  return (
    <header className="w-full border-b text-sm">
      <div className="flex items-center justify-between px-4 py-2 md:px-8">
        {/* Left: Hamburger + Logo */}
        <div className="flex items-center gap-4">
          <Menu className="md:hidden" />
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="logo" className="w-10 h-10" />
            <div>
              <p className="text-lg font-bold leading-none">Foodzy</p>
              <p className="text-xs text-gray-500">A Treasure of Tastes</p>
            </div>
          </div>
        </div>

        {/* Center: Nav + Search */}
        <div className="hidden lg:flex flex-1 flex-col gap-2">
          {/* Top Nav Links */}
          <div className="flex items-center justify-center gap-6 text-gray-700 text-sm font-medium">
            <a href="#">Home</a>
            <a href="#" className="flex items-center gap-1">Category <ChevronDown size={16} /></a>
            <a href="#" className="flex items-center gap-1">Products <ChevronDown size={16} /></a>
            <a href="#" className="flex items-center gap-1">Pages <ChevronDown size={16} /></a>
            <a href="#">Blog</a>
            <a href="#" className="flex items-center gap-1">Elements <ChevronDown size={16} /></a>
          </div>

          {/* Search */}
          <div className="flex justify-center">
            <div className="flex border rounded overflow-hidden w-[500px]">
              <input type="text" placeholder="Search For Items..." className="px-3 py-2 w-full focus:outline-none" />
              <select className="text-sm border-l outline-none px-3">
                <option>All Categories</option>
                <option>Beverages</option>
                <option>Snacks</option>
              </select>
              <button className="bg-black text-white px-3 flex items-center justify-center">
                <Search size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Right: Contact + Icons */}
        <div className="flex items-center gap-5">
          <div className="hidden lg:flex items-center gap-1 text-xs text-gray-600">
            <Phone size={16} />
            <span>+123 ( 456 ) 7890</span>
          </div>
          <div className="flex items-center gap-4 text-gray-700">
            <div className="flex items-center gap-1">
              <User size={18} />
              <span className="text-xs hidden md:inline">Account</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart size={18} />
              <span className="text-xs hidden md:inline">Wishlist</span>
            </div>
            <div className="flex items-center gap-1">
              <ShoppingCart size={18} />
              <span className="text-xs hidden md:inline">Cart</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
