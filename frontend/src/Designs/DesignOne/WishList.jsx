import React from 'react'
import "./WishList.css";
import { useLayoutEffect, useState } from 'react';
export default function WishList() {
  const [wishlistData, setwishlistData] = useState([]);
  useLayoutEffect(() => {
    fetch("http://127.0.0.1:8000/listwishlist")
      .then((res) => res.json())
      .then((datas) => setwishlistData(datas.data))
  }, [])
  console.log(wishlistData[0]?.product);
  return (
    <div className='WishList'>


       {
        wishlistData?.map((data) => {
          return (
            <div className='wishlist_product'>
              <div className='product_img'>
                <img className='prdct_img' src={data?.product?.images[0].url} />
              </div>
              <div className='prdct_title'>{data?.product?.name}</div>
            </div>
          )
        })
      } 



    </div>



  )
}
