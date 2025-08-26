// src/Stores/useCartStore.js
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// ---------------------------------------------
// Helpers
// ---------------------------------------------
const API = "https://dummyjson.com";
const clampQty = (q) => Math.max(1, Math.min(99, Number.isFinite(+q) ? +q : 1));

async function request(path, options = {}) {
  const res = await fetch(`${API}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    const err = new Error(`HTTP ${res.status}: ${text || res.statusText}`);
    err.status = res.status;
    throw err;
  }
  return res.json();
}

/**
 * شكل المنتجات المطلوب من DummyJSON في عمليات السلة:
 * products: [{ id: <productId>, quantity: <number> }]
 */

// ---------------------------------------------
// Store
// ---------------------------------------------
const useCartStore = create(
  persist(
    (set, get) => ({
      // ---------- Local Cart State (تُحفظ محليًا) ----------
      // كل عنصر: { id, title, price, image, qty }
      items: [],

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

      // ---------- Remote Carts (DummyJSON) ----------
      // هذه لا تُحفظ في localStorage لتبقى خفيفة ومتجددة
      loading: false,
      error: null,
      carts: null,           // نتيجة Get all / by user
      activeCart: null,      // نتيجة Get single / add / update
      lastActionAt: null,

      // Get all carts
      fetchAllCarts: async () => {
        set({ loading: true, error: null });
        try {
          const data = await request("/carts");
          set({ carts: data, loading: false, lastActionAt: Date.now() });
          return data;
        } catch (e) {
          set({ error: e.message, loading: false });
          return null;
        }
      },

      // Get a single cart by id
      fetchCartById: async (cartId) => {
        set({ loading: true, error: null });
        try {
          const data = await request(`/carts/${cartId}`);
          set({ activeCart: data, loading: false, lastActionAt: Date.now() });
          return data;
        } catch (e) {
          set({ error: e.message, loading: false });
          return null;
        }
      },

      // Get carts by user id
      fetchCartsByUser: async (userId) => {
        set({ loading: true, error: null });
        try {
          const data = await request(`/carts/user/${userId}`);
          set({ carts: data, loading: false, lastActionAt: Date.now() });
          return data;
        } catch (e) {
          set({ error: e.message, loading: false });
          return null;
        }
      },

      // Add a new cart (POST - محاكاة)
      createCart: async ({ userId, products }) => {
        set({ loading: true, error: null });
        try {
          const body = JSON.stringify({ userId, products });
          const data = await request("/carts/add", { method: "POST", body });
          set({ activeCart: data, loading: false, lastActionAt: Date.now() });
          return data;
        } catch (e) {
          set({ error: e.message, loading: false });
          return null;
        }
      },

      // Update / merge products in a cart (PUT/PATCH)
      updateCart: async (cartId, { products, merge = true } = {}) => {
        set({ loading: true, error: null });
        try {
          const body = JSON.stringify({ merge, products });
          const data = await request(`/carts/${cartId}`, {
            method: "PUT", // أو PATCH
            body,
          });
          set({ activeCart: data, loading: false, lastActionAt: Date.now() });
          return data;
        } catch (e) {
          set({ error: e.message, loading: false });
          return null;
        }
      },

      // Delete a cart (DELETE - محاكاة)
      deleteCart: async (cartId) => {
        set({ loading: true, error: null });
        try {
          const data = await request(`/carts/${cartId}`, { method: "DELETE" });
          // نحذفها من القائمة إن كانت معروضة
          set((state) => ({
            loading: false,
            lastActionAt: Date.now(),
            carts: state?.carts?.carts
              ? {
                  ...state.carts,
                  carts: state.carts.carts.filter((c) => c.id !== cartId),
                }
              : state.carts,
            activeCart:
              state.activeCart && state.activeCart.id === cartId
                ? null
                : state.activeCart,
          }));
          return data;
        } catch (e) {
          set({ error: e.message, loading: false });
          return null;
        }
      },

      // ---------- (اختياري) مزامنة السلة المحلية مع API ----------
      // يحوّل items المحلية إلى صيغة DummyJSON {id, quantity}
      pushLocalAsCart: async (userId) => {
        const { items } = get();
        const products = items.map((x) => ({ id: x.id, quantity: x.qty }));
        return get().createCart({ userId, products });
      },
    }),
    {
      name: "cart-store",
      storage: createJSONStorage(() => localStorage),
      version: 2,
      migrate: (state /*, version*/) => {
        const items = Array.isArray(state?.items) ? state.items : [];
        return { ...state, items };
      },
      // لا نُخزن إلا العناصر المحلية فقط
      partialize: (state) => ({ items: state.items }),
    }
  )
);

export default useCartStore;
