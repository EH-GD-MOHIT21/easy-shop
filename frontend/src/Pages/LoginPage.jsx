import React from 'react'
import TextField from '@mui/material/TextField';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import "./LoginPage.css"
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import { fontSize } from '@mui/system';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';



const useStyles = makeStyles(theme => ({
  input: {
      color: "white !important",
    '&::placeholder': {
      color: "white !important"
    },
   
  },
  Submitbtn:{
    padding:"16px !important",
    marginTop:"20px !important" 
  }
}))


export default function LoginPage() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [username,setuserEmail] = useState('');
  const [password,setuserPasswaord] = useState('');
  const [otp, setuserOTP] = useState('');
  const [optInput,setoptInput] = useState(true);
  const [loginUrl,setloginUrl] = useState('http://127.0.0.1:8000/login');
  async function loginUser(event){
    event.preventDefault();
    const data = { username,password,otp };
    console.log(data);
    let response = await fetch(loginUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    if (response.ok) {
        let res = await response.json();
        console.log(res);
        if(res['message']=='OTP delivered successfully.' || res['message']=='The OTP has already sent please wait for 5 minutes before retry.'){
          setoptInput(false);
          setloginUrl('http://127.0.0.1:8000/validate/login')
        }else if(res['message']=='User logged in successfully.' || res['message']=='successfully logged in.'){
          // save details and redirect user
          navigate("/UserHome/Home")
        }else{
          // invalid credentials show error on page.
        }
    }else{
        console.error('Error:', response.status);
    };
  }
  return (
    <div className='Loginpages'>
      <div className='LoginPage'>
        <div className='Login_logo' >
          <p>Apni <span className='dukan_logo'>Dukaan</span></p>
          <p><ShoppingBagIcon className='Apni_dukan_icon' /></p>
        </div>
        <div className='user-input'>
          <form autoComplete='off'>
          {optInput ?  
          <>
            <TextField
              placeholder="Enter your E-mail"
              type="email"
              onChange={(e)=>setuserEmail(e.target.value)}
              fullWidth
              size="large"
              margin="normal"
              color="secondary"
              required
              InputProps={{
                classes: { input: classes.input }
              }}
            />
            <TextField
              placeholder="Enter your Password"
              id="outlined-size-small"
              fullWidth
              onChange={(e)=>setuserPasswaord(e.target.value)}
              size="large"
              type={"password"}
              required
              margin="normal"
              InputProps={{
                classes: { input: classes.input }
              }}
              color="secondary"
            />

            </> :    
            <>
             <TextField
              placeholder="Enter your OTP"
              id="outlined-size-small"
              fullWidth
              onChange={(e)=>setuserOTP(e.target.value)}
              size="large"
              type={"number"}
              required
              margin="normal"
              InputProps={{
                classes: { input: classes.input }
              }}
              color="secondary"
            />
             </>
            }
            <Button variant="outlined" color="secondary" className={classes.Submitbtn} fullWidth type='submit'
            onClick={loginUser}
            >Submit</Button>
          </form>

        </div>
        <div>
          <div className='forgotPassword'>
            <Link to="/CreateAccount">Create an account</Link>
            <Link to="/ForgotPassword">Forgot Password</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
