import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ChevronLeft } from "lucide-react";

// swap with your real images
import p1 from "../../assets/cart/1.png";
import p2 from "../../assets/cart/2.png";
import p3 from "../../assets/cart/3.png";
import p4 from "../../assets/cart/4.png";
import p5 from "../../assets/cart/5.png";
import cart6 from "../../assets/cart/6.png";
import cart7 from "../../assets/cart/7.png";
import cart8 from "../../assets/cart/8.png";
import cart9 from "../../assets/cart/9.png";

const initialItems = [
  { id: 1, title: "Organic Lemon", price: 56, image: p1, qty: 1 },
  { id: 2, title: "Apple Juice", price: 75, image: p2, qty: 1 },
  { id: 3, title: "Watermelon 5kg Pack", price: 48, image: p3, qty: 1 },
  { id: 4, title: "Pomegranate 5 kg pack", price: 90, image: p4, qty: 1 },
  { id: 5, title: "Organic Peach Fruits", price: 50, image: p5, qty: 1 },
];

export default function CartPage() {
  const [items, setItems] = useState(initialItems);

  const updateQty = (id, delta) =>
    setItems((prev) =>
      prev.map((it) =>
        it.id === id ? { ...it, qty: Math.max(1, it.qty + delta) } : it
      )
    );

  const removeItem = (id) =>
    setItems((prev) => prev.filter((it) => it.id !== id));

  const subtotal = useMemo(
    () => items.reduce((s, it) => s + it.price * it.qty, 0),
    [items]
  );

  // mock shipping/discounts
  const shipping = subtotal > 200 ? 0 : 10;
  const total = subtotal + shipping;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Cart Table */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm overflow-hidden">
        <div className="hidden md:grid grid-cols-12 bg-gray-50 dark:bg-gray-800 text-xs font-semibold text-gray-600 dark:text-gray-300 px-4 py-3">
          <div className="col-span-6">Product</div>
          <div className="col-span-2">Price</div>
          <div className="col-span-2">Quantity</div>
          <div className="col-span-1">Total</div>
          <div className="col-span-1 text-center">Action</div>
        </div>

        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {items.map((it) => (
            <li key={it.id} className="px-4 md:px-4 py-4">
              {/* Desktop row */}
              <div className="hidden md:grid grid-cols-12 items-center gap-4">
                <div className="col-span-6 flex items-center gap-4">
                  <img
                    src={it.image}
                    alt={it.title}
                    className="w-14 h-14 object-contain rounded bg-white"
                  />
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white">
                      {it.title}
                    </p>
                  </div>
                </div>

                <div className="col-span-2 text-gray-700 dark:text-gray-300">
                  ${it.price.toFixed(2)}
                </div>

                <div className="col-span-2">
                  <div className="inline-flex items-center rounded border border-gray-300 dark:border-gray-600">
                    <button
                      aria-label="decrease"
                      onClick={() => updateQty(it.id, -1)}
                      className="p-2 hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="px-4 py-2 text-sm">{it.qty}</span>
                    <button
                      aria-label="increase"
                      onClick={() => updateQty(it.id, 1)}
                      className="p-2 hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                <div className="col-span-1 font-semibold text-gray-800 dark:text-white">
                  ${(it.price * it.qty).toFixed(2)}
                </div>

                <div className="col-span-1 flex justify-center">
                  <button
                    onClick={() => removeItem(it.id)}
                    className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
                    aria-label="remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {/* Mobile card */}
              <div className="md:hidden flex items-start gap-3">
                <img
                  src={it.image}
                  alt={it.title}
                  className="w-16 h-16 object-contain rounded bg-white"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-800 dark:text-white">
                    {it.title}
                  </p>
                  <div className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                    ${it.price.toFixed(2)} each
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="inline-flex items-center rounded border border-gray-300 dark:border-gray-600">
                      <button
                        onClick={() => updateQty(it.id, -1)}
                        className="p-2"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="px-3">{it.qty}</span>
                      <button
                        onClick={() => updateQty(it.id, 1)}
                        className="p-2"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <div className="font-semibold text-gray-800 dark:text-white">
                      ${(it.price * it.qty).toFixed(2)}
                    </div>
                    <button
                      onClick={() => removeItem(it.id)}
                      className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Footer actions */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-4 py-4 bg-gray-50 dark:bg-gray-800">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:underline"
          >
            <ChevronLeft size={16} /> Continue Shopping
          </a>

          <div className="w-full md:w-auto">
            <div className="flex items-center justify-end gap-6 text-sm">
              <div className="text-gray-600 dark:text-gray-300">
                Subtotal:{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                Shipping:{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  ${shipping.toFixed(2)}
                </span>
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                Total:{" "}
                <span className="font-bold text-gray-900 dark:text-white">
                  ${total.toFixed(2)}
                </span>
              </div>
    
<Link to="/checkout">
  <button className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-md font-medium">
    Check Out
  </button>
</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Products */}
      <PopularProducts />
    </section>
  );
}

/* ---------------- Popular products (static demo) ----------------- */
function PopularProducts() {
  const products = [
    {
      id: 101,
      title: "Best snacks with hazel nut mix pack 200gm",
      price: 120.25,
      oldPrice: 123.0,
      image: cart6,
        
      tag: "Snacks",
    },
    {
      id: 102,
      title: "Sweet snacks crunchy nut mix 250gm pack",
      price: 100.0,
      oldPrice: 110.0,
      image:
       cart7,
      tag: "Snacks",
    },
    {
      id: 103,
      title: "Best snacks with hazel nut mix pack 200gm",
      price: 120.25,
      oldPrice: 123.0,
      image:
      cart8,
      tag: "Snacks",
    },
    {
      id: 104,
      title: "Sweet snacks crunchy nut mix 250gm pack",
      price: 100.0,
      oldPrice: 110.0,
      image:
      cart9,
      tag: "Snacks",
    },
  ];

  return (
    <section className="mt-14">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          Popular Products
        </h2>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incidunt ut labore et viverra accumsan lacus vel
          facilisis.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {products.map((p) => (
          <div
            key={p.id}
            className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 hover:shadow-md transition"
          >
            <div className=" w-full rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-800">
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="mt-3">
              <p className="text-xs text-gray-500 dark:text-gray-400">{p.tag}</p>
              <h3 className="mt-1 text-sm font-semibold text-gray-800 dark:text-white line-clamp-2">
                {p.title}
              </h3>

              <div className="mt-2 flex items-center gap-2">
                <span className="text-red-500 font-semibold">
                  ${p.price.toFixed(2)}
                </span>
                <span className="text-xs text-gray-400 line-through">
                  ${p.oldPrice.toFixed(2)}
                </span>
              </div>

              <button className="mt-3 w-full rounded-md border border-gray-200 dark:border-gray-700 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
