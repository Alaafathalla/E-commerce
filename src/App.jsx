import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "../src/Pages/Home/Home";
import Footer from "../src/Components/Footer/Footer";

function App() {
  return (
    <>
        <div className="min-h-screen w-full ">
      <Navbar />
      <main >
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      </div>  
    </>
  );
}

export default App;
