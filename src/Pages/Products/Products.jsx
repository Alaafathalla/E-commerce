// src/Pages/Products/Products.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Star, Tag, CheckCircle2 } from "lucide-react";
import { useShallow } from "zustand/react/shallow";
import useDataStore from "../../Stores/useDataStore";
import useCartStore from "../../Stores/useCartStore";
import Helmet from "react-helmet";
const CATEGORIES = [
  "All",
  "Milks & Dairies",
  "Coffes & Teas",
  "Pet Foods",
  "Meats",
  "Vegetables",
  "Fruits",
];

function Rating({ value }) {
  const full = Math.round(value || 0);
  return (
    <div className="flex items-center gap-0.5 text-yellow-500">
      <Helmet>
  <title>Our Products</title>
  <meta name="description" content="Explore our wide range of products and services tailored to your needs." />
  <meta property="og:title" content="Our Products" />
</Helmet>

      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={14} fill={i < full ? "currentColor" : "none"} strokeWidth={1.5} />
      ))}
      <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
        ({Number(value || 0).toFixed(1)})
      </span>
    </div>
  );
}

function ProductCard({ p, onAdd }) {
  const navigate = useNavigate();
  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 hover:shadow-md transition">
      <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-800 mb-3">
        {p.tag && (
          <span className="absolute left-2 top-2 text-[11px] px-2 py-0.5 rounded-full bg-red-100 text-red-600">
            {p.tag}
          </span>
        )}
        <img
          src={p.image}
          alt={p.title}
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-400">{p.category}</p>
      <h3 className="mt-1 text-sm font-semibold text-gray-800 dark:text-white line-clamp-2">
        {p.title}
      </h3>

      <div className="mt-1">
        <Rating value={p.rating} />
      </div>

      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
        By <span className="text-green-600">{p.vendor || "Unknown"}</span>
      </p>

      <div className="mt-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-green-600 font-semibold">
            ${Number(p.price ?? 0).toFixed(2)}
          </span>
          {p.oldPrice != null && (
            <span className="text-xs text-gray-400 line-through">
              ${Number(p.oldPrice).toFixed(2)}
            </span>
          )}
        </div>
      </div>

      <div className="mt-3 flex gap-2">
        <button
          onClick={() => {
            onAdd?.(p);
            // navigate("/cart");
          }}
          className="flex-1 inline-flex items-center justify-center gap-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded-md px-3 py-1.5"
        >
          Add to Cart
        </button>

        <button
          onClick={() => navigate(`/products/${p.id}`)}
          className="flex-1 inline-flex items-center justify-center gap-1 text-sm bg-blue-500 hover:bg-blue-600 text-white  rounded-md px-3 py-1.5"
        >
          Details
        </button>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  const [active, setActive] = useState("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("popular");

  // توست (إشعار)
  const [toast, setToast] = useState({ show: false, msg: "" });
  const hideTimerRef = useRef(null);
  const showToast = (message) => {
    window.clearTimeout(hideTimerRef.current);
    setToast({ show: true, msg: message });
    hideTimerRef.current = window.setTimeout(() => {
      setToast((t) => ({ ...t, show: false }));
    }, 2500);
  };
  useEffect(() => () => window.clearTimeout(hideTimerRef.current), []);

  // جِب الداتا من الستور بتاع الـ recipes
  const { recipes, loading, error } = useDataStore(
    useShallow((s) => ({
      recipes: s.recipes,
      loading: s.loading,
      error: s.error,
    }))
  );
  const getMyRecipes = useDataStore((s) => s.getMyRecipes);

  // 🛒 أكشن إضافة للكارت من useCartStore
  const addItem = useCartStore((s) => s.addItem);

  // منع تكرار الفetch في Strict Mode
  const fetchedRef = useRef(false);
  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    getMyRecipes(); // أو getMyRecipes(true) لتجاهل الكاش
  }, [getMyRecipes]);

  // map recipes -> شكل الكارت
  const products = useMemo(
    () =>
      (recipes || []).map((r) => ({
        id: r.id,
        title: r.name,
        category: r.cuisine || r.mealType?.[0] || "Recipe",
        vendor: r.userId ? `User ${r.userId}` : "Unknown",
        tag: Number(r.rating ?? 0) >= 4.6 ? "Hot" : undefined,
        price: 0,
        oldPrice: null,
        rating: Number(r.rating ?? 0),
        image: r.image,
      })),
    [recipes]
  );

  // فلترة/ترتيب
  const filtered = useMemo(() => {
    let list = products.filter(
      (p) =>
        (active === "All" || p.category === active) &&
        p.title.toLowerCase().includes(query.toLowerCase())
    );
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "alpha") list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    return list;
  }, [products, active, query, sort]);

  // ✅ الهاندلر الصحيح للإضافة للكارت + إشعار
  const handleAdd = (p) => {
    addItem(
      {
        id: p.id,
        title: p.title ?? p.name,
        price: Number(p.price ?? 0),
        image: p.image,
      },
      1
    );
    showToast(`Added "${p.title ?? p.name}" to cart`);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Toast */}
      {toast.show && (
        <div
          className="fixed top-4 right-4 z-50 flex items-center gap-2 rounded-lg bg-green-600 text-white px-4 py-2 shadow-lg"
          role="status"
          aria-live="polite"
        >
          <CheckCircle2 size={18} />
          <span className="text-sm">{toast.msg}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          Popular Products
        </h2>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products…"
            className="px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm"
          />
          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm"
          >
            <option value="popular">Most popular</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="alpha">Alphabetical</option>
          </select>
        </div>
      </div>

      {/* Categories */}
      <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`px-3 py-1.5 rounded-full border ${
              active === c
                ? "bg-blue-500 text-white border-blue-500"
                : "border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Tags (شكل فقط) */}
      <div className="mt-3 flex flex-wrap gap-2 text-xs">
        {["Hot", "Sale", "New"].map((t) => (
          <span
            key={t}
            className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
          >
            <Tag size={12} /> {t}
          </span>
        ))}
      </div>

      {/* Loading / Error */}
      {loading && (
        <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">Loading products…</div>
      )}
      {error && <div className="mt-6 text-sm text-red-600">{error}</div>}

      {/* Grid */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filtered.map((p) => (
          <ProductCard key={p.id} p={p} onAdd={handleAdd} />
        ))}
      </div>

      {/* Empty state */}
      {!loading && !error && filtered.length === 0 && (
        <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">No products found.</div>
      )}
    </section>
  );
}








