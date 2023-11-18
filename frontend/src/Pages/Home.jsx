import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import "./Home.css"
import { useLayoutEffect } from 'react';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { IconButton } from '@mui/material';
import Chart from "react-apexcharts";
import Switch from '@mui/material/Switch';
import { useNavigate } from 'react-router-dom';
export default function Home() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [otheOwnerShop, setotheOwnerShop] = useState([])
  const label = { inputProps: { 'aria-label': 'Size switch demo' } };
  const [orderData, setOrderData] = useState([]);
  const [twoFactorAuth,settwoFactorAuth] = useState(false);
  const dukaanDate = [];
  const dukanSales = [];
  const dukaanOrder = [];
  let Add_sales = 0;
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
        colors: ["white"],
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
    fetch("http://127.0.0.1:8000/mydetails")
      .then(res => res.json())
      .then(data => {
        setUserData(data);
        settwoFactorAuth(data?.basic_info?.two_factor_auth);
      })
  }, [])

  useLayoutEffect(() => {
    fetch("http://127.0.0.1:8000/orderdetails")
      .then(res => res.json())
      .then(datas => setOrderData(datas.data))
  }, []);



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

  const newMember = otheOwnerShop?.filter(data => data["perms"].includes("WRITE"))
  console.log(dukaanlist);

  for (let x of dukanSales) {
    Add_sales += x;
  }
  for (let x of dukaanOrder) {
    Add_orders += x;
  }
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
  const handleChange = (event) => {
    // console.log(event.target.checked
    //   )
    fetch('http://127.0.0.1:8000/mydetails', {

      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        'X-CSRFToken': csrftoken,
      },
      withCredentials: true,
      body: JSON.stringify({ 'two_factor_auth': event.target.checked }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

  }
  console.log(userData?.basic_info?.two_factor_auth == true);
  function twoFactor(){
    if(userData?.basic_info?.two_factor_auth){
      return (
        <p> <Switch
          defaultChecked
          onChange={handleChange} {...label} color="secondary" /></p>
      )
    }
    else{
      return(
        <p> <Switch
          onChange={handleChange} {...label} color="secondary" /></p>
      )
    }
        
      
    }
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
    <>
      <div className='home_hdr'>
      <h1 className='welcome_back'>Welcome Back {userData?.basic_info?.first_name}</h1>
      <Button variant="contained" size="large" onClick = {handlelogout}
      color="secondary"
      >
          Log Out
        </Button>
      </div>
      <p className='Overview'>Overview</p>
      <div>
        <p>Two Factor Authentication</p>
        {
          twoFactorAuth && twoFactor()
        }
        {
          twoFactorAuth || twoFactor()
        }



      </div>
      <div className='userDetails'>
        <div className='user_image'>
          <img src={userData?.basic_info?.profile_pic} className="dukan_log_imgg" />
        </div>
        <div className='user_Data'>
          <p> <span className='dukaan_name'>Full Name:</span> <span className='dukaan_name-value'>{userData?.basic_info?.first_name}  {userData?.basic_info?.last_name}</span></p>
          <p> <span className='dukaan_name'>Created:</span> <span className='dukaan_name-value'>{userData?.basic_info?.date_joined.split("T")[0]}</span></p>
          <p><span className='dukaan_name'>E-mail: </span> <sapn className='dukaan_name-value'>{userData?.basic_info?.email}</sapn></p>
          <p><span className='dukaan_name'>Mobile/Phone: </span> <sapn className='dukaan_name-value'>{userData?.basic_info?.phone_no}</sapn></p>
          <p></p>
        </div>
      </div>
      <div className='dukaan_Home'>
        {[...dukaanlist, ...newMember].map((data) => {
          return (
            <div className='share_store_link'>
              <p className='share_store_link_text'>Share store link</p>
              <p className='share_store_link_text2'>Customers can visit the following link and place their orders.</p>
              <div className='dukaan_details_body'>
                <div className='Dukaan_logo'>
                  <img src={data.logo} className='img_logo_dukaan' />
                </div>
                <div className='dukaan_info'>
                  <p><span className='dukaan_name'>Dukaan Name:</span> <span className='dukaan_name-value'>{data.name}</span></p>
                  <p><span className='dukaan_name'>Created:</span> <sapn className='dukaan_name-value'>{data.created_at.split("T")[0]
                  }</sapn></p>
                  <p className='dukan_Link'><a href={`http://127.0.0.1:8000/dukaan=${data.slug}`} target="_blank">Visit Your Dukaan</a></p>
                </div>
              </div>
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
          )
        })}

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
    </>
  )
}


