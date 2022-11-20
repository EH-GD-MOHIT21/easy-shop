import React from 'react'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import ProductDescription from '../Components/ProductDescription';
import CameraEnhanceIcon from '@mui/icons-material/CameraEnhance';
import { makeStyles } from '@mui/styles';
import { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import "./Addproducts.css"

const useStyles = makeStyles(theme => ({
    accordian: {
        backgroundColor: "tran !important"
    },
    fabButton: {
        marginTop: 22
    }
}))
export default function Addprroducts() {
    const [Addvarient, setAddvarient] = useState([]);
    const classes = useStyles();
    const nevigate = useNavigate();
    const [shareImage, setshareImage] = useState("");
    const [open, setOpen] = React.useState(false);
    const imagevalueChange = (e) => {
        const image = e.target.files[0];

        if (image === "" || image === undefined) {
            alert(`Not an a image , the file is ${typeof image}`);
        }
        setshareImage(image);
    };
    const AddvarientComponent = () => {
        setAddvarient([...Addvarient, []])
    }

    const handleChange = (e, i) => {
        Addvarient[i] = { 'varient': e.target.value }
        setAddvarient(Addvarient)

    }
    const handleChangeValues = (e, i) => {
        Addvarient[i]['value'] = e.target.value;
        setAddvarient(Addvarient)
    }
   
    const DeleteVarient = (idx) =>{
        const newVarient = Addvarient.filter((data,id)=> id != idx);
        setAddvarient(newVarient)
    }
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
                        <input type="text" placeholder='Enter Product Name' className='productInfoInput' />
                        <p className='label'>Product Category *
                        </p>
                        <input type="text" placeholder='Enter Product Category' className='productInfoInput' />
                        <div className='product_pricing'>
                            <div className='product_pricing_child'>
                                <p className='label'>Product Name *
                                </p>
                                <input type="text" placeholder='Enter Product name' className='productInfoInput' />
                            </div>
                            <div className='product_pricing_child'> <p className='label'>Product Name *
                            </p>
                                <input type="text" placeholder='Enter Product name' className='productInfoInput' /></div>
                        </div>
                        <p className='label'>Product Description *
                        </p>
                        <ProductDescription />


                    </div>

                </div>

                <div className='productInformation'>
                    <p className='label'>Product Media (up to 8) *
                    </p>
                    <div className='productMedia'>
                        <input
                            type="file"
                            accept="image/gif , image/jpeg , image/png"
                            name="image"
                            id="file"
                            style={{ display: "none" }}
                            onChange={imagevalueChange}

                        />
                        <div className='inputPhoto'>
                            <label htmlFor="file" >
                                <CameraEnhanceIcon className='camera_Icon' />
                            </label>
                        </div>
                    </div>
                </div>
                <div className='productInformation'>
                    <div className='productvarient_Header'>
                        Product Varients
                    </div>
                    <Fab variant="extended" color="secondary"
                        className='fabButton_varients'
                        onClick={AddvarientComponent}
                    >
                        <AddIcon sx={{ mr: 1 }} />
                        Add Varients
                    </Fab>
                    {
                        Addvarient.map((data, idx) => {
                            return (
                                <div className='product_varient' key={idx}>

                                    <div className='product_pricing_child'>
                                        <p className='label'>Additional Variants
                                        </p>
                                        <input type="text" placeholder='Enter additional Variants like color, size' onChange={(event) => handleChange(event, idx)} className='productInfoInput' />
                                    </div>
                                    <div className='product_pricing_child'> <p className='label'>Variants Value
                                    </p>
                                        <input type="text" placeholder='Enter value like red, XXL ' className='productInfoInput'
                                            onChange={(event) => handleChangeValues(event, idx)} />
                                    </div>
                                    <div>
                                        <Fab size="small" color="secondary" aria-label="add" onClick={()=>DeleteVarient(idx)}>
                                            <DeleteIcon />
                                        </Fab>
                                    </div>
                                </div>
                            )

                        })
                    }

                </div>
            </div>
        </div>


    )
}
