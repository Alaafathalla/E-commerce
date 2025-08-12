import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function SingleProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [prod, setProd] = useState(null);
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        setLoading(true);
        setErr(null);
        const { data } = await axios.get(`https://dummyjson.com/products/${id}`);
        if (!isMounted) return;
        setProd(data);
        setActiveImg(0);
      } catch (e) {
        console.error(e);
        setErr("Failed to load product.");
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [id]);

  const gallery = useMemo(() => {
    const imgs = prod?.images?.length ? prod.images : [];
    return imgs.length ? imgs : [prod?.thumbnail || ""];
  }, [prod]);

  const discountPct = prod?.discountPercentage ?? 0;
  const price = Number(prod?.price ?? 0);
  const discounted =
    discountPct > 0 ? +(price * (1 - discountPct / 100)).toFixed(2) : price;

  const inc = () => setQty((q) => Math.min(q + 1, 99));
  const dec = () => setQty((q) => Math.max(q - 1, 1));

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 rounded-md border px-3 py-1.5 text-sm text-gray-700 dark:text-gray-200"
      >
        ← Back
      </button>

      {loading && <div className="rounded-xl bg-white p-6 ring-1 ring-gray-100">Loading…</div>}
      {err && <div className="rounded-xl bg-white p-6 ring-1 ring-red-200 text-red-700">{err}</div>}

      {!loading && !err && prod && (
        <>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Gallery */}
            <div>
              <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                <img
                  src={gallery[activeImg]}
                  alt={prod.title}
                  className="mx-auto max-h-96 object-contain"
                  onError={(e) => (e.currentTarget.src = prod.thumbnail || "")}
                />
              </div>

              <div className="mt-4 flex gap-3 overflow-x-auto">
                {gallery.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`h-20 w-24 shrink-0 rounded-xl border p-1 transition ${
                      activeImg === i ? "border-blue-500 ring-2 ring-blue-200" : "border-gray-200"
                    }`}
                  >
                    <img
                      src={src}
                      alt={`thumb-${i}`}
                      className="h-full w-full object-contain"
                      onError={(e) => (e.currentTarget.src = prod.thumbnail || "")}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="space-y-3">
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                {prod.title}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">{prod.description}</p>

              <div className="flex items-center gap-2 pt-1 text-amber-500">
                {"★".repeat(Math.round(prod.rating || 0))}
                {"☆".repeat(5 - Math.round(prod.rating || 0))}
                <span className="text-xs text-gray-500">({prod.rating ?? 0} / 5)</span>
              </div>

              <ul className="mt-2 grid grid-cols-1 gap-1 text-sm">
                <li className="flex">
                  <span className="w-28 shrink-0 text-gray-500">Brand</span>
                  <span className="text-gray-700">: {prod.brand || "—"}</span>
                </li>
                <li className="flex">
                  <span className="w-28 shrink-0 text-gray-500">Category</span>
                  <span className="text-gray-700">: {prod.category || "—"}</span>
                </li>
                <li className="flex">
                  <span className="w-28 shrink-0 text-gray-500">Stock</span>
                  <span className="text-gray-700">: {prod.stock ?? "—"}</span>
                </li>
              </ul>

              <div className="flex items-end gap-3 pt-3">
                <span className="text-2xl font-bold text-blue-600">
                  ${Number(discounted).toFixed(2)}
                </span>
                {discountPct > 0 && (
                  <>
                    <span className="text-sm text-gray-400 line-through">
                      ${Number(price).toFixed(2)}
                    </span>
                    <span className="rounded bg-green-100 px-2 py-0.5 text-xs text-green-700">
                      -{discountPct}%
                    </span>
                  </>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <div className="flex items-center rounded-lg border border-gray-300">
                  <button onClick={dec} className="px-3 py-2 text-lg leading-none">-</button>
                  <input
                    readOnly
                    value={qty}
                    className="w-12 border-x border-gray-300 py-2 text-center outline-none"
                  />
                  <button onClick={inc} className="px-3 py-2 text-lg leading-none">+</button>
                </div>

                <button className="rounded-xl bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:opacity-90">
                  Add To Cart
                </button>
              </div>
            </div>
          </div>

          {/* Extra info */}
          <div className="mt-8 rounded-2xl bg-white p-4 ring-1 ring-gray-100">
            <h3 className="text-base font-semibold mb-2">Information</h3>
            <ul className="list-disc pl-5 text-sm text-gray-700">
              <li>Brand: {prod.brand || "—"}</li>
              <li>Category: {prod.category || "—"}</li>
              <li>Warranty: {prod.warrantyInformation || "—"}</li>
              <li>Shipping: {prod.shippingInformation || "—"}</li>
            </ul>
          </div>
        </>
      )}
    </section>
  );
}


      

