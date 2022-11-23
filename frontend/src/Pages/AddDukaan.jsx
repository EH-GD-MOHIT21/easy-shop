
import JoditEditor from 'jodit-react';
import "./Adddukan.css"
import React from 'react'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import ProductDescription from '../Components/ProductDescription';
import CameraEnhanceIcon from '@mui/icons-material/CameraEnhance';
import { makeStyles } from '@mui/styles';
import { useState } from "react";
import Button from '@mui/material/Button';
import RemoveIcon from '@mui/icons-material/Remove';
import "./Addproducts.css"
import { Alert } from '@mui/material';
import { set } from "react-hook-form";
import { useRef } from "react";
const useStyles = makeStyles(theme => ({
    accordian: {
        backgroundColor: "tran !important"
    },
    fabButton: {
        marginTop: 22
    }
}))
export default function AddDukaan() {
    const editor = useRef(null);
    const classes = useStyles();
    const [DukaanName, setDukaanName] = useState("");
    const [DukaanCategory, setDukaanCategory] = useState("");
    const [DukaanDescription, setDukaanDescription] = useState("");
    const nevigate = useNavigate();
    const [shareImage, setshareImage] = useState("");
    const [tagLine, setTagLine] = useState("");
    const [DukaanAddress,setDukaanAddress] = useState("");
    const [Add_Dukkan, setAdd_Dukkan] = useState(true)
    const imagevalueChange = (e) => {

        const image = e.target.files[0];
        if (image === "" || image === undefined) {
            alert(`Not an a image , the file is ${typeof image}`);
        }
        console.log(image)
        setshareImage(image);
    }


    const SubmitAddDukaan = (e) => {
        e.preventDefault();
        const data = { DukaanName, DukaanCategory, DukaanDescription, tagLine, DukaanAddress,shareImage }
        console.log(data)
    }
    const handleAddDukaan = () => {
        setAdd_Dukkan(false)
    }
    const handleremoveDukaan = () => {
        setAdd_Dukkan(true)
    }

   
    return (
        <div className='Addprroducts'>
            <div className="Show_Dukaan">
                <p className="Ext_dukaan">Existing Dukaan</p>
                <div className='Existing_Dukaans'>
                    <div className='Existing_Dukaan'>
                        <img className="Existing_Dukaan_logo" src='https://avatars.githubusercontent.com/u/78958441?v=4' />
                    </div>
                    <div className='Existing_Dukaan' >
                        <img className="Existing_Dukaan_logo" src='https://avatars.githubusercontent.com/u/78958441?v=4' />
                    </div>
                    <div className='Existing_Dukaan'>
                        <img className="Existing_Dukaan_logo" src='https://avatars.githubusercontent.com/u/78958441?v=4' />
                    </div>
                    <div className='Existing_Dukaan'>
                        <img className="Existing_Dukaan_logo" src='https://avatars.githubusercontent.com/u/78958441?v=4' />
                    </div>  <div className='Existing_Dukaan'>
                        <img className="Existing_Dukaan_logo" src='https://avatars.githubusercontent.com/u/78958441?v=4' />
                    </div>  <div className='Existing_Dukaan'>
                        <img className="Existing_Dukaan_logo" src='https://avatars.githubusercontent.com/u/78958441?v=4' />
                    </div>  <div className='Existing_Dukaan'>
                        <img className="Existing_Dukaan_logo" src='https://avatars.githubusercontent.com/u/78958441?v=4' />
                    </div>  <div className='Existing_Dukaan'>
                        <img className="Existing_Dukaan_logo" src='https://avatars.githubusercontent.com/u/78958441?v=4' />
                    </div>

                </div>
            </div>

            <div className="Add_product_sextion">
                {
                    Add_Dukkan == true ? <Button variant="contained" size="large" color="secondary" endIcon={<AddIcon />} onClick={handleAddDukaan}>
                        Add New Dukaan
                    </Button>

                        :

                        <Button variant="contained" size="large" color="secondary" endIcon={<RemoveIcon />} onClick={handleremoveDukaan}>
                            Terminate
                        </Button>
                }
            </div>

            {
                Add_Dukkan || <form onSubmit={SubmitAddDukaan}>
                    <div className='addProductHeader'>
                        <div>
                            <div className='addproduct_left_header'>


                                <p className='addProductText'>Add New Dukaan</p>
                            </div>
                        </div>
                        <Fab variant="extended" color="secondary" type="submit">
                            <AddIcon sx={{ mr: 1 }} />
                            Add New Dukaan
                        </Fab>
                    </div>
                    <div className='Add_product_body'>

                        <div className='productInformation'>
                            <div className='productInfo_Header'>
                                Dukaan Information
                            </div>
                            <div className='productInfo_body'>
                                <p className='label'>Dekaan Name *
                                </p>
                                <input type="text" placeholder='Enter Dukaan Name' className='productInfoInput' required onChange={(e) => setDukaanName(e.target.value)} />
                                <p className='label'>Dukaan Category *
                                </p>
                                <input type="text" placeholder='Enter Dukaan Category' className='productInfoInput' required onChange={(e) => setDukaanCategory(e.target.value)} />

                                <p className='label'>Dukaan Tagline *
                                </p>
                                <input type="text" placeholder='Enter Dukaan Tagline' className='productInfoInput' required onChange={(e) => setTagLine(e.target.value)} />

                                <p className='label'>Dukaan Address *
                                </p>
                                <input type="text" placeholder='Enter Dukaan Address' className='productInfoInput' required onChange={(e) => setDukaanAddress(e.target.value)} />
                                <p className='label'>Dukaan Description *
                                </p>
                                <JoditEditor
                                    className="ProductDescription"
                                    required
                                    value=""
                                    ref={editor}
                                    config={{ theme: 'dark', }}
                                    onChange={(content) => setDukaanDescription(content)}
                                />

                            </div>

                        </div>

                        <div className='productInformation'>
                            <p className='label'>Dukaan Logo  *
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
                                    shareImage  && (
                                        <div className='productphotos'>
                                            <div className='product_photo'>
                                                <img src={shareImage && URL.createObjectURL(shareImage)} className="product_images" />
                                            </div>
                                        </div>
                                    )
                                }


                            </div>
                        </div>



                    </div>
                </form>
            }
        </div>


    )
}