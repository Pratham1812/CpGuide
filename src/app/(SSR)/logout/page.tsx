"use client"

import { useRouter } from "next/navigation";
import { useCookies } from 'react-cookie'
import toast from 'react-hot-toast'
export default function Profile(){
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
    removeCookie('token',{path:'/'})
    const router = useRouter()
    toast.success("redirecting...")
    setTimeout(()=>router.push("/"),2000)


    return <h1>You have been logged out </h1>
}