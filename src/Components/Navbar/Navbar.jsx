import React, { useState, useEffect } from "react";
import {
  Menu as HeadlessMenu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import {
  Search,
  Phone,
  User,
  Heart,
  ShoppingCart,
  ChevronDown,
  X,
  Menu as MenuIcon, // lucide menu icon
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <header className="w-full border-b border-gray-200 dark:border-gray-700 px-4 lg:px-40 mx-auto bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 transition-colors duration-300">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-3 lg:px-8">
        {/* Logo & Toggle */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsMobileMenuOpen((v) => !v)}
            className="lg:hidden text-gray-700 dark:text-gray-200"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X /> : <MenuIcon />}
          </button>

          <div className="flex items-center gap-2">
            <img src={logo} alt="logo" className="w-14 h-14 rounded-full" />
            <div className="leading-tight">
              <p className="text-lg font-bold text-gray-800 dark:text-white">Foodzy</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">A Treasure of Tastes</p>
            </div>
          </div>
        </div>

        {/* Desktop Links (unchanged style) */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-700 dark:text-gray-200">
          <Link to="/">Home</Link>
          <Link to="/category" className="flex items-center gap-1">Category</Link>
          <Link to="/products" className="flex items-center gap-1">Products</Link>

          {/* Headless UI dropdown for Pages */}
          <HeadlessMenu as="div" className="relative inline-block">
            <MenuButton className="inline-flex w-auto justify-center gap-x-1.5 px-2 py-1.5 text-sm font-semibold text-gray-700 dark:text-gray-200">
              Pages
              <ChevronDown aria-hidden="true" className="-mr-1 size-4 text-gray-400" />
            </MenuButton>

            <MenuItems
              transition
              className="absolute right-0 z-10 mt-1 w-32 origin-top-right divide-y divide-white/10 rounded-md bg-gray-800 outline-1 -outline-offset-1 outline-white/10 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
            >
              <div className="py-0.5">
                <MenuItem>
                  <Link
                    to="/faq"
                    className="block px-3 py-1 text-sm text-gray-300 data-focus:bg-white/5 data-focus:text-white data-focus:outline-hidden"
                  >
                    FAQ
                  </Link>
                </MenuItem>
              </div>
              <div className="py-0.5">
                <MenuItem>
                  <Link
                    to="/about"
                    className="block px-3 py-1 text-sm text-gray-300 data-focus:bg-white/5 data-focus:text-white data-focus:outline-hidden"
                  >
                    About Us
                  </Link>
                </MenuItem>
              </div>
            </MenuItems>
          </HeadlessMenu>

          <Link to="/blog">Blog</Link>
          <Link to="#" className="flex items-center gap-1">Elements</Link>
        </nav>

        {/* Phone */}
        <div className="hidden lg:flex items-center gap-1 text-sm text-gray-500 dark:text-gray-300">
          <Phone size={16} />
          <span>+123 (456) 7890</span>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden px-4 py-3 space-y-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 text-sm font-medium max-h-[70vh] overflow-y-auto">
          <Link to="/" className="block" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <Link to="/category" className="block" onClick={() => setIsMobileMenuOpen(false)}>Category</Link>
          <Link to="/products" className="block" onClick={() => setIsMobileMenuOpen(false)}>Products</Link>

          {/* Mobile Pages dropdown (Headless UI) */}
          <HeadlessMenu as="div" className="relative inline-block">
            <MenuButton className="inline-flex w-auto justify-center gap-x-1.5 px-2 py-1.5 text-sm font-semibold text-gray-700 dark:text-gray-200">
              Pages
              <ChevronDown aria-hidden="true" className="-mr-1 size-4 text-gray-400" />
            </MenuButton>
            <MenuItems
              className="absolute left-0 mt-1 w-40 origin-top-left rounded-md bg-gray-800 border border-gray-700 shadow-lg z-50"
            >
              <div className="py-1">
                <MenuItem>
                  <Link
                    to="/faq"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-1.5 text-sm text-gray-300 data-focus:bg-white/5 data-focus:text-white"
                  >
                    FAQ
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    to="/about"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-1.5 text-sm text-gray-300 data-focus:bg-white/5 data-focus:text-white"
                  >
                    About Us
                  </Link>
                </MenuItem>
              </div>
            </MenuItems>
          </HeadlessMenu>

          <Link to="/blog" className="block" onClick={() => setIsMobileMenuOpen(false)}>Blog</Link>
          <Link to="#" className="block" onClick={() => setIsMobileMenuOpen(false)}>Elements</Link>

          <div className="pt-2 border-t dark:border-gray-700 space-y-2">
            {!isLoggedIn ? (
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="block text-red-600">Login</Link>
            ) : (
              <button onClick={logout} className="block text-left text-red-600 w-full">Logout</button>
            )}
            <Link to="/wishlist" className="block" onClick={() => setIsMobileMenuOpen(false)}>Wishlist</Link>
            <Link to="/cart" className="block" onClick={() => setIsMobileMenuOpen(false)}>Cart</Link>
          </div>
        </div>
      )}

      {/* Desktop Search + Actions (unchanged) */}
      <div className="px-4 pb-3 lg:px-8 hidden lg:flex items-center justify-between gap-6">
        {/* Search */}
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

        {/* Actions */}
        <div className="flex items-center gap-6 text-sm text-gray-700 dark:text-gray-200 whitespace-nowrap">
          {!isLoggedIn ? (
            <Link to="/login" className="flex items-center gap-1 hover:text-red-500">
              <User size={18} />
              <span>Login</span>
            </Link>
          ) : (
            <Link to="/account" className="flex items-center gap-1 hover:text-red-500">
              <User size={18} />
              <span>Account</span>
            </Link>
          )}
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






