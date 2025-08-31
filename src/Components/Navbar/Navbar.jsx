// src/Components/Navbar/Navbar.jsx
import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Search,
  Phone,
  User,
  Heart,
  ShoppingCart,
  X,
  Menu as MenuIcon,
} from "lucide-react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import logo from "../../assets/logo.png";
import useCartStore from "../../Stores/useCartStore";
import useDataStore from "../../Stores/useDataStore";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/categories", label: "Category" },
  { to: "/products", label: "Products" },
  { to: "/faq", label: "FAQ" },
  { to: "/about", label: "About" },
  { to: "/blog", label: "Blog" },
];

// صنف أساسي للروابط + مفعّل
const desktopLinkBase =
  "relative px-1 py-2 text-sm font-medium transition-colors duration-200 hover:text-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 rounded";
const desktopLinkActive =
  "text-red-600 after:content-[''] after:absolute after:left-0 after:-bottom-[6px] after:h-[2px] after:w-full after:bg-red-600";

const mobileLinkBase =
  "block rounded px-3 py-3 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const mobileMenuRef = useRef(null);
  const location = useLocation();
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

  // ✅ البحث في الـCategories (tags)
  const runCategorySearch = async () => {
    const q = String(searchTerm || "").trim();
    await getRecipeTags(false);

    const tags = (useDataStore.getState().recipeTags || []).map((t) => String(t));
    if (tags.length === 0) {
      navigate(`/categories?tag=${encodeURIComponent(q || "Italian")}`);
      setIsMobileMenuOpen(false);
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

  // 🔒 قفل تمرير الصفحة عند فتح القائمة الجانبية
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isMobileMenuOpen]);

  // ⎋ إغلاق بـ Esc
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // 🔁 أغلق القائمة عند تغيير المسار (بعد التنقل)
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // 🔳 إغلاق عند النقر خارج الدرج
  const onOverlayClick = (e) => {
    if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
      setIsMobileMenuOpen(false);
    }
  };

  // 🎞️ Variants لطراوة عناصر الروابط داخل الدرج
  const listVariants = {
    hidden: { opacity: 0, x: -8 },
    show: (i = 1) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.06 * i,
        duration: 0.22,
        ease: [0.22, 0.61, 0.36, 1],
      },
    }),
  };

  return (
    <header className="w-full border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 transition-colors duration-300">
      {/* ======= Top Bar (Desktop paddings مضبوطة) ======= */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3 lg:py-4">
          {/* Logo & Toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              className="lg:hidden text-gray-700 dark:text-gray-200"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? <X /> : <MenuIcon />}
            </button>

            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="logo" className="w-28 h-28 rounded-full" />
              <div className="leading-tight">
                <p className="text-lg font-bold text-gray-800 dark:text-white">Foodzy</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">A Treasure of Tastes</p>
              </div>
            </Link>
          </div>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-700 dark:text-gray-200">
            {NAV_LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `${desktopLinkBase} ${isActive ? desktopLinkActive : "text-gray-700 dark:text-gray-200"}`
                }
                end={l.to === "/"}
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          {/* Phone */}
          <div className="hidden lg:flex items-center gap-2 text-sm text-gray-500 dark:text-gray-300">
            <Phone size={16} />
            <span>+123 (456) 7890</span>
          </div>
        </div>
      </div>

      {/* ======= Desktop Search + Actions (حاوية ومسافات أوضح) ======= */}
      <div className="hidden lg:block border-t border-gray-200/70 dark:border-gray-700/70">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-8 py-3">
            {/* Search */}
            <div className="flex w-full max-w-4xl border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden bg-white dark:bg-gray-800">
              <input
                type="text"
                placeholder="Search category (tag)… e.g. Italian, Dessert"
                className="px-3 py-2.5 w-full bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={onSearchKeyDown}
                aria-label="Search categories"
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
            <div className="flex items-center gap-8 text-sm text-gray-700 dark:text-gray-200 whitespace-nowrap">
              {!isLoggedIn ? (
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `${desktopLinkBase} ${isActive ? "text-red-600" : ""} flex items-center gap-1`
                  }
                >
                  <User size={18} />
                  <span>Login</span>
                </NavLink>
              ) : (
                <NavLink
                  to="/account"
                  className={({ isActive }) =>
                    `${desktopLinkBase} ${isActive ? "text-red-600" : ""} flex items-center gap-1`
                  }
                >
                  <User size={18} />
                  <span>Account</span>
                </NavLink>
              )}

              <NavLink
                to="/wishlist"
                className={({ isActive }) =>
                  `${desktopLinkBase} ${isActive ? "text-red-600" : ""} flex items-center gap-1`
                }
              >
                <Heart size={18} />
                <span>Wishlist</span>
              </NavLink>

              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  `${desktopLinkBase} ${isActive ? "text-red-600" : ""} relative flex items-center gap-1`
                }
                aria-label={`Cart${cartCount ? ` (${cartCount})` : ""}`}
              >
                <ShoppingCart size={18} />
                <span>Cart</span>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-3 h-5 min-w-[1.25rem] px-1 rounded-full text-[10px] leading-5 text-white bg-red-500 text-center font-semibold shadow">
                    {badgeText}
                  </span>
                )}
              </NavLink>
            </div>
          </div>
        </div>
      </div>

      {/* ======== Mobile Menu / Drawer (Framer Motion) ======== */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 0.61, 0.36, 1] }}
              onClick={onOverlayClick}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[1px] lg:hidden"
            />

            {/* Drawer */}
            <motion.aside
              key="drawer"
              id="mobile-menu"
              ref={mobileMenuRef}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              initial={{ x: "-100%", opacity: 0.6, filter: "blur(2px)" }}
              animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
              exit={{ x: "-100%", opacity: 0.6, filter: "blur(2px)" }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 28,
                mass: 0.9,
              }}
              className="fixed z-50 inset-y-0 left-0 w-[85%] max-w-sm bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 lg:hidden"
            >
              {/* Header inside drawer */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <Link to="/" className="flex items-center gap-2">
                  <img src={logo} alt="logo" className="w-10 h-10 rounded-full" />
                  <span className="text-base font-bold">Foodzy</span>
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close menu"
                  className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <X />
                </button>
              </div>

              {/* Search (mobile) */}
              <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <div className="flex w-full border border-gray-300 dark:border-gray-600 rounded overflow-hidden bg-white dark:bg-gray-800">
                  <input
                    type="text"
                    placeholder="Search category…"
                    className="px-3 py-2 w-full bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={onSearchKeyDown}
                    aria-label="Search categories (mobile)"
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
              </div>

              {/* Nav links with gentle stagger */}
              <nav className="px-2 py-2">
                {NAV_LINKS.map((l, idx) => (
                  <motion.div
                    key={l.to}
                    custom={idx + 1}
                    initial="hidden"
                    animate="show"
                    variants={listVariants}
                  >
                    <NavLink
                      to={l.to}
                      className={({ isActive }) =>
                        `${mobileLinkBase} ${isActive ? "text-red-600" : ""}`
                      }
                      onClick={() => setIsMobileMenuOpen(false)}
                      end={l.to === "/"}
                    >
                      {l.label}
                    </NavLink>
                  </motion.div>
                ))}
              </nav>

              {/* Actions / Phone */}
              <div className="mt-auto px-4 py-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <NavLink
                    to={isLoggedIn ? "/account" : "/login"}
                    className={({ isActive }) =>
                      `flex items-center gap-2 text-sm hover:text-red-500 ${isActive ? "text-red-600" : ""}`
                    }
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User size={18} />
                    <span>{isLoggedIn ? "Account" : "Login"}</span>
                  </NavLink>

                  <NavLink
                    to="/wishlist"
                    className={({ isActive }) =>
                      `flex items-center gap-2 text-sm hover:text-red-500 ${isActive ? "text-red-600" : ""}`
                    }
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Heart size={18} />
                    <span>Wishlist</span>
                  </NavLink>

                  <NavLink
                    to="/cart"
                    className={({ isActive }) =>
                      `relative flex items-center gap-2 text-sm hover:text-red-500 ${isActive ? "text-red-600" : ""}`
                    }
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <ShoppingCart size={18} />
                    <span>Cart</span>
                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-2 h-5 min-w-[1.25rem] px-1 rounded-full text-[10px] leading-5 text-white bg-red-500 text-center font-semibold shadow">
                        {badgeText}
                      </span>
                    )}
                  </NavLink>
                </div>

                <div className="mt-4 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-300">
                  <Phone size={16} />
                  <span>+123 (456) 7890</span>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;


