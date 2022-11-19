import React from 'react'
import TextField from '@mui/material/TextField';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import "./LoginPage.css"
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import { fontSize } from '@mui/system';
import { useState } from 'react';

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
export default function ForgotPassword() {
  const classes = useStyles();
  const [email,setuserEmail] = useState('');
  async function ForgetPassGenUser(event){
    event.preventDefault();
    const data = { email };
    let response = await fetch("http://127.0.0.1:8000/recover", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    if (response.ok) {
        let res = await response.json();
        console.log(res);
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
       
            <Button variant="outlined" color="secondary" className={classes.Submitbtn} fullWidth type='submit' onClick={ForgetPassGenUser}>Submit</Button>
          </form>

        </div>
        <div>
     
        </div>
      </div>
    </div>
  )
}
