
import JoditEditor from 'jodit-react';
import "./Adddukan.css"
import React from 'react'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import isAuthenticat from '../HelperFunction/isAuthenticat;';
import CameraEnhanceIcon from '@mui/icons-material/CameraEnhance';
import { makeStyles } from '@mui/styles';
import { useState } from "react";
import Button from '@mui/material/Button';
import RemoveIcon from '@mui/icons-material/Remove';
import "./Addproducts.css";
import { useRef } from "react";
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { DukaanSelect } from '../Redux/DukaanSlice';
import AlertDialogSlide from './AddDukanDialog';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import ChromeReaderModeIcon from '@mui/icons-material/ChromeReaderMode';
const useStyles = makeStyles(theme => ({
    accordian: {
        backgroundColor: "tran !important"
    },
    fabButton: {
        marginTop: 22
    }
}))
export default function AddDukaan() {
    const [otherShop, setOtherShop] = useState([])
    const editor = useRef(null);
    const classes = useStyles();
    const changeDukaan = useSelector(DukaanSelect);
    const [DukaanName, setDukaanName] = useState("");
    const [DukaanCategory, setDukaanCategory] = useState("");
    const [DukaanDescription, setDukaanDescription] = useState("");
    const nevigate = useNavigate();
    const [shareImage, setshareImage] = useState("");
    const [tagLine, setTagLine] = useState("");
    const [DukaanAddress, setDukaanAddress] = useState("");
    const [auth, setAuth] = useState(false);
    const [ExistingDukaan, setExistingDukaan] = useState([]);
    const [Add_Dukkan, setAdd_Dukkan] = useState(true)
    const imagevalueChange = (e) => {
        console.log(e)
        const image = e.target.files[0];
        if (image === "" || image === undefined) {
            alert(`Not an a image , the file is ${typeof image}`);
        }
        console.log(image)
        setshareImage(image);
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


    const SubmitAddDukaan = (e) => {
        e.preventDefault();
        const data = { name: DukaanName, category: DukaanCategory, description: DukaanDescription, intro: tagLine, seller_address: DukaanAddress, logo: shareImage };

        const uploadData = new FormData();
        uploadData.append("name", DukaanName);
        uploadData.append("category", DukaanCategory);
        uploadData.append("description", DukaanDescription);
        uploadData.append("intro", tagLine);
        uploadData.append("seller_address", DukaanAddress);
        uploadData.append("logo", shareImage);


        if (auth.data.message) {
            fetch('http://127.0.0.1:8000/createorgetdukaan', {
                // credentials: 'include',
                method: 'POST',
                // mode: 'same-origin',

                headers: {
                    // "Content-Type": "application/json",
                    'X-CSRFToken': csrftoken,
                    // 'Content-Type':'multipart/form-data',
                },
                withCredentials: true,
                body: uploadData,
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log('Success:', data);
                    getExistingDukaan();
                    setAdd_Dukkan(true)
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
        else {
            nevigate("/")
        }


    }
    const handleAddDukaan = () => {
        setAdd_Dukkan(false)
    }
    const handleremoveDukaan = () => {
        setAdd_Dukkan(true)
    }
    console.log(auth);
    useEffect(() => isAuthenticat(setAuth), []);

    function getExistingDukaan() {


        fetch('http://127.0.0.1:8000/createorgetdukaan')
            .then((response) => response.json())
            .then((data) => {
                console.log(data.other_owner_shop)
                setOtherShop(data.other_owner_shop)
                setExistingDukaan(data.owner_shop)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    useEffect(getExistingDukaan, []);
    const DeleteVarient = (slug) => {
        fetch('http://127.0.0.1:8000/deletedukaan', {

            method: "POST",

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            withCredentials: true,
            body: JSON.stringify({dukaan:slug}),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                getExistingDukaan();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    return (
        <div className='Addprroducts'>
            <div className="Show_Dukaan">
                <p className="Ext_dukaan">Existing Dukaan</p>
                <div className='Existing_Dukaans'>
                    {
                        ExistingDukaan.map((data) => {
                            const a = data.name.split(" ").slice(0,3);
                            console.log(a)
                            return (
                                <div className='Existing_Dukaan'>
                                    <img className="Existing_Dukaan_logo" src={data?.logo} />
                                    <div className='Exiting_dukan_name'>{a.join(" ")}
                                        <Fab size="small" color="secondary" aria-label="add"
                                            onClick={() => DeleteVarient(data.slug)}
                                        >
                                            <DeleteIcon />
                                        </Fab>
                                    </div>
                                    <div className='Exiting_dukan_name'>
                                        <Button variant="contained" size="large" color="secondary">

                                            <a target="_blank" href={`http://127.0.0.1:8000/dukaan=${data.slug}`}>View</a>
                                        </Button>
                                        <AlertDialogSlide slug={data.slug} />
                                    </div>
                                </div>
                            )
                        })
                    }



                </div>

            </div>

            <div className="Show_Dukaan">
                <p className="Ext_dukaan">Other Dukaan</p>
                <div className='Existing_Dukaans'>
                    {
                        otherShop.map((data) => {
                            return (
                                <div className='Existing_Dukaan'>
                                    <img className="Existing_Dukaan_logo" src={data?.logo} />
                                    <div className='Exiting_dukan_name'>{data.name}

                                    </div>
                                    <div className='Exiting_dukan_name'>
                                        <div> Permissions: </div>

                                        <div><ChromeReaderModeIcon /></div>
                                        <div>{data.perms.includes("WRITE") && <CreateIcon />}</div>
                                        <div>{data.perms.includes("DELETE") && <DeleteIcon />}</div>

                                    </div>
                                </div>
                            )
                        })
                    }



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
                                <p className='label'>Dukaan Name *
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
                                    shareImage && (
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