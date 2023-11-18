import React, { useState } from 'react'
import axios from 'axios';
import "./AddCart.css"
import { useLayoutEffect } from 'react'
export default function AddCart() {
    const [product, setProduct] = useState([]);
    const [finalPrice, setFinalPrice] = useState(0);
    let Quantity = 0;
    let realPrice = 0;
    useLayoutEffect(() => {
        fetch('http://127.0.0.1:8000/modifyorlistcart')
            .then(res => res.json())
            .then(datas => {
                console.log(datas)
                setFinalPrice(datas.final_price);
                setProduct(datas.data);
            })
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
      
      console.log(csrftoken);
      function loadScript(src) {
          return new Promise((resolve) => {
              const script = document.createElement('script')
              script.src = src
              script.onload = () => {
                  resolve(true)
              }
              script.onerror = () => {
                  resolve(false)
              }
              document.body.appendChild(script)
          })
      }
      


    async function displayRazorpay() {
        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

        if (!res) {
            alert('Failure loading the Razorpay SDK. PLease make sure you are connected to the internet')
            return
        }

        const orderData = await axios.post('http://127.0.0.1:8000/createOrder/', {
            amount: finalPrice
        }, {
            headers: {
                'X-CSRFToken': csrftoken
            }
        })

        const { amount, currency, order_id } = orderData.data


        const options = {
            key: "rzp_test_OG0pcamm8rxVEE", // Enter the Key ID generated from the Dashboard
            amount: '101',
            currency: currency,
            name: "Apni Dukaan",
            description: "Thanks for choosing apni dukaan",
            // image: logo,
            order_id: order_id,
            handler: async function (response) {
                const razorpay_paymentId = response.razorpay_payment_id
                const razorpay_orderId = response.razorpay_order_id
                const razorpay_signature = response.razorpay_signature

                const res = await axios.post('http://127.0.0.1:8000/verifySignature/', {
                    razorpay_paymentId,
                    razorpay_orderId,
                    razorpay_signature
                }, {
                    headers: {
                        'X-CSRFToken': csrftoken
                    }
                })

                alert(res.data.status)
            },
            prefill: {
                name: "John Doe",
                email: "doejon@example.com",
                contact: "9999999999",
            },
            theme: {
                color: "#61dafb",
            },
        };
        const paymentObject = new window.Razorpay(options)
        paymentObject.open()

    }



    return (
        <div className='AddCart'>
            <div className='shopping-left'>
                <div className='shopping-left-Header'>
                    <p><span className='shoping-cart'>Shopping cart</span> <span>({product.length} Items)</span></p>
                    <p className='total-Money'>Total ₹ {finalPrice}</p>
                </div>
                <div className='Shoping-left-product'>
                    {
                        product?.map((data) => {
                            realPrice = realPrice + data?.product?.price
                            Quantity = Quantity + data.quantity
                            return (
                                <div className='shopping-left-body'>
                                    <div className='Cart_itm-left'>
                                        <img className='cart-img' src={data?.product?.images[0].url} />
                                    </div>
                                    <div className='Cart_itm_right'>
                                        <div className='product_title'>
                                            <p className='title-product'>{data?.product?.name}</p>
                                            {/* <p className='remove_product'>Remove</p> */}
                                        </div>
                                        <div className='cart-itm-price'>
                                            <span className='discount_price'>₹ {data?.product?.discounted_price}</span> <span className='real_price'>₹ {data?.product?.price}</span> <span>(65% off)</span>
                                            <p>Quantity: {data?.quantity}</p>
                                            <p>Total Price: {data?.quantity * data?.product?.discounted_price}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
            <div className='shopping-right'>
                <div className='Shoping_right_total'>
                    <p className='Itm-total_text'>Item total</p>
                    <p><span className='Real_price'>₹ {realPrice * Quantity}</span> <span className='Disscounted_price'>₹{finalPrice}</span></p>
                </div>
                <div className='final_total'>
                    <div className='Disscount_product'>
                        <p className='Disscounts'>Discount (FLAT25)</p>
                        <p className='Disscounts_price'>-₹ {(realPrice * Quantity) - finalPrice}</p>
                    </div>
                    <div className='delivry'>
                        <p>Delivery fee</p>
                        <p>Free</p>
                    </div>
                </div>
                <div className='Grand_total'>
                    <div className='Gran_total_text'>Grand total</div>
                    <div className='Grand_totla_price'>₹{finalPrice}</div>

                </div>
                <div className='Buy_itm'
                    onClick={displayRazorpay}
                >
                    continue
                </div>
            </div>
        </div>
    )
}
