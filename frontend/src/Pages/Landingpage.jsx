import React, { useLayoutEffect } from 'react';
import "./Landingpage.css"
import Button from '@mui/material/Button';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';

function Landingpage() {
    const nevigate = useNavigate();
    useLayoutEffect(function(){
        const options = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            withCredentials: true 
        };
        
        axios.get('http://127.0.0.1:8000/isauthenticated', options)
        .then(response => {
            if(response.data['message']==true){
                window.location.replace('/UserHome')
            }
        })
        .catch(error => console.log(error));
    },[])
    return (
        <div className='Landingpage'>
            <div className='Landing_page'>
                <div className='Landingpage_Header'>
                    <div className='Landing_Header_left'>
                        <p>Apni <span className='dukan_logo'>Dukaan</span></p>
                        <p><ShoppingBagIcon className='Apni_dukan_icon' /></p>
                    </div>
                    <div className='Landing_Header_right'>
                        <span className='Sign_btn'
                        onClick={()=> nevigate("/userLogin")}
                        >
                            Sign In
                        </span>
                        <Button variant="contained" color="secondary" size="large" 
                        onClick={()=> nevigate("/CreateAccount")}
                        >
                        

                        Sign Up
                      
                        </Button>

                    </div>

                </div>
                <div className='Landingpage_Body'>
                    <div className='Landingpage_Body_left'>
                        <div className='LAnding_left_body'>
                        <h1 className='landing_page_heading'>Start <span className='Landing_Slling'>Selling</span> Online.</h1>
                        <p className='Landingpage_text'>Get your store up and running in less than 30 seconds. It's really that easy!</p>
                        <Button variant="contained" color="secondary" size="large" className='Start-selling_btn'
                        onClick={()=> nevigate("/CreateAccount")}
                        >Start Selling</Button>
                        </div>
                    </div>
                    <div className='Landingpage_Body_right'>
                        <img src='/Images/Shopimg.svg' className='Landing_shoping_img'/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Landingpage;