import React from 'react'
import "./DesignOneHeader.css"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PersonIcon from '@mui/icons-material/Person';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import IconButton from '@mui/material/IconButton';

export default function  () {
  return (
    <div className='Design_One_Header'>
        <div className='Design_Header'>
        <div className='Header_left'>PINU</div>
        <div className='Header_right'>
        <IconButton className='Design_Header_Icon'><FavoriteBorderIcon className='Design_icon' /></IconButton>
        <IconButton className='Design_Header_Icon'><WorkOutlineIcon className='Design_icon' /></IconButton>
        <IconButton className='Design_Header_Icon'><PersonIcon className='Design_icon' /></IconButton>
        </div>
        </div>
    </div>
  )
}
