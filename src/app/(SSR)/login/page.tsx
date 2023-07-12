"use client"
import {Form,Button} from 'react-bootstrap'


export default async function Login(){
    async function handleLogin(){

    }
    
    return(
        <Form onSubmit={handleLogin}>
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