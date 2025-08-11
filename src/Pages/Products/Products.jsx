import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Star, Plus, Tag } from "lucide-react";


// Swap these with your real images
import p1 from "../../assets/products/p1.png";
import p2 from "../../assets/products/p2.png";
import p3 from "../../assets/products/p3.png";
import p4 from "../../assets/products/p4.png";
import p5 from "../../assets/products/p5.png";
import p6 from "../../assets/products/p6.png";
import p7 from "../../assets/products/p7.png";
import p8 from "../../assets/products/p8.png";
import p9 from "../../assets/products/p9.png";

const CATEGORIES = [
  "All",
  "Milks & Dairies",
  "Coffes & Teas",
  "Pet Foods",
  "Meats",
  "Vegetables",
  "Fruits",
];

const PRODUCTS = [
  {
    id: 1,
    title: "Fresh organic villa farm lemon 500gm pack",
    category: "Fruits",
    vendor: "NestFood",
    tag: "Hot",
    price: 28.85,
    oldPrice: 32.8,
    rating: 4.0,
    image: p1,
  },
  {
    id: 2,
    title: "Best snacks with hazel nut pack 200gm",
    category: "Meats",
    vendor: "Stouffer",
    tag: "Sale",
    price: 52.85,
    oldPrice: 55.8,
    rating: 4.5,
    image: p2,
  },
  {
    id: 3,
    title: "Organic fresh vanilla farm watermelon 5kg",
    category: "Fruits",
    vendor: "StarKist",
    tag: "New",
    price: 48.85,
    oldPrice: 52.8,
    rating: 4.0,
    image: p3,
  },
  {
    id: 4,
    title: "Fresh organic apple 1kg simla marning",
    category: "Vegetables",
    vendor: "NestFood",
    price: 17.85,
    oldPrice: 19.8,
    rating: 4.0,
    image: p4,
  },
  {
    id: 5,
    title: "Blue Diamond Almonds Lightly Salted Vegetables",
    category: "Pet Foods",
    vendor: "NestFood",
    tag: "-18%",
    price: 23.85,
    oldPrice: 25.8,
    rating: 4.0,
    image: p5,
  },
  { id: 6, title: "Chobani Complete Vanilla Greek Yogurt", category: "Milks & Dairies", vendor: "NestFood", price: 54.85, oldPrice: 59.8, rating: 4.0, image: p6 },
  { id: 7, title: "Canada Dry Ginger Ale 2L Bottle", category: "Meats", vendor: "NestFood", price: 32.85, oldPrice: 33.8, rating: 4.2, image: p7 },
  { id: 8, title: "Gorton’s Beer Battered Fish Fillets", category: "Coffes & Teas", vendor: "Old El Paso", tag: "Hot", price: 23.85, oldPrice: 25.8, rating: 3.8, image: p8 },
  { id: 9, title: "Haagen-Dazs Caramel Cone Ice Cream", category: "Milks & Dairies", vendor: "Tyson", price: 22.85, oldPrice: 24.8, rating: 4.1, image: p9 },
];

function Rating({ value }) {
  const full = Math.round(value);
  return (
    <div className="flex items-center gap-0.5 text-yellow-500">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={14} fill={i < full ? "currentColor" : "none"} strokeWidth={1.5} />
      ))}
      <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">({value.toFixed(1)})</span>
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
        <img src={p.image} alt={p.title} className="w-full h-full  " />
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-400">{p.category}</p>
      <h3 className="mt-1 text-sm font-semibold text-gray-800 dark:text-white line-clamp-2">
        {p.title}
      </h3>

      <div className="mt-1">
        <Rating value={p.rating} />
      </div>

      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
        By <span className="text-green-600">{p.vendor}</span>
      </p>

      <div className="mt-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-green-600 font-semibold">${p.price.toFixed(2)}</span>
          <span className="text-xs text-gray-400 line-through">${p.oldPrice.toFixed(2)}</span>
        </div>
     <button
      onClick={() => {
        onAdd(p);           
        navigate("/cart"); 
      }}
      className="inline-flex items-center gap-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded-md px-3 py-1.5"
    >
      Add
    </button>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  const [active, setActive] = useState("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("popular");

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter(p =>
      (active === "All" || p.category === active) &&
      p.title.toLowerCase().includes(query.toLowerCase())
    );
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sort === "alpha") list.sort((a, b) => a.title.localeCompare(b.title));
    return list;
  }, [active, query, sort]);

  const handleAdd = (p) => {
    // hook this into your cart
    console.log("ADD TO CART:", p.id);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

      {/* Categories (tabs) */}
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

      {/* Tag filter demo (optional) */}
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

      {/* Grid */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filtered.map((p) => (
          <ProductCard key={p.id} p={p} onAdd={handleAdd} />
        ))}
      </div>
    </section>
  );
}
