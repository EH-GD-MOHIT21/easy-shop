import React from 'react'
import "./Analytics.css"
export default function Analytics() {
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
    </div>
  )
}
