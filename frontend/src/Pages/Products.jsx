
import * as React from 'react';
import "./Product.css"
import SearchIcon from '@mui/icons-material/Search';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
const ProductList = ['Product', 'Price', 'Inventory', 'Status', 'Action']
export default function ProductPage() {
  const nevigate = useNavigate();
  const [selctDukaan,setSelectDukaan] = React.useState("")
  const ClickToSearch = () => {
    const search = document.querySelector(".search");
    const input = document.querySelector(".input");
    search.classList.toggle("active");
    input.focus();
  }
const selectDukaan = (e)=>{
  setSelectDukaan(e.target.value)
}
console.log(selctDukaan)
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
            <option value="coffee" className='opt_dukaan'>Coffee</option>
            <option value="tea" className='opt_dukaan'>Tea</option>
            <option value="milk" className='opt_dukaan'>Milk</option>
          </select>
        </div>
        <Fab variant="extended" color="secondary" onClick={() => nevigate("/UserHome/Products/Addproducts")} disabled = {!selctDukaan ? true : false} >
          <AddIcon sx={{ mr: 1 }} />
          Add Product
        </Fab>
      </div>

      {/* Product content */}
      <div className='Product_content'>
        <div className='Product_content_Header'>
          {ProductList.map((data) => {
            return (<p>{data}</p>)
          })}
        </div>

        <div className='Prouct_Body'>
          <div className='empty_product'>
            <img src='/Images/EmptyProducts.svg' className='Empty_product_Img' />
            <Typography variant="h4" gutterBottom>
              Add products to your online store
            </Typography>
            <Typography variant="h6" gutterBottom>
              It takes only few seconds to add your products and start selling to the customers.re
            </Typography>
            <Button variant="contained" size="large" className='Add' color="secondary" onClick={() => nevigate("/UserHome/Products/Addproducts")} >
              Add new products
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
