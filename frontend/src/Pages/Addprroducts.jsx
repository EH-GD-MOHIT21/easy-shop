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
import { Alert } from '@mui/material';

const useStyles = makeStyles(theme => ({
    accordian: {
        backgroundColor: "tran !important"
    },
    fabButton: {
        marginTop: 22
    }
}))
export default function Addprroducts({ dukaanName, setdukaanName }) {
    const classes = useStyles();
    const [productName, setproductName] = useState("");
    const [productCategory, setproductCategory] = useState("");
    const [producPrice, setproductPrice] = useState("");
    const [discountedPrice, setDiscountedPrice] = useState("");
    const [productDescription, setproductDescription] = useState("");
    const [imageList, setimageList] = useState([]);
    const [Addvarient, setAddvarient] = useState([]);
    const nevigate = useNavigate();
    const [shareImage, setshareImage] = useState("");
    const imagevalueChange = (e) => {
        if (imageList.length > 8) {
            Alert("Can't Add more Pics")
        }
        else {
            const image = e.target.files[0];
            if (image === "" || image === undefined) {
                alert(`Not an a image , the file is ${typeof image}`);
            }
            setshareImage(image);
            setimageList([...imageList, image])
        }
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

    const DeleteVarient = (idx) => {
        const newVarient = Addvarient.filter((data, id) => id != idx);
        setAddvarient(newVarient)
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
    const submitProductDetails = (e) => {
        e.preventDefault();
        const uploadData = new FormData();
        uploadData.append("productName", productName);
        uploadData.append("dukaan", dukaanName.toLowerCase().split(" ").join("-"));
        uploadData.append("productDescription", productDescription);
        uploadData.append("productCategory", productCategory);
        uploadData.append("productPrice", producPrice);
        uploadData.append("discountedPrice", discountedPrice);
        for(let x of imageList){
            uploadData.append("imageList", x);
        }
        uploadData.append("Addvarient", Addvarient);


        fetch('http://127.0.0.1:8000/createorgetproduct', {

            method: 'POST',

            headers: {
                'X-CSRFToken': csrftoken,
            },
            withCredentials: true,
            body: uploadData,
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data); 
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }
    console.log(imageList)
    return (
        <div className='Addprroducts'>
            <form onSubmit={submitProductDetails}>
                <div className='addProductHeader'>
                    <div>
                        <div className='addproduct_left_header'>
                            <IconButton className='Icon_Button' onClick={() => nevigate("/UserHome/Products")}>
                                <ArrowBackIcon className='BackArrow' />
                            </IconButton>

                            <p className='addProductText'>Add new product</p>
                        </div>
                    </div>
                    <Fab variant="extended" color="secondary" onClick={() => nevigate("/UserHome/Products/Addproducts")} type="submit">
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
                            <input type="text" placeholder='Enter Product Name' className='productInfoInput' required onChange={(e) => setproductName(e.target.value)} />
                            <p className='label'>Product Category *
                            </p>
                            <input type="text" placeholder='Enter Product Category' className='productInfoInput' required onChange={(e) => setproductCategory(e.target.value)} />
                            <div className='product_pricing'>
                                <div className='product_pricing_child'>
                                    <p className='label'>Price *
                                    </p>
                                    <input type="number" placeholder='Enter Product Price' className='productInfoInput' required onChange={(e) => setproductPrice(e.target.value)} />
                                </div>
                                <div className='product_pricing_child'> <p className='label'>Discounted Price

                                </p>
                                    <input type="number" placeholder='Enter Discounted Price' className='productInfoInput'
                                        onChange={(e) => setDiscountedPrice(e.target.value)} required /></div>
                            </div>
                            <p className='label'>Product Description *
                            </p>
                            <ProductDescription setproductDescription={setproductDescription} />


                        </div>

                    </div>

                    <div className='productInformation'>
                        <p className='label'>Product Media (up to 6) *
                        </p>
                        <div className='Mix_Productmedia_photos'>
                            <div className='productMedia'>
                                <input
                                    type="file"
                                    accept="image/gif , image/jpeg , image/png"
                                    name="image"
                                    id="file"
                                    style={{ display: "none" }}
                                    onChange={imagevalueChange}
                                    required

                                />
                                <div className='inputPhoto'>
                                    <label htmlFor="file" >
                                        <CameraEnhanceIcon className='camera_Icon' />
                                    </label>
                                </div>
                            </div>

                            {
                                imageList.length > 0 && (
                                    imageList.map((data) => {
                                        return (
                                            <div className='productphotos'>
                                                <div className='product_photo'>
                                                    <img src={shareImage && URL.createObjectURL(data)} className="product_images" />
                                                </div>
                                            </div>
                                        )
                                    })
                                )
                            }

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
                                            <Fab size="small" color="secondary" aria-label="add" onClick={() => DeleteVarient(idx)}>
                                                <DeleteIcon />
                                            </Fab>
                                        </div>
                                    </div>
                                )

                            })
                        }

                    </div>



                </div>
            </form>
        </div>


    )
}
