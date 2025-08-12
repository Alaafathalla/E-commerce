import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function SingleProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState(null);
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
        const { data } = await axios.get(`https://dummyjson.com/recipes/${id}`);
        if (!isMounted) return;
        setRecipe(data);
        setActiveImg(0);
      } catch (e) {
        console.error(e);
        setErr("Failed to load recipe.");
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [id]);

  // Recipes have a single image (string). Build a 1-item gallery.
  const gallery = useMemo(() => {
    if (!recipe) return [];
    return [recipe.image || ""];
  }, [recipe]);

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

      {!loading && !err && recipe && (
        <>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Gallery */}
            <div>
              <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                <img
                  src={gallery[activeImg]}
                  alt={recipe.name}
                  className="mx-auto max-h-96 object-contain"
                  onError={(e) => (e.currentTarget.src = "")}
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
                      onError={(e) => (e.currentTarget.src = "")}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="space-y-3">
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                {recipe.name}
              </h1>

              {/* If you want a short blurb, build one from fields available */}
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {recipe.cuisine ? `${recipe.cuisine} cuisine` : "Recipe"} ·{" "}
                {Array.isArray(recipe.mealType) && recipe.mealType.length > 0
                  ? recipe.mealType.join(", ")
                  : "Meal"}
              </p>

              <div className="flex items-center gap-2 pt-1 text-amber-500">
                {"★".repeat(Math.round(recipe.rating || 0))}
                {"☆".repeat(5 - Math.round(recipe.rating || 0))}
                <span className="text-xs text-gray-500">({recipe.rating ?? 0} / 5)</span>
              </div>

              <ul className="mt-2 grid grid-cols-1 gap-1 text-sm">
                <li className="flex">
                  <span className="w-28 shrink-0 text-gray-500">Cuisine</span>
                  <span className="text-gray-700">: {recipe.cuisine || "—"}</span>
                </li>
                <li className="flex">
                  <span className="w-28 shrink-0 text-gray-500">Meal Type</span>
                  <span className="text-gray-700">
                    : {Array.isArray(recipe.mealType) && recipe.mealType.length ? recipe.mealType.join(", ") : "—"}
                  </span>
                </li>
                <li className="flex">
                  <span className="w-28 shrink-0 text-gray-500">Servings</span>
                  <span className="text-gray-700">: {recipe.servings ?? "—"}</span>
                </li>
                <li className="flex">
                  <span className="w-28 shrink-0 text-gray-500">Prep/Cook</span>
                  <span className="text-gray-700">
                    : {recipe.prepTimeMinutes ?? "—"} / {recipe.cookTimeMinutes ?? "—"} mins
                  </span>
                </li>
                <li className="flex">
                  <span className="w-28 shrink-0 text-gray-500">Calories</span>
                  <span className="text-gray-700">: {recipe.caloriesPerServing ?? "—"}</span>
                </li>
              </ul>

              {/* Keep your qty/add button UI if you like, but it's a recipe.
                  You could reinterpret this as "Add ingredients to cart". */}
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

                <button
                  className="rounded-xl bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:opacity-90"
                  onClick={() => navigate("/cart")}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>

          {/* Extra info */}
          <div className="mt-8 rounded-2xl bg-white p-4 ring-1 ring-gray-100">
            <h3 className="text-base font-semibold mb-2">Ingredients</h3>
            <ul className="list-disc pl-5 text-sm text-gray-700">
              {Array.isArray(recipe.ingredients) && recipe.ingredients.length ? (
                recipe.ingredients.map((ing, i) => <li key={i}>{ing}</li>)
              ) : (
                <li>—</li>
              )}
            </ul>
          </div>

          <div className="mt-6 rounded-2xl bg-white p-4 ring-1 ring-gray-100">
            <h3 className="text-base font-semibold mb-2">Instructions</h3>
            <ol className="list-decimal pl-5 text-sm text-gray-700 space-y-1">
              {Array.isArray(recipe.instructions) && recipe.instructions.length ? (
                recipe.instructions.map((step, i) => <li key={i}>{step}</li>)
              ) : (
                <li>—</li>
              )}
            </ol>
          </div>
        </>
      )}
    </section>
  );
}



      

