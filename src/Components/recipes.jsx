import React, { useEffect } from "react";
import { Heart } from "lucide-react";
import useDataStore from "../Stores/useDataStore";

export default function Recipes() {
  const { recipes, fetchRecipes, toggleWishlist, wishlist } = useDataStore();

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Pakistani Recipes</h1>

      {recipes.length === 0 ? (
        <p className="text-gray-500">Loading recipes...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((r) => {
            const isInWishlist = wishlist.some((item) => item.id === r.id);
            return (
              <div
                key={r.id}
                className="relative rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 hover:shadow-md transition"
              >
                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(r)}
                  className={`absolute right-4 top-4 rounded-full p-2 transition ${
                    isInWishlist
                      ? "bg-pink-100 text-red-600"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  <Heart
                    className={`h-5 w-5 ${
                      isInWishlist ? "fill-red-600" : "fill-none"
                    }`}
                  />
                </button>

                {/* Image */}
                <img
                  src={r.image}
                  alt={r.name}
                  className="w-full h-40 object-cover rounded-lg"
                />

                {/* Title */}
                <h3 className="mt-3 font-semibold">{r.name}</h3>
                {r.cuisine && (
                  <p className="text-sm text-gray-500">{r.cuisine}</p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
