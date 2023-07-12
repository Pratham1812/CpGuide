import { UnsplashImage } from "@/models/unsplash_images";
import Image from "next/image";
import Link from "next/link";

import {Alert} from "@/components/bootstrap"

//import alert from our bootstrap package as it is server component
export const metadata = {
    title: 'DynamicISR fetching -- Image Gallery',
  }
  
// turning to dynamic page turning off caching

// export const revalidate = 0;


export default async function Page(){

    const resp = await fetch("https://api.unsplash.com/photos/random?client_id="+process.env.ACCESS_KEY,{
    next:{
        revalidate:15
    }    
    //cache:"no-cache"   //"no-store" // next : { revalidate :0 }
    })
    const image:UnsplashImage = await resp.json()
    const width =  Math.min(image.width,500);
    const height =  (width / image.width) * image.height
    // const pro = await new Promise((resolve)=>{setTimeout(resolve,5000)})

    return (
        <div className="d-flex flex-column align-items-center">
            <Alert>
This page fetches new image each time and caches it for 15 secs
            </Alert>
            
            <Image src={image.urls.raw} width={width} height={height}
            className="rounded shadow mw-100 mh-100"        
            alt={image.description} />
            by
            <Link href={"/users/"+image.user.username}>{image.user.username}</Link>
            
        </div>


    )

}