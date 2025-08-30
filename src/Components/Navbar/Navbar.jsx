// src/Components/Navbar/Navbar.jsx
import React, { useState, useEffect, useMemo } from "react";
import { Search, Phone, User, Heart, ShoppingCart, X, Menu as MenuIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import useCartStore from "../../Stores/useCartStore";
import useDataStore from "../../Stores/useDataStore"; // ✅ نستخدم الستور

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  // 🛒 عدّاد السلة
  const items = useCartStore((s) => s.items);
  const cartCount = useMemo(
    () => (items || []).reduce((sum, it) => sum + (Number(it.qty) || 0), 0),
    [items]
  );
  const badgeText = cartCount > 99 ? "99+" : String(cartCount || "");

  // 🔖 دوالّ وتاجز من الستور
  const getRecipeTags = useDataStore((s) => s.getRecipeTags);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  // const logout = () => {
  //   localStorage.removeItem("token");
  //   setIsLoggedIn(false);
  //   navigate("/login");
  // };

  // ✅ البحث في الـCategories (tags)
  const runCategorySearch = async () => {
    const q = String(searchTerm || "").trim();
    // حمّل التاجز (مع كاش داخلي 5 دقائق حسب كودك)
    await getRecipeTags(false);

    // خذ أحدث حالة من الستور مباشرة (علشان ما ننتظر إعادة الرندر)
    const tags = (useDataStore.getState().recipeTags || []).map((t) => String(t));
    if (tags.length === 0) {
      // لو ما وصلتنا تاجز لأي سبب، نكمل بالتوجيه باسم المدخل كما هو
      navigate(`/categories?tag=${encodeURIComponent(q || "Italian")}`);
      return;
    }

    const ql = q.toLowerCase();
    const exact = tags.find((t) => t.toLowerCase() === ql);
    const starts = tags.find((t) => t.toLowerCase().startsWith(ql));
    const includes = tags.find((t) => t.toLowerCase().includes(ql));
    const chosen = exact || starts || includes || (q || "Italian");

    navigate(`/categories?tag=${encodeURIComponent(chosen)}`);
    setIsMobileMenuOpen(false);
  };

  const onSearchKeyDown = (e) => {
    if (e.key === "Enter") runCategorySearch();
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
          <img src={logo} alt="logo" className="w-28 h-28 rounded-full" />
          <div className="leading-tight">
            <p className="text-lg font-bold text-gray-800 dark:text-white">Foodzy</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">A Treasure of Tastes</p>
          </div>
        </div>
        </div>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-700 dark:text-gray-200">
          <Link to="/">Home</Link>
          <Link to="/categories" className="flex items-center gap-1">Category</Link>
          <Link to="/products" className="flex items-center gap-1">Products</Link>
          <Link to="/faq" className="flex items-center gap-1">FAQ</Link>
          <Link to="/about" className="flex items-center gap-1">About</Link>
          <Link to="/blog">Blog</Link>
        </nav>

        {/* Phone */}
        <div className="hidden lg:flex items-center gap-1 text-sm text-gray-500 dark:text-gray-300">
          <Phone size={16} />
          <span>+123 (456) 7890</span>
        </div>
      </div>

      {/* Mobile Menu (ابقِه كما لديك) */}

      {/* Desktop Search + Actions */}
      <div className="px-4 pb-3 lg:px-8 hidden lg:flex items-center justify-between gap-6">
        {/* Search */}
        <div className="flex w-full max-w-4xl border border-gray-300 dark:border-gray-600 rounded overflow-hidden bg-white dark:bg-gray-800">
          <input
            type="text"
            placeholder="Search category (tag)… e.g. Italian, Dessert"
            className="px-3 py-2 w-full bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={onSearchKeyDown}
          />
          <button
            className="bg-black hover:bg-gray-800 text-white px-4 flex items-center justify-center"
            onClick={runCategorySearch}
            aria-label="Search Categories"
            title="Search categories"
          >
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

          <Link
            to="/cart"
            className="relative flex items-center gap-1 hover:text-red-500"
            aria-label={`Cart${cartCount ? ` (${cartCount})` : ""}`}
          >
            <ShoppingCart size={18} />
            <span>Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 h-5 min-w-[1.25rem] px-1 rounded-full text-[10px] leading-5 text-white bg-red-500 text-center font-semibold shadow">
                {badgeText}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

