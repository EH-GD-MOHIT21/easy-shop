import React, { useState } from 'react'
import "./Home.css"
import { useLayoutEffect } from 'react';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { IconButton } from '@mui/material';
import Chart from "react-apexcharts";
import Switch from '@mui/material/Switch';
export default function Home() {
  const [userData, setUserData] = useState([])
  const label = { inputProps: { 'aria-label': 'Size switch demo' } };

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

  useLayoutEffect(() => {
    fetch("http://127.0.0.1:8000/mydetails")
    .then(res=>res.json())
    .then(data=>setUserData(data))
  }, [])
  console.log(userData)
  return (
    <>
    <h1 className='welcome_back'>Welcome Back {userData?.basic_info?.first_name}</h1>
    <p className='Overview'>Overview</p>
    <div>
      <p>Two Factor Authentication</p>
      <p> <Switch {...label} defaultChecked color="secondary"  /></p>
    </div>
    <div className='userDetails'>
    <div className='user_image'></div>
    <div className='user_Data'>
    <p> Full Name: {userData?.first_name + userData?.last_name}</p>
    <p></p>
    <p></p>
    <p></p>
    <p></p>
    </div>
    </div>
    <div className='dukaan_Home'>
      <div className='share_store_link'>
        <p className='share_store_link_text'>Share store link</p>
        <p className='share_store_link_text2'>Customers can visit the following link and place their orders.</p>
        <p className='dukan_Link'><a href="http://127.0.0.1:8000/dukaan=pinu" target="_blank">Visit Your Dukaan</a></p>
        <div className='share_dukaan'>
          <p>Share via</p>
          <div>
          <IconButton>
            <WhatsAppIcon />
          </IconButton>
          <IconButton>
            <FacebookIcon />
          </IconButton>
          <IconButton>
            <TwitterIcon />
          </IconButton>
        </div>
        </div>
      </div>
      <div className='store_total_sales'>
        <p className='Total_sales'>Total Sales</p>
        <p className='Total_sales'>0</p>
        <Chart
              options={state_total_sales.options}
              series={state_total_sales.series}
              type="bar"
              width={300}
            />
      </div>
      <div className='store_views'>
        <div className='Total_sales'>Store Views</div>
        <p className='Total_sales'>0</p>
        <Chart
              options={store_views.options}
              series={store_views.series}
              type="bar"
              width={300}
            />
      </div>
    </div>
    </>
  )
}
