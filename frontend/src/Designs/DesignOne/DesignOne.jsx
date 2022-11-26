import React from 'react'
import "./DesignOne.css"
import {
  Routes,
  Route,
} from "react-router-dom";
import DesignOneBody from './DesignOneBody'
import DesignOneHeader from './DesignOneHeader'
import DesignOneProduct from './DesignOneProduct'
import ProductDiplay from './ProductDiplay'
import DesignAccount from './DesignAccount';
import MyOrders from '../MyOrders';
import WishList from './WishList';
import AddCart from './AddCart';
export default function DesignOne() {
  return (
    <div className='DesignOne'>
    <DesignOneHeader />
     
     <Routes>
            <Route path="/" element={<DesignOneBody />} />
            <Route path="Home" element={<DesignOneBody />} />
            <Route path='Account/*' element={<DesignAccount />} />
            <Route path='Wishlist' element ={<WishList />} />
            <Route path='AddCart' element ={<AddCart />} />
        
      </Routes>
   
      
      {/* <DesignOneProduct />
      <ProductDiplay /> */}
    </div>
  )
}
