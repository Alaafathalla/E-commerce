import React, { useState } from "react";
import product from "../../assets/products/p7.png";

export default function SidebarSimple({ onApply = (f) => console.log(f) }) {
  // ---- sidebar demo data
  const categories = [
    { id: "juice", label: "Juice & Drinks", count: 20 },
    { id: "dairy", label: "Dairy & Milk", count: 54 },
    { id: "snack", label: "Snack & Spice", count: 84 },
  ];
  const colors = [
    { id: "blue", label: "Blue", dot: "bg-blue-500" },
    { id: "yellow", label: "Yellow", dot: "bg-yellow-400" },
    { id: "red", label: "Red", dot: "bg-red-500" },
    { id: "green", label: "Green", dot: "bg-green-500" },
  ];
  const weights = [
    { id: "2kg", label: "2kg Pack" },
    { id: "20kg", label: "20kg Pack" },
    { id: "30kg", label: "30kg Pack" },
  ];
  const tags = ["Vegetables", "Juice", "Food", "Dry Fruits", "Vegetables", "Juice"];

  const PRICE_MIN = 20;
  const PRICE_MAX = 250;

  const [catSel, setCatSel] = useState([]);
  const [colorSel, setColorSel] = useState([]);
  const [weightSel, setWeightSel] = useState([]);
  const [tagSel, setTagSel] = useState([]);
  const [minPrice, setMinPrice] = useState(PRICE_MIN);
  const [maxPrice, setMaxPrice] = useState(PRICE_MAX);

  const toggle = (id, list, setList) => {
    setList(list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);
  };

  const applyFilters = () => {
    onApply({
      categories: catSel,
      colors: colorSel,
      weights: weightSel,
      tags: tagSel,
      price: { min: minPrice, max: maxPrice },
    });
  };

  const reset = () => {
    setCatSel([]);
    setColorSel([]);
    setWeightSel([]);
    setTagSel([]);
    setMinPrice(PRICE_MIN);
    setMaxPrice(PRICE_MAX);
    onApply({
      categories: [],
      colors: [],
      weights: [],
      tags: [],
      price: { min: PRICE_MIN, max: PRICE_MAX },
    });
  };

  const Section = ({ title, children }) => (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <h3 className="mb-3 text-sm font-semibold text-gray-900">{title}</h3>
      {children}
    </div>
  );

  // ---------- MAIN PRODUCT (simple functions only)
  const gallery = [product, product, product, product, product]; // demo thumbs
  const [activeImg, setActiveImg] = useState(0);
  const sizes = ["50g", "80g", "100g", "200g"];
  const [sizeSel, setSizeSel] = useState(sizes[0]);
  const [qty, setQty] = useState(1);
  const inc = () => setQty((q) => Math.min(q + 1, 99));
  const dec = () => setQty((q) => Math.max(q - 1, 1));

  const specs = [
    { k: "Brand", v: "ESTA BETTERU CO" },
    { k: "Flavour", v: "Super Saver Pack" },
    { k: "Diet Type", v: "Vegetarian" },
    { k: "Weight", v: "200 Grams" },
    { k: "Speciality", v: "Gluten Free, Sugar Free" },
    { k: "Info", v: "Egg Free, Allergen-Free" },
    { k: "Items", v: "1" },
  ];

  const [tab, setTab] = useState("description"); // description | information | review

  return (
    <div className="flex p-20 gap-4">
      {/* Sidebar - 1/3 width */}
      <aside className="w-1/3 max-w-[300px] space-y-4 rounded-2xl bg-gray-50 p-4">
        <Section title="Product Category">
          <ul className="space-y-2">
            {categories.map((c) => (
              <li key={c.id} className="flex items-center justify-between">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="size-4 rounded border-gray-300 text-primary focus:ring-primary"
                    checked={catSel.includes(c.id)}
                    onChange={() => toggle(c.id, catSel, setCatSel)}
                  />
                  <span className="text-sm text-gray-700">{c.label}</span>
                </label>
                <span className="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-500">
                  {c.count}
                </span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Filter By Price">
          <div className="mb-3 text-sm text-gray-600">
            Price : ${minPrice} – ${maxPrice}
          </div>
          <input
            type="range"
            min={PRICE_MIN}
            max={PRICE_MAX}
            value={minPrice}
            onChange={(e) => setMinPrice(Math.min(Number(e.target.value), maxPrice))}
            className="mb-3 w-full accent-primary"
          />
          <button
            type="button"
            onClick={applyFilters}
            className="w-full rounded-xl bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-600 transition hover:opacity-90"
          >
            Filter
          </button>
        </Section>

        <Section title="Colors">
          <ul className="space-y-2">
            {colors.map((c) => (
              <li key={c.id} className="flex items-center justify-between">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="size-4 rounded border-gray-300 text-primary focus:ring-primary"
                    checked={colorSel.includes(c.id)}
                    onChange={() => toggle(c.id, colorSel, setColorSel)}
                  />
                  <span className="text-sm text-gray-700">{c.label}</span>
                </label>
                <span className={`inline-block size-3 rounded-full ring-2 ring-white ${c.dot}`} />
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Weight">
          <ul className="space-y-2">
            {weights.map((w) => (
              <li key={w.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="size-4 rounded border-gray-300 text-primary focus:ring-primary"
                  checked={weightSel.includes(w.id)}
                  onChange={() => toggle(w.id, weightSel, setWeightSel)}
                />
                <label className="text-sm text-gray-700">{w.label}</label>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Product Tags">
          <div className="flex flex-wrap gap-2">
            {tags.map((t, i) => {
              const active = tagSel.includes(t);
              return (
                <button
                  type="button"
                  key={`${t}-${i}`}
                  onClick={() =>
                    active ? setTagSel(tagSel.filter((x) => x !== t)) : setTagSel([...tagSel, t])
                  }
                  className={`rounded-full border px-3 py-1 text-xs ${
                    active
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-gray-300 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </Section>

        <button
          type="button"
          onClick={reset}
          className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
        >
          Reset filters
        </button>
      </aside>

      {/* Main content - 2/3 width */}
      <div className="w-2/3 space-y-8 rounded-2xl bg-gray-50 p-6">
        {/* Top: gallery + details */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Gallery */}
          <div>
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
              <img src={gallery[activeImg]} alt="product" className="mx-auto max-h-96 object-contain" />
            </div>

            <div className="mt-4 flex gap-3 overflow-x-auto">
              {gallery.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`h-20 w-24 shrink-0 rounded-xl border p-1 transition ${
                    activeImg === i ? "border-primary ring-2 ring-primary/30" : "border-gray-200"
                  }`}
                >
                  <img src={src} alt={`thumb-${i}`} className="h-full w-full object-contain" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-gray-900">
              Seeds Of Change Oraganic Quinoa, Brown
            </h2>
            <p className="text-sm text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. In, iure minus error
              doloribus saepe natus?
            </p>

            {/* rating + reviews */}
            <div className="flex items-center gap-2 pt-1 text-amber-500">
              {"★★★★★"}
              <span className="text-xs text-gray-500">(75 Review)</span>
            </div>

            {/* specs */}
            <ul className="mt-2 grid grid-cols-1 gap-1 text-sm">
              {specs.map(({ k, v }) => (
                <li key={k} className="flex">
                  <span className="w-24 shrink-0 text-gray-500">{k}</span>
                  <span className="text-gray-700">: {v}</span>
                </li>
              ))}
            </ul>

            {/* price */}
            <div className="flex items-end gap-3 pt-3">
              <span className="text-2xl font-bold text-primary">$120.25</span>
              <span className="text-sm text-gray-400 line-through">$123.25</span>
            </div>

            {/* size/weight */}
            <div className="pt-2">
              <div className="mb-2 text-sm font-medium text-gray-700">Size/Weight :</div>
              <div className="flex flex-wrap gap-2">
                {sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSizeSel(s)}
                    className={`rounded-md border px-3 py-1 text-sm ${
                      sizeSel === s
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-gray-300 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* qty + add to cart */}
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

              <button className="rounded-xl bg-primary px-5 py-2 text-sm font-semibold text-white hover:opacity-90">
                Add To Cart
              </button>

              <button className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700">
                ♡
              </button>
              <button className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700">
                ⤴
              </button>
            </div>
          </div>
        </div>

        {/* Second section: tabs */}
        <div className="rounded-2xl bg-white p-4 ring-1 ring-gray-100">
          <div className="flex gap-6 border-b">
            {[
              { id: "description", label: "Description" },
              { id: "information", label: "Information" },
              { id: "review", label: "Review" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`-mb-px border-b-2 px-2 pb-2 text-sm ${
                  tab === t.id ? "border-primary text-primary" : "border-transparent text-gray-600"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* tab content (simple switch) */}
          <div className="prose mt-4 max-w-none text-sm text-gray-700">
            {tab === "description" && (
              <>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Error in vero sapiente
                  odio, error dolore vero temporibus consequatur…
                </p>
                <h4 className="mt-6 text-base font-semibold">Packaging & Delivery</h4>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis vel consequuntur
                  repellat distinctio rem…
                </p>
              </>
            )}

            {tab === "information" && (
              <ul className="list-disc pl-5">
                <li>Shelf life: 18 months</li>
                <li>Storage: Keep in a cool, dry place</li>
                <li>Country of origin: Demo</li>
              </ul>
            )}

            {tab === "review" && (
              <div>
                <p className="text-gray-600">No reviews yet. Be the first to review this item.</p>
                <button className="mt-3 rounded-lg border border-gray-300 px-3 py-1 text-sm">
                  Write a review
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
      

