import React from 'react'
import ListItmesComponents from '../Components/ListItmesComponents'
import "./UserHome.css"
import {
  Routes,
  Route,
} from "react-router-dom";
import Orders from './Orders';
import Delivery from './Delivery';
import Home from './Home';
import Products from './Products';
import Analytics from './Analytics';
import Payment from './Payment';
import Customers from './Customers';
export default function () {

  return (
    <div className='UserHome'>
        <div className='LeftBar'>
            <ListItmesComponents />
        </div>
        <div className='RightBar'> 
        <Routes>
        <Route path="Home" element={<Home />} />
      <Route path="Products" element={<Products />} />
      <Route path="Orders" element={<Orders/>} />
      <Route path="Delivery" element={<Delivery/>} />
      <Route path="Analytics" element={<Analytics />} />
      <Route path="Payments" element={<Payment />} />
      <Route path="Customers" element={<Customers />} />
    </Routes>
        </div>
      
    </div>
  )
}
