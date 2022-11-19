import React from 'react'
import {
    Routes,
    Route,
  } from "react-router-dom";
import Addprroducts from './Addprroducts';
  import Products from "./Products"
export default function Productpage() {
  return (
    <div>
        <Routes>
        <Route path="/" element={<Products />} />
            <Route path="Addproducts" element={<Addprroducts />} />
            
          </Routes>
    </div>
  )
}
