"use client"
import toast from 'react-hot-toast';
import { redirect } from 'next/navigation'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { useRouter } from 'next/navigation'
import { Container,Form,Button } from 'react-bootstrap'
// import register_usr from './register_usr';?
export default async function SignUp(request : NextRequest){
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
    const endpoint = 'http://127.0.0.1:8000/api/auth/signup'
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
    setTimeout(()=>router.push("/"),1000)
}else{
    toast("you have been registered, Login with your credentials now")
    setTimeout(()=>router.push("/"),1000)

}


    }

 return( 
    <Form onSubmit={register_usr}>
    <Form.Group>
        <Form.Label>Enter your first name:</Form.Label>
        <Form.Control type="text" 
                      placeholder="Enter your full name" name="fname" />
      </Form.Group>
      <Form.Group>
        <Form.Label>Enter your last name:</Form.Label>
        <Form.Control type="text" 
                      placeholder="Enter your full name" name="lname" />
      </Form.Group>
      <Form.Group>
        <Form.Label>Enter your email address:</Form.Label>
        <Form.Control type="email" 
                      placeholder="Enter your your email address" name="email" />
      </Form.Group>
      <Form.Group>
        <Form.Label>Enter your username:</Form.Label>
        <Form.Control type="text" placeholder="Enter your username" name="username" />
      </Form.Group>
      <Form.Group>
        <Form.Label>Enter your passoword:</Form.Label>
        <Form.Control type="password" placeholder="Enter your username" name="password" />
      </Form.Group>
      <br/>
      <Button variant="primary" type="submit">
         Click here to submit form
      </Button>
    </Form>
    )

}