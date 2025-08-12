import { create } from 'zustand';
import axios from 'axios';
import SingleProduct from '../Pages/SingleProduct/SingleProduct';

const api = axios.create({
  baseURL: 'https://dummyjson.com/',
  withCredentials: true,
});

const CACHE_DURATION = 5 * 60 * 1000; // 10 دقائق


const useDataStore = create((set, get) => ({
recipes: [],
Singlerecipe: [],
//   allUsers: [],
//   moodleCourses: [],
//   courseContent: null,
//   selectedCourse: "",
//   selectedTrainer: null,
  loading: false,
  error: null,

//   lastCoursesFetch: 0,
//   lastCourseContentFetch: 0,



// action
getMyRecipes: async (forceRefresh = false) => {
  const { lastRecipesFetch } = get();
  const now = Date.now();
  const FIVE_MINUTES = 5 * 60 * 1000;

  if (!forceRefresh && now - lastRecipesFetch < FIVE_MINUTES) return;

  set({ loading: true, error: null });
  try {
    const res = await api.get("/recipes"); // baseURL = https://dummyjson.com
    console.log(res.data); // like fetch(...).then(console.log)
    set({
      recipes: res.data?.recipes || [],
      lastRecipesFetch: now,
      loading: false,
    });
  } catch (err) {
    console.error("❌ Error fetching recipes:", err);
    set({
      error: err.response?.data?.message || "Failed to fetch recipes",
      loading: false,
    });
  }
},




}));

export default useDataStore;




