import React, { useState } from 'react'
import "./MyAddress.css"
export default function MyAddresses() {
    const [addAdress, setAddAddress] = useState(true);
    const [addressSet,setaddressSet] = useState([]);
    const [userName,setUserName] = useState("");
    const [useradres,setUserAdres] = useState("");
    const [usermobile,setUsermobile] = useState("");
    const [userPinCode,setUserPinCode] = useState("");
    const [userState,setUserState] = useState("");
    const [userEmail,setUserEmail] = useState("");
    const handleSubmit = (e)=>{
        e.preventDefault();
        setaddressSet([...addAdress,{
            userName,useradres,usermobile,userPinCode,userState,userEmail
        }])
    }
    console.log(addressSet)
    return (
        <div className='MyAddresses'>
            <div className='Exiting_Addresses'>
            <div className='existing_Address'>
            <input type="radio" id="javascript" name="fav_language" value="JavaScript" />
            <label for="javascript">
                <p className='user_add_details'>Name: Deepanshu Sarswat</p>
                <p className='user_add_details'>Address: Nokha, Bikaner, Rajasthan</p>
                <p className='user_add_details'>Mobile: 8800638900</p>
                <p className='user_add_details'>Email: sarswatdeepanshu@gmail.com</p>
            </label>
            </div>
            <div className='existing_Address'>
            <input type="radio" id="javascript" name="fav_language" value="JavaScript" />
            <label for="javascript">
                <p className='user_add_details'>Name: Deepanshu Sarswat</p>
                <p className='user_add_details'>Address: Nokha, Bikaner, Rajasthan</p>
                <p className='user_add_details'>Mobile: 8800638900</p>
                <p  className='user_add_details'>Email: sarswatdeepanshu@gmail.com</p>
            </label>
            </div>
            </div>
            {
                addAdress == true ? (<button className='Add_more_Address' onClick={() => setAddAddress(false)}>Add</button>) : <button className='Add_more_Address' onClick={() => setAddAddress(true)}> Remove</button>
            }

            {
                addAdress || (
                    <form onSubmit={handleSubmit}>
                        <div className='productInfo_body'>
                            <p className='label'>Name *
                            </p>
                            <input onChange={(e)=>setUserName(e.target.value)} type="text" placeholder='Name' className='UserInfoInput' required />
                            <p className='label'>Address *
                            </p>
                            <input type="text" placeholder='Enter Address' className='UserInfoInput' required onChange={(e)=>setUserAdres(e.target.value)} />
                            <div className='product_pricing'>
                                <div className='product_pricing_child'>
                                    <p className='label'>Mobile *
                                    </p>
                                    <input type="number" placeholder='Mobile' className='UserInfoInput' required onChange={(e)=>setUsermobile(e.target.value)} />
                                </div>
                                <div className='product_pricing_child'> <p className='label'>Pincode *

                                </p>
                                    <input type="number" placeholder='Enter Pincode' className='UserInfoInput' onChange={(e)=>setUserPinCode(e.target.value)}
                                        required /></div>
                            </div>
                        

                            <p className='label'>State *
                            </p>
                            <input type="text" placeholder='State' className='UserInfoInput' required
                            onChange={(e)=>setUserState(e.target.value)}
                             />

                            <p className='label'>Email Address *
                            </p>
                            <input type="text" placeholder='Email Address' className='UserInfoInput' required onChange={(e)=>setUserEmail(e.target.value)}

                              
                            />
                        </div>
                        <button className='Add_Address' type='submit'>Add Address</button>
                    </form>
                )

            }


        </div>
    )
}
