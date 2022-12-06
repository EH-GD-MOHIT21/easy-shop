import * as React from 'react';
import { handleDukaan } from '../Redux/DukaanSlice';
import { useState, useEffect } from 'react';
import "./Product.css"
import SearchIcon from '@mui/icons-material/Search';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export default function ProductPage({setdukaanName,dukaanName}) {
  const [otheOwnerShop,setotheOwnerShop] = useState([])
  const nevigate = useNavigate();
  const [selctDukaan, setSelectDukaan] = React.useState("");
  const [dukaanlist, setdukaanlist] = useState([]);
  const [productList, setProductList] = useState([]);
  const ClickToSearch = () => {
    const search = document.querySelector(".search");
    const input = document.querySelector(".input");
    search.classList.toggle("active");
    input.focus();
  }
  const selectDukaan = (e) => {
    console.log(e.target.value)
    setSelectDukaan(e.target.value);
    getExistingProduct(e.target.value);
    setdukaanName(e.target.value);
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

  function getExistingProduct(selctDukaan) {
    fetch(`http://127.0.0.1:8000/createorgetproduct?dukaan=${selctDukaan.toLowerCase().split(" ").join("-")}&category=cat_all`)
      .then((response) => response.json())
      .then((datas) => {
        setProductList(datas.data)
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
const newMember = otheOwnerShop.filter(data=>data["perms"].includes("WRITE"));
console.log(dukaanlist)
  return (
    <div className='product_page'>
      <div className='Product_Header'>
        <div class="search">
          <input type="text" class="input" placeholder="Seach..." />
          <button class="btn" onClick={ClickToSearch}>
            <SearchIcon className='Search_icon' />
          </button>
        </div>
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
        <Fab variant="extended" color="secondary" onClick={() => nevigate("/UserHome/Products/Addproducts")} disabled={!selctDukaan ? true : false} >
          <AddIcon sx={{ mr: 1 }} />
          Add Product
        </Fab>
      </div>

      <div className='Product_content'>
        {/* <div className='Product_content_Header'>
          {ProductList.map((data) => {
            return (<p>{data}</p>)
          })}
        </div> */}

       {
        selctDukaan || (
          <div className='Prouct_Body'>
          <div className='empty_product'>
            <img src='/Images/EmptyProducts.svg' className='Empty_product_Img' />
            <Typography variant="h4" gutterBottom>
              Add products to your online store
            </Typography>
            <Typography variant="h6" gutterBottom>
              It takes only few seconds to add your products and start selling to the customers.re
            </Typography>
            <Button variant="contained" size="large" className='Add' color="secondary" onClick={() => nevigate("/UserHome/Products/Addproducts")} disabled={!selctDukaan ? true : false}>
              Add new products
            </Button>
          </div>
        </div>
        )
       }
      </div>
      <div className='Dukaan_products'>
        {
          productList.map((data)=>{
            return(
              <div className='dukaan_product'>
                <div className='dukaan_peoducts_left'>
                <img src={data?.images[0]?.url} className="prduct_img" />
                </div>
                <div className='dukaan_products_right'>
                  <p>Category: {data?.category}</p>
                  <p>Description: {data?.description}</p>
                  <p>Price: {data?.discounted_price} {data?.price}</p>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}
