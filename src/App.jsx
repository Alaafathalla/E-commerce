import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "../src/Pages/Home/Home";


function App() {
  return (
    <>
        <div className="min-h-screen w-full ">
      <Navbar />
      <main className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
      </div>  
    </>
  );
}

export default App;
