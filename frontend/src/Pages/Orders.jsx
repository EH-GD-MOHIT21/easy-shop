import React, { useLayoutEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import "./Orders.css"
export default function Orders() {
  const [orderList, setorderList] = useState([]);
  useLayoutEffect(()=>{
    fetch("http://127.0.0.1:8000/dukaanorders/dukaan=pinu")
    .then((res)=>res.json())
    .then((data)=>console.log(data))
  },[])
  return (
    <div className='Orders'>
    <p className='orders_text'>Orders</p>
      <div className='orders-body'>
        <table class="content-table">
          <thead className='Table_header'>
            <tr className='sticky-table-headers__sticky'>
              <th>Order ID</th>
              <th>Date</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Status</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {
              orderList?.map((data) => {
                const date = new Date(data.order_at);
                return (
                  <tr>
                    <td>{data.order_id}</td>
                    <td>{date.getDate()}-{date.getMonth()+1}-{date.getFullYear()}</td>
                    <td>{data?.user?.first_name} {data?.user?.last_name}</td>
                    <td>{data?.order_items?.length}</td>
                    <td>{data.order_status}</td>
                    <td>{data.amount}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}
