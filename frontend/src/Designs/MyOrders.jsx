import React from 'react'
import { useState,useLayoutEffect } from 'react';
export default function MyOrders() {
  const [orderList, setorderList] = useState([]);
  useLayoutEffect(() => {
    fetch("http://127.0.0.1:8000/cartorder")
      .then((res) => res.json())
      .then((datas) => {
        console.log(datas.data);
        setorderList(datas.data)})
  }, [])
  console.log(orderList);
  return (
    <div className='myOrders_main'>
     {
      orderList?.map((data)=>{
        const newData_img = data?.order_items[0]?.product?.images[0].url;
        const newData_title = data?.order_items[0]?.product?.name
        return (
          <div className='shopping-left-body'>
        <div className='Cart_itm-lefts'>
          <img className='cart-img' src={newData_img} />
        </div>
        <div className='Cart_itm_right'>
          <div className='product_title'>
            <p className='title-product'>{newData_title}</p>
            <p className='remove_product'>{data.order_status}</p>
          </div>
          <div className='cart-itm-price'>
            <span className='discount_price'>₹ {data?.order_items[0]?.product?.discounted_price}</span> <span className='real_price'>₹ {data?.order_items[0]?.product?.price}</span> <span>
            ({(((data?.price - data?.discounted_price) / data?.price) * 100).toFixed(2)}% OFF)
            </span>
          </div>
        </div>
      </div>
        )
      })
     }
    </div>
  )
}
