import React from 'react'
import "./ProductDiplay.css"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export default function ProductDiplay() {
    return (
        <div className='ProductDiplay'>
            <div className='Small_img'>
                <div className='small_img_container'>
                    <img className='Zoom_img' src='https://cdn3.mydukaan.io/app/image/700x700/?url=https://dukaan-us.s3.amazonaws.com/6963100/96a02c56-db7d-4dd4-a1c3-9cd0850e0181/frame-68-acd8f358-b66a-490c-973f-8cc4251dbd06-11c2e911-759d-4950-bdab-5c6edf7aad1d.png' />
                </div>
            </div>
            <div className='Big_image'>
                <img className='Zoom_img' src='https://cdn3.mydukaan.io/app/image/700x700/?url=https://dukaan-us.s3.amazonaws.com/6963100/96a02c56-db7d-4dd4-a1c3-9cd0850e0181/frame-68-acd8f358-b66a-490c-973f-8cc4251dbd06-11c2e911-759d-4950-bdab-5c6edf7aad1d.png' />
            </div>
            <div className='productDisplay_last'>
                <div className='Display_title'>
                Classic Dress
                </div>
                <p className='Product_price'>₹200 ₹220 (9% OFF)</p>
                <p className='Size'>Size</p>
                <p></p>
                <p className='Size'>Description</p>
                <p className='display_discription'>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
                <div className='Display_details_bottom'>
                    <p className='Wish'>
                    <FavoriteBorderIcon />
                    <p>Wishlist</p>
                    </p>
                    <p className='add_bags'>Add to bag</p>
                </div>
            </div>
        </div>
    )
}
