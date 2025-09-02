// src/Stores/useWishlistStore.js
import { create } from "zustand";

const useWishlistStore = create((set, get) => ({
  items: [],

  addToWishlist: (recipe) => {
    const exists = get().items.find((r) => r.id === recipe.id);
    if (!exists) {
      set((state) => ({ items: [...state.items, recipe] }));
    }
  },

  removeFromWishlist: (id) => {
    set((state) => ({ items: state.items.filter((r) => r.id !== id) }));
  },

  clearWishlist: () => set({ items: [] }),
}));

export default useWishlistStore;
