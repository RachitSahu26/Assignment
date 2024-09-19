import React from "react";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import ProductDetailPage from "./Pages/ProductDetailPage";



function App() {
  return (
    <>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetailPage/>} />
      </Routes>

    </>
  );
}



export default App; 
