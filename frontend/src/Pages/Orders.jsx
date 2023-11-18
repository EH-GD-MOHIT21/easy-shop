import React, { useLayoutEffect, useState,useEffect } from 'react'
import { useParams } from 'react-router-dom';
import "./Orders.css"
export default function Orders() {
  const [orderList, setorderList] = useState([]);
  const [selctDukaan, setSelectDukaan] = React.useState("");
  const [otheOwnerShop,setotheOwnerShop] = useState([]);
  const [ordersdata,setordersdata] = useState([]);
  const [dukaanlist, setdukaanlist] = useState([]);
  useLayoutEffect(()=>{
    fetch("http://127.0.0.1:8000/dukaanorders/dukaan=pinu")
    .then((res)=>res.json())
    .then((data)=>console.log(data))
  },[])
  const selectDukaan = (e) => {
    console.log(e.target.value)
    setSelectDukaan(e.target.value);
    getOrderData(e.target.value)
  }
  function getExistingDukaan() {
    fetch('http://127.0.0.1:8000/createorgetdukaan')
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setdukaanlist(data.owner_shop)
        setotheOwnerShop(data.other_owner_shop)
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  useEffect(getExistingDukaan, []);
  const newMember = otheOwnerShop.filter(data=>data["perms"].includes("WRITE"));

  function getOrderData(dukan_slug){
    fetch(`http://127.0.0.1:8000/dukaanorders?dukaan=${dukan_slug}`)
    .then((res)=>res.json())
    .then((datas)=>setordersdata(datas.data))
  }
  console.log(ordersdata);
  return (
    <div className='Orders'>
    <p className='orders_text'>Orders</p>
    <div className='Select_dukaan'>
          <select name="dukaan" required className='selct_dukaan' onChange={selectDukaan}>
            <option value="" disabled selected hidden className='opt_dukaan'>Select a Dukaan</option>
            {
              [...dukaanlist,...newMember].map((data) => {
                return (
                  <option value={data.slug} className='opt_dukaan'>{data.slug} - {data.name}</option>
                )
              })
            }
          </select>
        </div>
      <div className='orders-body'>
        <table class="content-table">
          <thead className='Table_header'>
            <tr className='sticky-table-headers__sticky'>
              <th>Order ID</th>
              <th>Date</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {
              ordersdata?.map((data) => {
                const date = new Date(data.order_at);
                return (
                  <tr>
                    <td>{data.order_id}</td>
                    <td>{date.getDate()}-{date.getMonth()+1}-{date.getFullYear()}</td>
                    <td>{data?.user}</td>
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
