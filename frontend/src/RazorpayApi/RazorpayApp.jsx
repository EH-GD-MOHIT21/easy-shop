import axios from 'axios';
import { useState, useEffect } from 'react'

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

function RazorpayApp() {
    const [productDetails, setProductDetails] = useState()
    const [selectedItemAmount, setSelectedItemAmount] = useState()

    useEffect(() => {
        getProduct()
    }, [])

    const getProduct = () => {
        return axios
        .get(`https://fakestoreapi.com/products/${Math.floor(Math.random() * 10) + 11}`)
        .then((res) => {
            setProductDetails(res.data)
            setSelectedItemAmount((res.data.price * 75.61 * 100).toFixed(2))
        })
        .catch((err) => console.log(err))
    }

    async function displayRazorpay() {
		const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

		if (!res) {
			alert('Failure loading the Razorpay SDK. PLease make sure you are connected to the internet')
			return
		}
    
    const orderData = await axios.post('http://127.0.0.1:8000/createOrder/', {
      amount: selectedItemAmount
    },{
      headers: {
        'X-CSRFToken': csrftoken
    }})

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
                },{
                  headers: {
                    'X-CSRFToken': csrftoken
                  }})

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
    <div className="App">
    {
      productDetails && (
        <div className="card">
          <img src={productDetails.image} alt="Denim Jeans" />
          <div className='details'>
            <h1>{productDetails.title.substring(0, 20) + "..."}</h1>
            <p className="price">{"₹ " + (productDetails.price * 75.61).toFixed(2)}</p>
            <p>{productDetails.description.substring(0, 70) + "..."}</p>
            <button onClick={displayRazorpay}>BUY</button>
          </div>
        </div>
      )
    }
  </div> 
  );
}

export default RazorpayApp;