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

  singleById: {},
  singleFetchTs: {},
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

  /* ------------------- recipe tags (categories) ------------------- */
  recipeTags: [],
  tagsLoading: false,
  tagsError: null,
  lastTagsFetch: 0,

  recipesByTag: {},
  tagFetchTs: {},
  tagLoadingKey: null,
  tagError: null,

  getRecipeTags: async (forceRefresh = false) => {
    const now = Date.now();
    if (!forceRefresh && now - get().lastTagsFetch < TTL) {
      return get().recipeTags;
    }

    set({ tagsLoading: true, tagsError: null });
    try {
      const { data } = await api.get("/recipes/tags");
      const tags = Array.isArray(data) ? data : data?.tags || [];
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

  // ... carts code unchanged ...

  /* ------------------- WISHLIST ------------------- */
  wishlist: [],


  // fetch recipes
  fetchRecipes: async () => {
    const res = await fetch("https://dummyjson.com/recipes/tag/Pakistani");
    const data = await res.json();
    set({ recipes: data.recipes || [] });
  },

  // toggle wishlist (add/remove)
  toggleWishlist: (recipe) => {
    const { wishlist } = get();
    const exists = wishlist.find((item) => item.id === recipe.id);
    if (exists) {
      set({ wishlist: wishlist.filter((item) => item.id !== recipe.id) });
    } else {
      set({ wishlist: [...wishlist, recipe] });
    }
  },
}));

export default useDataStore;





