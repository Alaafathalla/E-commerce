import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import Footer from "./Components/Footer/Footer";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Rsgister" ;
import Blog from "./Pages/Blog/Blog" ;
import Cart from "./Pages/Cart/Cart" ;
import "./App.css";
import { FaSun, FaMoon } from "react-icons/fa";

function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  // const [isLoggedIn, setIsLoggedIn] = useState(false); // Fake auth for now

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen w-full bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
      {/* Theme Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 p-2 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          {darkMode ? <FaSun className="text-yellow-400 text-xl" /> : <FaMoon className="text-gray-700 text-xl" />}
        </button>
      </div>

      {/* App Layout */}
      <Navbar />
      <main className="pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={ <Login />} />
          <Route path="/register" element={<Register />} />
             <Route path="/blog" element={<Blog />} />
                    <Route path="/cart" element={<Cart  />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
// isLoggedIn ? <Navigate to="/" /> :
export default App;


