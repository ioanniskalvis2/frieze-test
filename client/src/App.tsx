import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Conversions from "./pages/Conversions";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main style={{ background: "blue" }}>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/conversions" element={<Conversions />}></Route>
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
