// src/Pages/Cart/CartPage.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ChevronLeft, CheckCircle2 } from "lucide-react";
import useCartStore from "../../Stores/useCartStore"; // متجر السلة الوحيد
import { Helmet } from "react-helmet";
export default function CartPage() {
  // -------- Local cart (UI) ----------
  const items      = useCartStore((s) => s.items);
  const inc        = useCartStore((s) => s.inc);
  const dec        = useCartStore((s) => s.dec);
  const setQty     = useCartStore((s) => s.setQty);
  const removeItem = useCartStore((s) => s.removeItem);

  // -------- Server API (اختياري) ----------
  const apiError  = useCartStore((s) => s.error);

  const updateQty = (id, delta) => (delta > 0 ? inc(id) : dec(id));

  const subtotal = useMemo(
    () =>
      (items ?? []).reduce(
        (s, it) => s + (Number(it.price) || 0) * (Number(it.qty) || 0),
        0
      ),
    [items]
  );

  const shipping = subtotal > 200 ? 0 : 10;
  const total = subtotal + shipping;

  const isEmpty = !items || items.length === 0;

  // ---------- إشعار عند الإضافة ----------
  const totalQty = useMemo(
    () => (items ?? []).reduce((sum, it) => sum + (Number(it.qty) || 0), 0),
    [items]
  );
  const prevQtyRef = useRef(totalQty);
  const [toast, setToast] = useState({ show: false, msg: "" });
  const hideTimerRef = useRef(null);

  useEffect(() => {
    const prev = prevQtyRef.current;
    if (totalQty > prev) {
      // حاول نخمن آخر عنصر زادت كميته لعرض اسم المنتج (اختياري)
      let lastIncreasedTitle = "";
      if (Array.isArray(items) && items.length) {
        // ابحث عن عنصر له qty >= 1 وقد يكون جديد
        const maybeNew = items.find((it) => Number(it.qty) === 1 && prev === 0);
        if (maybeNew?.title) lastIncreasedTitle = maybeNew.title;
      }
      const msg = lastIncreasedTitle
        ? `Added "${lastIncreasedTitle}" to cart`
        : `Item added to cart`;

      setToast({ show: true, msg });

      // أخفِ الإشعار بعد 2.5 ثانية
      window.clearTimeout(hideTimerRef.current);
      hideTimerRef.current = window.setTimeout(() => {
        setToast((t) => ({ ...t, show: false }));
      }, 2500);
    }
    prevQtyRef.current = totalQty;
    return () => window.clearTimeout(hideTimerRef.current);
  }, [totalQty, items]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Helmet>
  <title>Your Cart</title>
  <meta name="description" content="View and manage the products you have added to your cart before checkout." />
  <meta property="og:title" content="Cart Page" />
</Helmet>

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

      <div className="mb-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:underline"
        >
          <ChevronLeft size={16} /> Continue Shopping
        </Link>
      </div>

      {/* Empty state */}
      {isEmpty && (
        <div className="rounded-xl border border-dashed border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-10 text-center">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Your cart is empty</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            Browse products and add what you like.
          </p>
          <Link
            to="/"
            className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md"
          >
            Start Shopping
          </Link>
        </div>
      )}

      {/* Cart Table */}
      {!isEmpty && (
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
                    {it.image ? (
                      <img
                        src={it.image}
                        alt={it.title}
                        className="w-14 h-14 object-contain rounded bg-white"
                        onError={(e) => (e.currentTarget.style.visibility = "hidden")}
                      />
                    ) : (
                      <div className="w-14 h-14 rounded bg-gray-100 dark:bg-gray-800" />
                    )}
                    <div>
                      <p className="font-medium text-gray-800 dark:text-white">{it.title}</p>
                    </div>
                  </div>

                  <div className="col-span-2 text-gray-700 dark:text-gray-300">
                    ${Number(it.price).toFixed(2)}
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

                      <input
                        aria-label="quantity"
                        className="w-12 text-center border-x border-gray-300 dark:border-gray-600 py-2 outline-none bg-transparent"
                        value={it.qty}
                        onChange={(e) =>
                          setQty(
                            it.id,
                            Math.max(
                              1,
                              Math.min(99, Number(String(e.target.value).replace(/\D/g, "")) || 1)
                            )
                          )
                        }
                      />

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
                    ${(Number(it.price) * Number(it.qty)).toFixed(2)}
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
                  {it.image ? (
                    <img
                      src={it.image}
                      alt={it.title}
                      className="w-16 h-16 object-contain rounded bg-white"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded bg-gray-100 dark:bg-gray-800" />
                  )}
                  <div className="flex-1">
                    <p className="font-medium text-gray-800 dark:text-white">{it.title}</p>
                    <div className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                      ${Number(it.price).toFixed(2)} each
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="inline-flex items-center rounded border border-gray-300 dark:border-gray-600">
                        <button onClick={() => updateQty(it.id, -1)} className="p-2">
                          <Minus size={14} />
                        </button>
                        <span className="px-3">{it.qty}</span>
                        <button onClick={() => updateQty(it.id, 1)} className="p-2">
                          <Plus size={14} />
                        </button>
                      </div>
                      <div className="font-semibold text-gray-800 dark:text-white">
                        ${(Number(it.price) * Number(it.qty)).toFixed(2)}
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
            <div className="w-full md:w-auto">
              <div className="flex items-center justify-end gap-3 md:gap-6 text-sm">
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
                  <button
                    disabled={isEmpty}
                    className="bg-red-500 hover:bg-red-600 disabled:opacity-60 text-white px-5 py-2 rounded-md font-medium"
                  >
                    Check Out
                  </button>
                </Link>
              </div>

              {apiError && (
                <div className="mt-2 text-xs text-red-600">
                  {apiError}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}



