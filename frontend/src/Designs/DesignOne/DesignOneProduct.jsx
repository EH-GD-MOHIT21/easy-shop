import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function DesignOneProduct() {
    const {dukaan, category} = useParams();
    const [Data, setData] = useState([]);
    useLayoutEffect(() => {
        function getData() {
            fetch(`http://127.0.0.1:8000/createorgetproduct?dukaan=${dukaan}&category=${category}`)
                .then((res) => res.json())
                .then((res) => setData(res['data']))
        }
        getData();
    }, [])
    const navigate = useNavigate();
    console.log(Data);
    return (
        <>
            {Data?.map((d1) => {
                return (
                    <div className='DesignOneBody'>
                        <p className='Heading-Top'>{d1?.category}</p>
                        <div>
                            <div className='designCategory'>
                                <div className='Category_Card'>
                                    <div className='Category_Card_Header'>
                                        <img className='Header_Img' src={d1?.images[0].url} />
                                    </div>
                                    <div className='Product_Card_Body' >
                                        <p className='product_title'>{d1?.name}</p>
                                        <p className='product_price'>₹{d1?.discounted_price} ₹{d1?.price} ({(((d1?.price-d1?.discounted_price)/d1?.price)*100).toFixed(2)}% OFF)</p>
                                        <p className='Add_to_beg' onClick={() => navigate(`productPage/prodid=${d1?.id}`)}>View Product</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </>
    )
}
