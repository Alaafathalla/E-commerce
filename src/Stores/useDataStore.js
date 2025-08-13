// Stores/useDataStore.js
import { create } from "zustand";
import axios from "axios";

const api = axios.create({ baseURL: "https://dummyjson.com/" });
const TTL = 5 * 60 * 1000;

const useDataStore = create((set, get) => ({
  /* ------------------- recipes (already in your code) ------------------- */
  recipes: [],
  loading: false,
  error: null,
  lastRecipesFetch: 0,

  singleById: {},
  singleFetchTs: {},
  loadingSingleId: null,

  getMyRecipes: async (forceRefresh = false) => {
    const now = Date.now();
    if (!forceRefresh && now - get().lastRecipesFetch < TTL) return get().recipes;

    set({ loading: true, error: null });
    try {
      const res = await api.get("/recipes");
      const recipes = res.data?.recipes || [];
      set({ recipes, lastRecipesFetch: now, loading: false });
      return recipes;
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        (err.message?.includes("Network") ? "Network error" : "Failed to fetch recipes");
      set({ error: msg, loading: false });
      throw err;
    }
  },

  getSingleRecipe: async (id, forceRefresh = false) => {
    if (!id) return null;
    const now = Date.now();
    const { singleFetchTs, singleById } = get();
    if (!forceRefresh && singleById[id] && now - (singleFetchTs[id] || 0) < TTL) {
      return singleById[id];
    }

    set({ loadingSingleId: id, error: null });
    try {
      const { data } = await api.get(`/recipes/${id}`);
      set((state) => ({
        singleById: { ...state.singleById, [id]: data },
        singleFetchTs: { ...state.singleFetchTs, [id]: now },
        loadingSingleId: null,
      }));
      return data;
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        (err.message?.includes("Network") ? "Network error" : "Failed to fetch recipe");
      set({ error: msg, loadingSingleId: null });
      throw err;
    }
  },

  /* ------------------- carts (list) ------------------- */
  carts: [],
  total: 0,
  skip: 0,
  limit: 0,
  cartsLoading: false,
  cartsError: null,
  lastCartsFetch: 0,

  getCarts: async (forceRefresh = false, params = {}) => {
    const now = Date.now();
    if (!forceRefresh && now - get().lastCartsFetch < TTL) return get().carts;

    set({ cartsLoading: true, cartsError: null });
    try {
      const { data } = await api.get("/carts", { params });
      const carts = data?.carts || [];
      set({
        carts,
        total: data?.total ?? 0,
        skip: data?.skip ?? 0,
        limit: data?.limit ?? 0,
        lastCartsFetch: now,
        cartsLoading: false,
      });
      return carts;
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        (err.message?.includes("Network") ? "Network error" : "Failed to fetch carts");
      set({ cartsError: msg, cartsLoading: false });
      throw err;
    }
  },

  /* ------------------- NEW: carts by user + add to cart ------------------- */
  // cache per user id
  userCartsByUserId: {},   // { [userId]: { carts, total, skip, limit } }
  userCartsFetchTs: {},    // { [userId]: timestamp }
  cartsByUserLoadingId: null,
  cartsByUserError: null,

  getCartsByUser: async (userId, forceRefresh = false, params = {}) => {
    if (userId == null) return null;
    const now = Date.now();
    const { userCartsByUserId, userCartsFetchTs } = get();

    if (
      !forceRefresh &&
      userCartsByUserId[userId] &&
      now - (userCartsFetchTs[userId] || 0) < TTL
    ) {
      return userCartsByUserId[userId];
    }

    set({ cartsByUserLoadingId: userId, cartsByUserError: null });
    try {
      // GET https://dummyjson.com/carts/user/{id}
      const { data } = await api.get(`/carts/user/${userId}`, { params });
      const payload = {
        carts: data?.carts || [],
        total: data?.total ?? 0,
        skip: data?.skip ?? 0,
        limit: data?.limit ?? 0,
      };

      set((state) => ({
        userCartsByUserId: { ...state.userCartsByUserId, [userId]: payload },
        userCartsFetchTs: { ...state.userCartsFetchTs, [userId]: now },
        cartsByUserLoadingId: null,
      }));

      return payload;
    } catch (err) {
      set({
        cartsByUserError:
          err.response?.data?.message ||
          (err.message?.includes("Network") ? "Network error" : "Failed to fetch user carts"),
        cartsByUserLoadingId: null,
      });
      throw err;
    }
  },

  addToCart: async ({ userId, products }) => {
    // POST https://dummyjson.com/carts/add
    // body: { userId, products: [{ id, quantity }] }
    set({ addCartLoading: true, addCartError: null });
    try {
      const { data: newCart } = await api.post(
        "/carts/add",
        { userId, products },
        { headers: { "Content-Type": "application/json" } }
      );

      // update per-user cache optimistically
      set((state) => {
        const prev = state.userCartsByUserId[userId]?.carts || [];
        const snapshot = {
          carts: [newCart, ...prev],
          total: (state.userCartsByUserId[userId]?.total || 0) + 1,
          skip: 0,
          limit: state.userCartsByUserId[userId]?.limit ?? prev.length + 1,
        };
        return {
          userCartsByUserId: { ...state.userCartsByUserId, [userId]: snapshot },
          addCartLoading: false,
        };
      });

      return newCart;
    } catch (err) {
      set({
        addCartError:
          err.response?.data?.message ||
          (err.message?.includes("Network") ? "Network error" : "Failed to add to cart"),
        addCartLoading: false,
      });
      throw err;
    }
  },

  addCartLoading: false,
  addCartError: null,
}));

export default useDataStore;



