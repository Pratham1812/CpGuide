"use client"
import { Form, } from 'react-bootstrap'
import { AccountCircleOutlined, AlternateEmailOutlined, LockOutlined, PersonOutline } from '@mui/icons-material';
import { useRouter } from 'next/navigation'
import { NextRequest, NextResponse } from 'next/server'
import { useCookies } from 'react-cookie'

import { toast } from 'react-hot-toast'
import delay from 'delay'
import React from 'react';
    import { Button, TextField, FormControl, Typography, Box } from '@mui/material';

export default async function Login() {
  const router = useRouter()
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const login_handler = async (event: any) => {
      event.preventDefault()

      const data = {
        username: event.target.username.value,
        password: event.target.password.value,
      }

      const JSONdata = JSON.stringify(data)
      const endpoint = "https://clasherrox.pythonanywhere.com/api/auth/profile"
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',

        },
        body: JSONdata
      }
      
      const response = await fetch(endpoint, options)
      const res = await response.json()

      if (response.status == 200) {
        
      
        setCookie('token',res['access'],{path:'/',secure:true,maxAge:3600})
        router.replace('/login')
        toast.success("cheers")
        router.push("/profile")
      
      } else {
        toast.error("noo")
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
            width: '80%',
            maxWidth: 300,
            padding: '40px',
            borderRadius: '8px',
            backgroundColor: '#2D3748',
            marginTop: 'normal',
            marginBottom: '250px', // Move the form higher
          }}
        >
          <Typography variant="h5" gutterBottom style={{ color: '#E2E8F0', marginBottom: '20px' }}>
            Login
          </Typography>
          <FormControl component="form" onSubmit={login_handler}>
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
              placeholder="Password"
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
              Submit
            </Button>
          </FormControl>
        </Box>
      </Box>
    );
  }