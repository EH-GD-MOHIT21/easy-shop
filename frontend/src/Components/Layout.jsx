import React from 'react'
import UserHome from '../Pages/UserHome'
import Delivery from '../Pages/Delivery'
import {
    Routes,
    Route,
  } from "react-router-dom";
export default function Layout() {
  return (
    <div>
    <Routes>
      <Route path="User" element={<UserHome />} />
      <Route path="Delivery" element={<Delivery/>} />
    </Routes>
    </div>
  )
}
