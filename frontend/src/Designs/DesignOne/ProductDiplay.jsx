import React, { useState } from 'react'
import "./ProductDiplay.css"
import { useLayoutEffect } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate, useParams } from 'react-router-dom';
import { jssPreset } from '@mui/styles';
export default function ProductDiplay() {
    const navigate = useNavigate();
    const { dukaan, category, prodid } = useParams();
    const [productDetails, setproductDetails] = useState(null);
    useLayoutEffect(() => {
        function getData() {
            fetch(`http://127.0.0.1:8000/createorgetproduct?dukaan=${dukaan}&category=${category}&prodid=${prodid}`)
                .then((res) => res.json())
                .then((res) => setproductDetails(res.data))
        }
        getData();
    }, [])

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


    const addWishLish = (id) => {
        const data = {"product_id":id}
        fetch('http://127.0.0.1:8000/listwishlist', {
            method: 'POST',

            headers: {
                'Accept': 'application/json',
        'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            withCredentials: true,
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }


    return (
        <div className='ProductDiplay'>
            <div className='Small_img'>
                <div className='small_img_container'>
                    <img className='Zoom_img' src={productDetails?.images[0]?.url} />
                </div>
            </div>
            <div className='Big_image'>
                <img className='Zoom_img' src={productDetails?.images[1]?.url} />
            </div>
            <div className='productDisplay_last'>
                <div className='Display_title'>
                    {productDetails?.name}
                </div>
                <p className='Product_price'>₹{productDetails?.discounted_price} ₹{productDetails?.price} ({(((productDetails?.price - productDetails?.discounted_price) / productDetails?.price) * 100).toFixed(2)}% OFF)</p>
                <p className='Size'></p>
                <p></p>
                <p className='Size'>Description</p>
                <p className='display_discription'>
                    {productDetails?.description}
                </p>
                <div className='Display_details_bottom'>
                    <p className='Wish' onClick={() => addWishLish(productDetails?.id)}>
                        <FavoriteBorderIcon />
                        <p>Wishlist</p>
                    </p>
                    <p className='add_bags' onClick={() => navigate("MyAddresses")}>Add to bag</p>
                </div>
            </div>
        </div>
    )
}
