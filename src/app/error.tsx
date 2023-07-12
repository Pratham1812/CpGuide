"use client"

import { Button } from "react-bootstrap"

interface ErrorPageProp{
    error : Error,
    reset : () => void
}

export default function Error({error,reset}:ErrorPageProp){
    return <div>
        <h1>ERROR HOGYA</h1>
        <Button onClick={reset}>Try Again</Button>
        
        </div>
}