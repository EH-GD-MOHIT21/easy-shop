import React from 'react'
import "./Home.css"
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { IconButton } from '@mui/material';
export default function Home() {
  return (
    <div className='dukaan_Home'>
      <div className='share_store_link'>
        <p className='share_store_link_text'>Share store link</p>
        <p className='share_store_link_text2'>Customers can visit the following link and place their orders.</p>
        <p className='dukan_Link'>mydukaan.io/pinu27</p>
        <div className='share_dukaan'>
          <p>Share via</p>
          <div>
          <IconButton>
            <WhatsAppIcon />
          </IconButton>
          <IconButton>
            <FacebookIcon />
          </IconButton>
          <IconButton>
            <TwitterIcon />
          </IconButton>
        </div>
        </div>
      </div>
      <div className='store_total_sales'>store_total_sales</div>
      <div className='store_views'>
        <div>store_views</div>
        
      </div>
    </div>
  )
}
