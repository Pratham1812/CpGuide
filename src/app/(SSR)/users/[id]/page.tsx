import { UnsplashImage } from "@/models/unsplash_images"
import Image from 'next/image'
import styles from "./TopicPage.module.css"
import {Alert} from "@/components/bootstrap"
import {Metadata } from "next"
interface PageProps{
    params : {
        topic : string
    },
    // searchParams : {[key : string] : string | string [] | undefined}
}

// export const revalidate = 0 for no cached data

export function generateMetadata({ params : {topic}} : PageProps) : Metadata{
    return {
        title : topic + "- image gallery"
    }
}
export function generateStaticParams(){
    return ["health","fitness","coding"].map(topic => ({topic}))
}



export default async function Page({params:{topic}}:PageProps){
    
    const resp = await fetch(`https://api.unsplash.com/photos/random?query=${topic}&count=30&client_id=${process.env.ACCESS_KEY}`)
    const image:UnsplashImage [] = await resp.json()
    return (
        <div>
            <h1>{topic}</h1>
            <Alert>
                Static image fetching and creates pages for some dynamic params 
            </Alert>
            {
                image.map((image)=>(
                    <Image src={image.urls.raw} width={250} height={250}
                   
            alt={image.description} key={image.urls.raw} className={styles.image} />
                )
                )
            }

        </div>
    )
}