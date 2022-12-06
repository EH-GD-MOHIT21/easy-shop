import React from 'react'
import "./Analytics.css"
import Chart from "react-apexcharts";
import { useState } from 'react';
import { useLayoutEffect } from 'react';

export default function Analytics() {
  const [orderData, setOrderData] = useState([]);
  const dukaanDate = [];
  const dukanSales = [];
  const dukaanOrder = [];
  let Add_sales =0;
  let Add_orders = 0;
 
  const [dukaanlist, setdukaanlist] = useState([]);
  for (let i = 0; i < orderData?.length; i++) {
    dukaanDate.push(orderData[i]["date"]);
    dukanSales.push((orderData[i]["sales"]));
    dukaanOrder.push(orderData[i]["products"]);
  }
  const state_total_sales = {
    options: {
      chart: {
        id: "basic-bar",
      },
      fill: {
        colors: ["black"],
      },
      xaxis: {
        labels: {
          format: "yyyy-MM-dd",

        },
        categories: dukaanDate,
      },
    },
    series: [
      {
        name: "REAL_GDP_PER_CAPITA",
        data: dukanSales,

      },
    ],
  };




  const store_views = {
    options: {
      chart: {
        id: "basic-bar",
      },
      fill: {
        colors: ["black"],
      },
      xaxis: {
        labels: {
          format: "yyyy-MM-dd",

        },
        categories: dukaanDate,
      },
    },
    series: [
      {
        name: "REAL_GDP_PER_CAPITA",
        data: dukaanOrder,

      },
    ],
  };

  useLayoutEffect(() => {
    fetch("http://127.0.0.1:8000/orderdetails")
      .then(res => res.json())
      .then(datas => setOrderData(datas.data))
  }, []);

  for(let x of dukanSales){
    Add_sales +=x;
  }
  for(let x of dukaanOrder){
    Add_orders +=x;
  }
  return (
    <div className='Analytics'>
      <div className='Analytics_Header'>
        Analytics
      </div>
      <div className='Analytics_Body'>
        <div className='order_per_day'>
          <p className='order_per_day_text'>AVERAGE ORDERS PER DAY</p>
          <p className='order_per_day_number'>
            {dukaanOrder.length != 0 ? Add_orders/dukaanOrder.length:0}
          </p>
        </div>
        <div className='order_value'>
          <p className='order_value_text'>AVERAGE ORDER VALUE</p>
          <p className='order_value_number'>₹ {dukanSales.length != 0 ? Add_sales/dukanSales.length:0}</p>
        </div>
        <div className='sales_per_day'>
          <p className='sales_per_day_text'>AVERAGE SALES PER DAY</p>
          <p className='sales_per_day_number'>₹ {dukanSales.length != 0 ? (Add_sales/dukanSales.length)*1.33:0}</p>
        </div>
        
      </div>

      <div className='Dukaan_previous_Data'>
      <div className='store_total_sales'>
        <p className='Total_sales'>Total Sales</p>
        <p className='Total_sales'>{Add_sales}</p>
        <Chart
              options={state_total_sales.options}
              series={state_total_sales.series}
              type="bar"
              width={600}
            />
      </div>
      <div className='store_views'>
        <div className='Total_sales'>Total Orders</div>
        <p className='Total_sales'>{Add_orders}</p>
        <Chart
              options={store_views.options}
              series={store_views.series}
              type="bar"
              width={600}
            />
      </div> 
      </div>
    </div>
  )
}
