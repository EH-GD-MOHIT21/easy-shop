import React from 'react'
import TextField from '@mui/material/TextField';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import "./LoginPage.css"
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import { fontSize } from '@mui/system';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
const useStyles = makeStyles(theme => ({
    // this is how, we change placeholder
    
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
export default function Verify() {
  const classes = useStyles();
  const {token,email} = useParams();
  const [password,setuserPass] = useState('');
  const [cpassword,setuserPassC] = useState('');
  async function ResetTokenValidation(event){
    event.preventDefault();
    const data = { email,token,password,cpassword };
    let response = await fetch("http://127.0.0.1:8000/reset", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    if (response.ok) {
        let res = await response.json();
        if(res['message']=='Password Change success!'){
          // redirect user
        }
        console.log(res);
    }else{
        console.error('Error:', response.status);
    }
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
              placeholder="Please Enter New Password"
              type="password"
              fullWidth
              size="large"
              margin="normal"
              color="secondary"
              onChange={(e)=>setuserPass(e.target.value)}
              required
              InputProps={{
                classes: { input: classes.input }
              }}
            />

            <TextField
              placeholder="Confirm New Password"
              type="password"
              onChange={(e)=>setuserPassC(e.target.value)}
              fullWidth
              size="large"
              margin="normal"
              color="secondary"
              required
              InputProps={{
                classes: { input: classes.input }
              }}
            />
       
            <Button variant="outlined" color="secondary" className={classes.Submitbtn} fullWidth type='submit' onClick={ResetTokenValidation}>Submit</Button>
          </form>

        </div>
        <div>
     
        </div>
      </div>
    </div>
  )
}
