import React from 'react'
import {
    Routes,
    Route,
  } from "react-router-dom";
import Addprroducts from './Addprroducts';
  import Products from "./Products"
export default function Productpage({dukaanName,setdukaanName}) {
  return (
    <div>
        <Routes>
        <Route path="/" element={<Products setdukaanName={setdukaanName} dukaanName={dukaanName} />} />
            <Route path="Addproducts" element={<Addprroducts setdukaanName={setdukaanName} dukaanName={dukaanName} />} />
            
          </Routes>
    </div>
  )
}
