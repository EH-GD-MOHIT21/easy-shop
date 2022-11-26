import React, { useState } from 'react'
import "./MyAddress.css"
export default function MyAddresses() {
    const [addAdress, setAddAddress] = useState(true);
    return (
        <div className='MyAddresses'>
            {
                addAdress == true ? (<button className='Add_more_Address' onClick={() => setAddAddress(false)}>Add</button>) : <button className='Add_more_Address' onClick={() => setAddAddress(true)}> Remove</button>
            }

            {
                addAdress || (
                    <form>
                        <div className='productInfo_body'>
                            <p className='label'>Name *
                            </p>
                            <input type="text" placeholder='Name' className='UserInfoInput' required />
                            <p className='label'>Address *
                            </p>
                            <input type="text" placeholder='Enter Address' className='UserInfoInput' required />
                            <div className='product_pricing'>
                                <div className='product_pricing_child'>
                                    <p className='label'>Mobile *
                                    </p>
                                    <input type="number" placeholder='Mobile' className='UserInfoInput' required />
                                </div>
                                <div className='product_pricing_child'> <p className='label'>Pincode *

                                </p>
                                    <input type="number" placeholder='Enter Pincode' className='UserInfoInput'
                                        required /></div>
                            </div>
                            <p className='label'>Product Description *
                            </p>

                            <p className='label'>State *
                            </p>
                            <input type="text" placeholder='State' className='UserInfoInput' required />

                            <p className='label'>Email Address *
                            </p>
                            <input type="text" placeholder='Email Address' className='UserInfoInput' required />
                        </div>
                        <button className='Add_Address' type='submit'>Add Address</button>
                    </form>
                )

            }


        </div>
    )
}
