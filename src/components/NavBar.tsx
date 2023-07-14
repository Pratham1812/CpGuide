"use client";

import Link from "next/link"; //linker
import { usePathname } from "next/navigation";
import {Navbar,Container,Nav, NavDropdown} from "react-bootstrap";
import { useCookies } from "react-cookie";
//we can directly import as it is a client component
export default function NavBar(){
    const pathName = usePathname();
    const [cookies, setCookie, removeCookie] = useCookies(['token']);

    return(
        <Navbar bg="primary" variant="dark" expand="sm" collapseOnSelect suppressHydrationWarning >
            <Container>
                <Navbar.Brand as={Link} href="/">
                    Home
                    {/* <Link href='/'>Home</Link> */}
                    </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navbar"/>
                <Navbar.Collapse id="main-navbar">
                    <Nav>
                        {!cookies['token'] && <Nav.Link as ={Link} href="/signup">Signup</Nav.Link>}
                        {!cookies['token'] && <Nav.Link as ={Link} href="/login">Login</Nav.Link>}
                        {cookies['token'] && <Nav.Link as ={Link} href="/logout">Logout</Nav.Link>}
                        
                        
                    
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

