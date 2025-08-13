// src/Stores/useCartStore.js
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// clamp quantity between 1 and 99
const clampQty = (q) => Math.max(1, Math.min(99, Number.isFinite(+q) ? +q : 1));

const useCartStore = create(
  persist(
    (set, get) => ({
      // ---------- state ----------
      // each item: { id, title, price, image, qty }
      items: [],

      // ---------- actions ----------
      addItem: (item, qty = 1) =>
        set((state) => {
          if (!item || item.id == null) return state;
          const nextQty = clampQty(qty);
          const idx = state.items.findIndex((x) => x.id === item.id);
          if (idx >= 0) {
            const copy = [...state.items];
            copy[idx] = { ...copy[idx], qty: clampQty(copy[idx].qty + nextQty) };
            return { items: copy };
          }
          return { items: [...state.items, { ...item, qty: nextQty }] };
        }),

      // seed an array only if the cart is empty (handy for demos)
      addManyIfEmpty: (arr = []) =>
        set((state) =>
          state.items.length
            ? state
            : {
                items: arr.map((x) => ({
                  ...x,
                  qty: clampQty(x.qty ?? 1),
                })),
              }
        ),

      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((x) => x.id !== id) })),

      setQty: (id, qty) =>
        set((state) => ({
          items: state.items.map((x) =>
            x.id === id ? { ...x, qty: clampQty(qty) } : x
          ),
        })),

      inc: (id) => {
        const it = get().items.find((x) => x.id === id);
        if (it) get().setQty(id, it.qty + 1);
      },

      dec: (id) => {
        const it = get().items.find((x) => x.id === id);
        if (it) get().setQty(id, it.qty - 1);
      },

      clear: () => set({ items: [] }),
    }),
    {
      name: "cart-store", // localStorage key
      storage: createJSONStorage(() => localStorage),
      version: 1,
      // keep older data shapes from breaking
      migrate: (state /*, version*/) => {
        const items = Array.isArray(state?.items) ? state.items : [];
        return { ...state, items };
      },
      // (optional) only persist items; drop any future non-essential keys
      partialize: (state) => ({ items: state.items }),
    }
  )
);

export default useCartStore;
