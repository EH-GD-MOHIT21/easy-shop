import React, { useLayoutEffect } from 'react'
import "./DesignBody.css"
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

export default function DesignOneBody() {
    const navigate = useNavigate();
    const { dukaan } = useParams();
    console.log(dukaan);
    const [data, setData] = useState([]);

    useLayoutEffect(() => {
        function getData() {
            fetch(`http://127.0.0.1:8000/listdukaancategory?slug=${dukaan}`)
                .then((res) => res.json())
                .then((res) => setData(res['category']))
        }
        getData();
    }, [])
    console.log(data);
    return (
        <div className='DesignOneBody'>
            <p className='Heading-Top'>Top categories</p>
            <div>
                <div className='designCategory'>
                {data?.map((d1) => {
                    return (
                        <div className='Category_Card' onClick={() => navigate(`category=${d1.category}/AllProducts`)}>
                        <div className='Category_Card_Header'>
                            <img className='Header_Img' src={'/media/'+d1?.images[0]} />
                        </div>
                        <div className='Category_Card_Body' >
                            <p className='category_Title'>{d1?.category}</p>
                            <IconButton className='Design_Header_Icon'> <ArrowForwardIcon /> </IconButton>
                        </div>
                    </div>
                    )
                })}
                </div>
            </div>
        </div>
    )
}
