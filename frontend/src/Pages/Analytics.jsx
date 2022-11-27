import React from 'react'
import "./Analytics.css"
import Chart from "react-apexcharts";

export default function Analytics() {
  const state_total_sales = {
    options: {
      chart: {
        id: "basic-bar",
      },
      fill: {
        colors: ["white"],
      },
      xaxis: {
        labels: {
          format: "yyyy/MM/dd",
          
        },
        categories:   [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
      },
    },
    series: [
      {
        name: "REAL_GDP_PER_CAPITA",
        data: [30, 40, 45, 50, 49, 60, 70, 91],
        
      },
    ],
  };
  const store_views = {
    options: {
      chart: {
        id: "basic-bar",
      },
      fill: {
        colors: ["white"],
      },
      xaxis: {
        labels: {
          format: "yyyy/MM/dd",
          
        },
        categories:   [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
      },
    },
    series: [
      {
        name: "REAL_GDP_PER_CAPITA",
        data: [30, 40, 45, 50, 49, 60, 70, 91],
        
      },
    ],
  };
  return (
    <div className='Analytics'>
      <div className='Analytics_Header'>
        Analytics
      </div>
      <div className='Analytics_Body'>
        <div className='order_per_day'>
          <p className='order_per_day_text'>AVERAGE ORDERS PER DAY</p>
          <p className='order_per_day_number'>8000</p>
        </div>
        <div className='order_value'>
          <p className='order_value_text'>AVERAGE ORDER VALUE</p>
          <p className='order_value_number'>₹ 8000</p>
        </div>
        <div className='sales_per_day'>
          <p className='sales_per_day_text'>AVERAGE SALES PER DAY</p>
          <p className='sales_per_day_number'>₹ 8000</p>
        </div>
        <div className='return_coutmer'>
          <p className='return_coutmer_text'>RETURNING CUSTOMERS</p>
          <p className='return_coutmer_number'>8000 %</p>
        </div>
      </div>

      <div className='Analytics_chart'>
        <div className='TOTAL_oRDERS'>
          <p className='total_orders'>TOTAL ORDERS</p>
          <p className='total_orders'>₹8,000</p>
          <Chart
              options={state_total_sales.options}
              series={state_total_sales.series}
              type="bar"
              width={600}
            />
        </div>
        <div className='TOTALSALES'>
          <p className='total_orders'>TOTAL SALES</p>
          <p className='total_orders'>₹8,000</p>
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
