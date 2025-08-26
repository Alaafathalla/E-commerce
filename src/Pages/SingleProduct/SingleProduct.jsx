// src/Pages/SingleProduct/SingleProduct.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useDataStore from "../../Stores/useDataStore";
import useCartStore from "../../Stores/useCartStore";

export default function SingleProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  // 🔌 سحب بيانات المنتج من الستور الخاص بالـ recipes
  const recipe = useDataStore((s) => s.singleById[id]);
  const loadingSingleId = useDataStore((s) => s.loadingSingleId);
  const error = useDataStore((s) => s.error);
  const getSingleRecipe = useDataStore((s) => s.getSingleRecipe);

  // 🛒 سلة المشتريات
  const addItem    = useCartStore((s) => s.addItem);     // إضافة محلية (فورية)
  const createCart = useCartStore((s) => s.createCart);  // (اختياري) مزامنة API
  const apiLoading = useCartStore((s) => s.loading);
  const apiError   = useCartStore((s) => s.error);

  // UI state
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);

  // منع تكرار الـ fetch في Strict Mode
  const fetchedRef = useRef(false);
  useEffect(() => {
    if (!id) return;
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    getSingleRecipe(id); // لو تريد تجاهل الكاش: getSingleRecipe(id, true)
  }, [id, getSingleRecipe]);

  // جاليري (DummyJSON يعيد صورة واحدة غالبًا)
  const gallery = useMemo(() => (recipe ? [recipe.image || ""] : []), [recipe]);

  const inc = () => setQty((q) => Math.min(q + 1, 99));
  const dec = () => setQty((q) => Math.max(q - 1, 1));

  const isLoadingThis = loadingSingleId === id && !recipe;

  // 🛒 إضافة للسلة المحلية + (اختياري) مزامنة API
  const handleAddToCart = async () => {
    if (!recipe) return;

    // 1) أضف محليًا فورًا — نفس طريقة Products
    addItem(
      {
        id: Number(id),
        title: recipe.name,
        price: Number(recipe.price ?? 0) || 0, // عدّل مصدر السعر لو متوفر عندك
        image: recipe.image,
      },
      qty
    );

    // 2) (اختياري) مزامنة مع DummyJSON (POST /carts/add)
    try {
      await createCart({
        userId: 1, // ثابت للاختبار — بدّله بالمستخدم الحقيقي إذا عندك Auth
        products: [{ id: Number(id), quantity: qty }],
      });
    } catch (e) {
      // لا نكسر الـ UI لو فشل الاستدعاء المحاكي
      console.warn("API sync failed:", e?.message || e);
    }

    // 3) توجيه لسلة المشتريات
    // navigate("/cart");
  };

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 rounded-md border px-3 py-1.5 text-sm text-gray-700 dark:text-gray-200"
      >
        ← Back
      </button>

      {isLoadingThis && (
        <div className="rounded-2xl bg-white p-6 ring-1 ring-gray-100">Loading…</div>
      )}

      {!isLoadingThis && error && !recipe && (
        <div className="rounded-2xl bg-white p-6 ring-1 ring-red-200 text-red-700">
          {error}
        </div>
      )}

      {!isLoadingThis && !error && !recipe && (
        <div className="rounded-2xl bg-white p-6 ring-1 ring-gray-100">Not found</div>
      )}

      {!isLoadingThis && recipe && (
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
                    :{" "}
                    {Array.isArray(recipe.mealType) && recipe.mealType.length
                      ? recipe.mealType.join(", ")
                      : "—"}
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

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <div className="flex items-center rounded-lg border border-gray-300">
                  <button onClick={inc} className="px-3 py-2 text-lg leading-none">+</button>
                  <input
                    readOnly
                    value={qty}
                    className="w-12 border-x border-gray-300 py-2 text-center outline-none"
                  />
                  <button onClick={dec} className="px-3 py-2 text-lg leading-none">-</button>
                </div>

                <button
                  disabled={apiLoading} // فقط يعطّل لو في مزامنة جارية
                  className="rounded-xl bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60"
                  onClick={handleAddToCart}
                >
                  {apiLoading ? "Adding…" : "Add To Cart"}
                </button>
              </div>

              {apiError && (
                <p className="text-sm text-red-600 pt-1">
                  {apiError}
                </p>
              )}
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




      

