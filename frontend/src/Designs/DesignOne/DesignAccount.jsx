import React from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {
    Routes,
    Route,
  } from "react-router-dom";
import MyAddresses from '../MyAddresses';
import MyOrders from '../MyOrders';
import "./DesignAccount.css"

export default function DesignAccount() {
  const navigate = useNavigate();
  function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  const csrftoken = getCookie('X-CSRFToken');
  const handlelogout = ()=>{
    fetch('http://127.0.0.1:8000/logout', {
  
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          'X-CSRFToken': csrftoken,
        },
        withCredentials: true,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data);
          navigate("/")
        })
        .catch((error) => {
          console.error('Error:', error);
        });
  }
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
            <Link to="" onClick={handlelogout}>Sign out</Link>
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
