import { UnsplashImage } from "@/models/unsplash_images";
import Image from "next/image";
import Link from "next/link";

import {Alert} from "@/components/bootstrap"

//import alert from our bootstrap package as it is server component
export const metadata = {
    title: 'Static fetching -- Image Gallery',
  }
  


export default async function Page(){
    const resp = await fetch("https://api.unsplash.com/photos/random?client_id="+process.env.ACCESS_KEY)
    const image:UnsplashImage = await resp.json()
    const width =  Math.min(image.width,500);
    const height =  (width / image.width) * image.height
    return (
        <div className="d-flex flex-column align-items-center">
            <Alert>
        This page fetches and caches data at build time. Even though the unsplash api always returns a new image every time we see the same image after refreshing the page until we compile the project again

            </Alert>
            
            <Image src={image.urls.raw} width={width} height={height}
            className="rounded shadow mw-100 mh-100"        
            alt={image.description} />
            by
            <Link href={"/users/"+image.user.username}>{image.user.username}</Link>
            
        </div>


    )

}