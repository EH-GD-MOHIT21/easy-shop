import React from 'react'
import "./AddCart.css"
export default function AddCart() {
    return (
        <div className='AddCart'>
            <div className='shopping-left'>
                <div className='shopping-left-Header'>
                    <p><span className='shoping-cart'>Shopping cart</span> <span>(6 Items)</span></p>
                    <p className='total-Money'>Total ₹7,442</p>
                </div>
               <div className='Shoping-left-product'>
               <div className='shopping-left-body'>
                    <div className='Cart_itm-left'>
                        <img className='cart-img' src='https://cdn3.mydukaan.io/app/image/500x500/?url=https://dukaan-us.s3.amazonaws.com/6963100/96a02c56-db7d-4dd4-a1c3-9cd0850e0181/frame-19-e43ebbf5-5cb1-430b-9906-bd62052ab76d-ee6410d2-19b7-4f3c-bfe1-38339b5cfbfc.png' />
                    </div>
                    <div className='Cart_itm_right'>
                        <div className='product_title'>
                            <p className='title-product'>Women's Self Design Tussar Silk Saree - Brown - 71</p>
                            <p className='remove_product'>Remove</p>
                        </div>
                        <div className='cart-itm-price'>
                            <span className='discount_price'>₹7,452</span> <span className='real_price'>₹21,394.80 </span> <span>(65% off)</span>
                        </div>
                    </div>
                </div>
               
               </div>
            </div>
            <div className='shopping-right'>
                <div className='Shoping_right_total'>
                    <p className='Itm-total_text'>Item total</p>
                    <p><span className='Real_price'>₹21,394.80</span> <span className='Disscounted_price'>₹7,452</span></p>
                </div>
                <div className='final_total'>
                    <div className='Disscount_product'>
                        <p className='Disscounts'>Discount (FLAT25)</p>
                        <p className='Disscounts_price'>-₹10</p>
                    </div>
                    <div className='delivry'>
                        <p>Delivery fee</p>
                        <p>Free</p>
                    </div>
                </div>
                <div className='Grand_total'>
                    <div className='Gran_total_text'>Grand total</div>
                    <div className='Grand_totla_price'>₹7,442</div>

                </div>
                <div className='Buy_itm'>
                    continue
                </div>
            </div>
        </div>
    )
}
