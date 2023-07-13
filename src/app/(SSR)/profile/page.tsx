"use client"
import { Form, Button } from 'react-bootstrap'
import { useRouter } from 'next/navigation'
import { NextRequest, NextResponse } from 'next/server'
import { useCookies } from 'react-cookie'

import { toast } from 'react-hot-toast'

  
export default async function Profile(){
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const fetchme = async (event:any)=>{
      const endpoint = 'http://127.0.0.1:8000/api/auth/profile'
      const options = {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + cookies['token']

        },
        
      }
      
      const response = await fetch(endpoint, options)
      const res = await response.json()
      console.log(res)
    }
   
    return (
    <div>
    <h1>Hi </h1>
    <button onClick={fetchme}>Press me</button>
    {/* This has to be fixed the profile page on clicking the button we are able to retreive data from backend, we need to be able to retrieve it once as soon the page loads please fix this right this will console.log the data at users browser */}
    </div>
    )
}