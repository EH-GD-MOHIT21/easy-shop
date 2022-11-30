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
import MyAddresses from '../MyAddresses';
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
            <Route path='category=:category/AllProducts' element ={<DesignOneProduct />} />
            <Route path='category=:category/AllProducts/productPage/prodid=:prodid' element ={ <ProductDiplay />} />
            <Route path='category=:category/AllProducts/productPage/MyAddresses' element ={ <div className='address'><MyAddresses /></div>} />
        
      </Routes>

      
      
     
    </div>
  )
}
