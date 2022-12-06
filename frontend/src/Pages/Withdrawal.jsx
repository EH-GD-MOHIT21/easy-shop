import React from 'react'
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';import { useLayoutEffect } from 'react';
export default function Withdrawal() {
    const [otheOwnerShop, setotheOwnerShop] = useState([])
    const [productList, setProductList] = useState([]);
    const [selctDukaan, setSelectDukaan] = React.useState("");
    const [dukaanlist, setdukaanlist] = useState([]);
    const [status,setStatus] = useState([])

    const [Amount, setAmount] = useState("");
    const [PanNumber, setPanNumber] = useState("");
    const [AccountDetails,setAccountDetails] = useState("");
    const [dukaan_slug,setdukaan_slug] = useState("")
    const selectDukaan = (e) => {
        console.log(e.target.value)
        setSelectDukaan(e.target.value);
        getExistingProduct(e.target.value);
        setdukaan_slug(e.target.value)
    }

    function getExistingDukaan() {
        fetch('http://127.0.0.1:8000/createorgetdukaan')
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setdukaanlist(data.owner_shop)
                setotheOwnerShop(data.other_owner_shop)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    useEffect(getExistingDukaan, []);

    function getExistingProduct(selctDukaan) {
        fetch(`http://127.0.0.1:8000/createorgetproduct?dukaan=${selctDukaan.toLowerCase().split(" ").join("-")}&category=cat_all`)
            .then((response) => response.json())
            .then((datas) => {
                setProductList(datas.data)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    const newMember = otheOwnerShop.filter(data => data["perms"].includes("WRITE"));
    const handleSubmit = ()=>{
        const data = {
            panno: PanNumber,
            dukaan:dukaan_slug,
            amount:Amount,
            additional_details: AccountDetails
        }
            fetch('http://127.0.0.1:8000/withdrawlreq', {
    
                method: "POST",
    
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
                    // getExistingDukaan();
                })
                .catch((error) => {
                    console.error('Error:', error);
                });

    }
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

    useLayoutEffect(() => {
        fetch('http://127.0.0.1:8000/withdrawlreq')
        .then((res)=>res.json())
        .then(data=>setStatus(data))
   
    }, [])
    console.log(status);
    return (
        <div>
            <div className='Select_Dukaan'>
                <select name="dukaan" required className='selct_dukaan' onChange={selectDukaan}>
                    <option value="" disabled selected hidden className='opt_dukaan'>Select a Dukaan</option>
                    {
                        [...dukaanlist, ...newMember].map((data) => {
                            return (
                                <option value={data.slug} className='opt_dukaan'>{data.slug} - {data.name}</option>
                            )
                        })
                    }
                </select>

                <div className='productInfo_body'>
                    <p className='label'>PAN NUMBER *
                    </p>
                    <input type="text" placeholder='ENTER YOUR PAN NUMBER' className='productInfoInput' required onChange={(e) => setPanNumber(e.target.value)} />

                    <p className='label'>AMOUNT *
                    </p>

                    <input type="text" placeholder='ENTER AMOUNT' className='productInfoInput' required onChange={(e) => setAmount(e.target.value)} />

                    <p className='label'>ACCOUNT DETAILS *
                    </p>

                    <input type="text" placeholder='ACCOUNT DETAILS' className='productInfoInput' required onChange={(e) => setAccountDetails(e.target.value)} />

                </div>
                <Button color='secondary'
                variant="contained" size="large" onClick={handleSubmit}>
                    SUBMIT
                </Button>
            </div>
        </div>
    )
}
