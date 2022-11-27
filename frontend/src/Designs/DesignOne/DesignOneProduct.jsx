import React from 'react'
import { useNavigate } from 'react-router-dom'
export default function DesignOneProduct() {
    const navigate = useNavigate();
    return (
        <div className='DesignOneBody'>
        <p className='Heading-Top'>Saree</p>
        <div>
        <div className='designCategory'>
        <div className='Category_Card'>
            <div className='Category_Card_Header'>
                <img className='Header_Img' src='https://cdn3.mydukaan.io/app/image/500x500/?url=https://dukaan-us.s3.amazonaws.com/6963100/96a02c56-db7d-4dd4-a1c3-9cd0850e0181/frame-19-e43ebbf5-5cb1-430b-9906-bd62052ab76d-ee6410d2-19b7-4f3c-bfe1-38339b5cfbfc.png' />
            </div>
            <div className='Product_Card_Body' >
                <p className='product_title'>Classic Dress</p>
                <p className='product_price'>₹90 ₹120 (25% OFF)</p>
                <p className='Add_to_beg' onClick={()=>navigate("productPage")}>View Product</p>
            </div>
        </div>

       
        </div>
        </div>
    </div>
    )
}
