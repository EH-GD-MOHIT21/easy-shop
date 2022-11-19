import React from 'react'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import "./Addproducts.css"

export default function Addprroducts() {
    const nevigate = useNavigate()
    return (
        <div className='Addprroducts'>
            <div className='addProductHeader'>
                <div>
                    <div className='addproduct_left_header'>
                        <IconButton className='Icon_Button' onClick={() => nevigate("/UserHome/Products")}>
                            <ArrowBackIcon className='BackArrow' />
                        </IconButton>

                        <p className='addProductText'>Add new product</p>
                    </div>
                </div>
                <Fab variant="extended" color="secondary" onClick={() => nevigate("/UserHome/Products/Addproducts")}>
                    <AddIcon sx={{ mr: 1 }} />
                    Add Product
                </Fab>
            </div>
            <div className='Add_product_body'>
                <div className='productInformation'>
                    <div className='productInfo_Header'>
                        Product Information
                    </div>
                    <div className='productInfo_body'>
                        <p className='label'>Product Name *
                        </p>
                        <input type="text" placeholder='Enter Product Name' />
                        <p className='label'>Product Category *
                        </p>
                        <input type="text" placeholder='Enter Product Category' />
                        <div className='product_pricing'>
                        <div className='product_pricing_child'>
                        <p className='label'>Product Name *
                        </p>
                        <input type="text" placeholder='Enter Product name' />
                        </div>
                       <div className='product_pricing_child'> <p className='label'>Product Name *
                        </p>
                        <input type="text" placeholder='Enter Product name' /></div>
                        </div>
                        <p className='label'>Product Description *
                        </p>
                        <input type="text" placeholder='Enter Product Name' />
                    </div>

                </div>
            </div>
        </div>


    )
}
