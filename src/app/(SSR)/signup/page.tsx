"use client"
import toast from 'react-hot-toast';
import { redirect } from 'next/navigation'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { useRouter } from 'next/navigation'
import { Container,Form } from 'react-bootstrap'
import React from 'react';
import { Button, TextField, FormControl, Typography, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AccountCircleOutlined, AlternateEmailOutlined, LockOutlined, PersonOutline } from '@mui/icons-material';


// import register_usr from './register_usr';?
export default async function SignUp(){
    const router = useRouter()
    
    const register_usr = async(event:any)=>{
        event.preventDefault()
        const data = {
            fname : event.target.fname.value,
            lname : event.target.lname.value,
            email : event.target.email.value,
            username : event.target.username.value,
            password : event.target.password.value,
        }
    
    const JSONdata = JSON.stringify(data)
    const endpoint = "https://clasherrox.pythonanywhere.com/api/auth/signup";
    const options = {method:'POST',
headers:{
    'Content-Type':'application/json',
    
},
body:JSONdata
}


const response = await fetch(endpoint,options)
const res = await response.json()
if(response.status == 400){
    toast("try again")
}else if(response.status == 300){
    
    toast("you have already been registered, Login with your credentials")
    setTimeout(()=>router.push("/login"),1000)
}else{
    toast("you have been registered, Login with your credentials now")
    setTimeout(()=>router.push("/login"),1000)

}


    }

   
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#1A202C',
      }}
    >
      <Box
        sx={{
          width: '90%',
          maxWidth: 400,
          padding: '40px',
          borderRadius: '8px',
          backgroundColor: '#2D3748',
          marginTop: 'normal',
          marginBottom: '100px', // Move the form higher
        }}
      >
        <Typography variant="h5" gutterBottom style={{ color: '#E2E8F0', marginBottom: '20px' }}>
          SignUp
        </Typography>
        <FormControl component="form" onSubmit={register_usr}>
          <TextField
            fullWidth
            label="Enter your First Name"
            type="text"
            placeholder="First Name"
            name="fname"
            variant="outlined"
            margin="normal"
            required
            InputProps={{ startAdornment: <PersonOutline sx={{ color: '#E2E8F0', marginRight: '8px' }} /> }}
            InputLabelProps={{ style: { color: '#E2E8F0' } }}
          />
          <TextField
            fullWidth
            label="Enter your Last Name"
            type="text"
            placeholder="Last Name"
            name="lname"
            variant="outlined"
            margin="normal"
            required
            InputProps={{ startAdornment: <PersonOutline sx={{ color: '#E2E8F0', marginRight: '8px' }} /> }}
            InputLabelProps={{ style: { color: '#E2E8F0' } }}
          />
          <TextField
            fullWidth
            label="Enter your Email ID"
            type="text"
            placeholder="Email ID"
            name="email"
            variant="outlined"
            margin="normal"
            required
            InputProps={{ startAdornment: <AlternateEmailOutlined sx={{ color: '#E2E8F0', marginRight: '8px' }} /> }}
            InputLabelProps={{ style: { color: '#E2E8F0' } }}
          />
          <TextField
            fullWidth
            label="Enter your Username"
            type="text"
            placeholder="Username"
            name="username"
            variant="outlined"
            margin="normal"
            required
            InputProps={{ startAdornment: <AccountCircleOutlined sx={{ color: '#E2E8F0', marginRight: '8px' }} /> }}
            InputLabelProps={{ style: { color: '#E2E8F0' } }}
          />
          <TextField
            fullWidth
            label="Enter your Password"
            type="password"
            placeholder="Enter your password"
            name="password"
            variant="outlined"
            margin="normal"
            required
            InputProps={{ startAdornment: <LockOutlined sx={{ color: '#E2E8F0', marginRight: '8px' }} /> }}
            InputLabelProps={{ style: { color: '#E2E8F0' } }}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{
              backgroundColor: '#6B46C1',
              color: '#E2E8F0',
              padding: '12px',
              '&:hover': {
                backgroundColor: '#805AD5',
                transform: 'scale(1.05)',
              },
              transition: 'transform 0.2s',
            }}
          >
            Sign Up
          </Button>
        </FormControl>
      </Box>
    </Box>
  );
}