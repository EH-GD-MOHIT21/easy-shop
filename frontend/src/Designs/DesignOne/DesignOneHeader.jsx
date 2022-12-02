import React from 'react'
import "./DesignOneHeader.css"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PersonIcon from '@mui/icons-material/Person';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import IconButton from '@mui/material/IconButton';
import { useNavigate, useParams } from 'react-router-dom';
export default function  () {
  const navigate = useNavigate();
  const {dukaan} = useParams();
  return (
    <div className='Design_One_Header'>
        <div className='Design_Header'>
        <div className='Header_left' onClick={()=> navigate("")}>{dukaan.toUpperCase().replaceAll("-"," ")}</div>
        <div className='Header_right'>
        <IconButton className='Design_Header_Icon' onClick={()=> navigate("Wishlist")}><FavoriteBorderIcon className='Design_icon' /></IconButton>
        <IconButton className='Design_Header_Icon' onClick={()=> navigate("AddCart")}><WorkOutlineIcon className='Design_icon' /></IconButton>
        <IconButton className='Design_Header_Icon' onClick={()=> navigate("Account")}><PersonIcon className='Design_icon' /></IconButton>
        </div>
        </div>
    </div>
  )
}
