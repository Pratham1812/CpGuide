"use client"
import { Form, Button } from 'react-bootstrap'
import { signJWT } from '@/lib/token'
import { useRouter } from 'next/navigation'
import { NextRequest, NextResponse } from 'next/server'
import { useCookies } from 'react-cookie'

import { toast } from 'react-hot-toast'
import delay from 'delay'
import {createClient} from 'redis';
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
      const endpoint = 'http://127.0.0.1:8000/api/auth/login'
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
  <Form onSubmit={login_handler}>
    <Form.Group>
      <Form.Label>Enter your username:</Form.Label>
      <Form.Control type="text" placeholder="Enter your username" name="username" />
    </Form.Group>
    <Form.Group>
      <Form.Label>Enter your passoword:</Form.Label>
      <Form.Control type="password" placeholder="Enter your username" name="password" />
    </Form.Group>
    <br />
    <Button variant="primary" type="submit">
      Click here to submit form
    </Button>
  </Form>
)
}