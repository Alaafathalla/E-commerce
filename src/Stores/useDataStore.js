// Stores/useDataStore.js
import { create } from "zustand";
import axios from "axios";

const api = axios.create({ baseURL: "https://dummyjson.com" });
const TTL = 5 * 60 * 1000; // 5 minutes

const useDataStore = create((set, get) => ({

  /* ------------------- recipes (list + single) ------------------- */
  recipes: [],
  loading: false,
  error: null,
  lastRecipesFetch: 0,

  singleById: {},         // { [id]: recipe }
  singleFetchTs: {},      // { [id]: timestamp }
  loadingSingleId: null,

  getMyRecipes: async (forceRefresh = false) => {
    const now = Date.now();
    if (!forceRefresh && now - get().lastRecipesFetch < TTL) {
      return get().recipes;
    }

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

  /* ------------------- NEW: recipe tags (categories) ------------------- */
  recipeTags: [],
  tagsLoading: false,
  tagsError: null,
  lastTagsFetch: 0,

  // cache for recipes by tag
  recipesByTag: {},     // { [tagKey]: { recipes, total, skip, limit } }
  tagFetchTs: {},       // { [tagKey]: timestamp }
  tagLoadingKey: null,
  tagError: null,

  getRecipeTags: async (forceRefresh = false) => {
    const now = Date.now();
    if (!forceRefresh && now - get().lastTagsFetch < TTL) {
      return get().recipeTags;
    }

    set({ tagsLoading: true, tagsError: null });
    try {
      // GET https://dummyjson.com/recipes/tags  -> returns array
      const { data } = await api.get("/recipes/tags");
      const tags = Array.isArray(data) ? data : (data?.tags || []);
      set({ recipeTags: tags, lastTagsFetch: now, tagsLoading: false });
      return tags;
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        (err.message?.includes("Network") ? "Network error" : "Failed to fetch recipe tags");
      set({ tagsError: msg, tagsLoading: false });
      throw err;
    }
  },

  getRecipesByTag: async (tag, forceRefresh = false, params = {}) => {
    if (!tag) return null;
    const key = String(tag).trim().toLowerCase();
    const now = Date.now();
    const { recipesByTag, tagFetchTs } = get();

    if (!forceRefresh && recipesByTag[key] && now - (tagFetchTs[key] || 0) < TTL) {
      return recipesByTag[key];
    }

    set({ tagLoadingKey: key, tagError: null });
    try {
      // GET https://dummyjson.com/recipes/tag/<tag>
      const { data } = await api.get(`/recipes/tag/${encodeURIComponent(key)}`, { params });
      const payload = {
        recipes: data?.recipes || [],
        total: data?.total ?? (data?.recipes?.length ?? 0),
        skip: data?.skip ?? (params?.skip ?? 0),
        limit: data?.limit ?? (params?.limit ?? 0),
      };

      set((state) => ({
        recipesByTag: { ...state.recipesByTag, [key]: payload },
        tagFetchTs: { ...state.tagFetchTs, [key]: now },
        tagLoadingKey: null,
      }));

      return payload;
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        (err.message?.includes("Network") ? "Network error" : "Failed to fetch recipes by tag");
      set({ tagError: msg, tagLoadingKey: null });
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
    if (!forceRefresh && now - get().lastCartsFetch < TTL) {
      return get().carts;
    }

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

  /* ------------------- carts by user + add/update/delete ------------------- */
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
        userCartsFetchTs: { ...state.userCartsFetchTs, [userId]: Date.now() },
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
    // validate input
    const uid = Number(userId);
    const cleaned = Array.isArray(products)
      ? products
          .map(p => ({
            id: Number(p.id),
            quantity: Math.max(1, Number(p.quantity) || 0),
          }))
          .filter(p =>
            Number.isFinite(p.id) && p.id > 0 &&
            Number.isFinite(p.quantity) && p.quantity > 0
          )
      : [];

    if (!Number.isFinite(uid) || uid <= 0) {
      throw new Error("addToCart: userId must be a positive number");
    }
    if (cleaned.length === 0) {
      throw new Error("addToCart: products must be a non-empty array of {id, quantity}");
    }

    try {
      const { data } = await api.post(
        "/carts/add",
        { userId: uid, products: cleaned },
        { headers: { "Content-Type": "application/json" } }
      );
      return data;
    } catch (err) {
      console.error("addToCart failed:", err.response?.status, err.response?.data || err.message);
      throw new Error(err.response?.data?.message || "Failed to add to cart (400). Check payload.");
    }
  },

  updateCart: async (cartId, { products, merge = true }) => {
    if (!cartId) throw new Error("cartId required");
    try {
      const { data } = await api.put(
        `/carts/${cartId}`,
        { merge, products },
        { headers: { "Content-Type": "application/json" } }
      );
      return data; // updated cart
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to update cart";
      throw new Error(msg);
    }
  },

  deleteCart: async (cartId) => {
    if (!cartId) throw new Error("cartId required");
    try {
      const { data } = await api.delete(`/carts/${cartId}`);
      return data; // deleted cart info
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to delete cart";
      throw new Error(msg);
    }
  },

  // optional flags for UI (not wired to addToCart above, but kept for compatibility)
  addCartLoading: false,
  addCartError: null,

}));

export default useDataStore;




