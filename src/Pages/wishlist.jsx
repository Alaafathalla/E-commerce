import React from "react";
import useWishlistStore from "../Stores/useWishStore";
import { Trash2 } from "lucide-react";

export default function WishlistPage() {
  const { items, removeFromWishlist, clearWishlist } = useWishlistStore();

  if (items.length === 0) {
    return <div className="p-6 text-gray-500">Your wishlist is empty.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">My Wishlist</h1>
        <button
          onClick={clearWishlist}
          className="rounded-lg bg-red-100 px-4 py-2 text-red-600 hover:bg-red-200"
        >
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((r) => (
          <div key={r.id} className="relative border rounded-lg p-3 bg-white shadow">
            <img src={r.image} alt={r.name} className="h-40 w-full object-cover rounded-md" />
            <h2 className="mt-2 font-semibold">{r.name}</h2>
            <button
              onClick={() => removeFromWishlist(r.id)}
              className="absolute top-2 right-2 rounded-full bg-white p-1 shadow hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4 text-red-600" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

