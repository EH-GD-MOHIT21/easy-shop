import React from 'react'
import { Link } from 'react-router-dom';
import {
    Routes,
    Route,
  } from "react-router-dom";
import MyAddresses from '../MyAddresses';
import MyOrders from '../MyOrders';
import "./DesignAccount.css"

export default function DesignAccount() {
  return (
    <div className='DesignAccount'>
        <div className='DesignAccount_Header'>
        <div className='Header-Link'>
        <Link to="MyOrders">My Orders</Link>
        </div>
        <div className='Header-Link'>
            <Link to="MyAddresses">My addresses</Link>
        </div>
        <div className='Header-Link'>
            <Link to="to">Sign out</Link>
        </div>
        
        </div>
        <div className='DesignAccount_Body'>
    
        <Routes>
        <Route path="/" element={<MyOrders />} />
            <Route path="MyOrders" element={<MyOrders />} />
            <Route path="MyAddresses" element={<MyAddresses />} />
           
      </Routes>
        </div>
    </div>
  )
}
