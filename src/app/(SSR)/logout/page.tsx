"use client"

import { useRouter } from "next/navigation";
import { useCookies } from 'react-cookie'
import toast from 'react-hot-toast'
export default function Logout(){
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
    removeCookie('token',{path:'/'})
    const router = useRouter()
    toast.success("redirecting...")
    router.replace("/")


    return <h1>You have been logged out </h1>
}