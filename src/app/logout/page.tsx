"use client"
import { Alert } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { useCookies } from 'react-cookie'
import toast from 'react-hot-toast'
export default function Logout(){
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
    removeCookie('token',{path:'/'})
    const router = useRouter()
    toast.success("redirecting...")
    setTimeout(()=>router.push("/"),2000)


    return <Alert variant="primary" >You have been logged out </Alert>
}