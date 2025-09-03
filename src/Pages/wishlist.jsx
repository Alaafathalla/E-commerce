import React from "react";
import { Heart } from "lucide-react";
import useDataStore from "../Stores/useDataStore";

export default function Wishlist() {
  const { wishlist, toggleWishlist } = useDataStore();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>

      {wishlist.length === 0 ? (
        <p className="text-gray-500">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((r) => (
            <div
              key={r.id}
              className="relative rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 hover:shadow-md transition"
            >
              <button
                onClick={() => toggleWishlist(r)}
                className="absolute right-4 top-4 rounded-full p-2 transition bg-pink-100 text-red-600"
              >
                <Heart className="h-5 w-5 fill-red-600" />
              </button>

              <img
                src={r.image}
                alt={r.name}
                className="w-full h-40 object-cover rounded-lg"
              />
              <h3 className="mt-3 font-semibold">{r.name}</h3>
              {r.cuisine && (
                <p className="text-sm text-gray-500">{r.cuisine}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}




