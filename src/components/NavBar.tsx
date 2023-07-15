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
        <Navbar bg="dark" variant="dark" expand="sm" className="text-primary" collapseOnSelect sticky="top">
            
                <Navbar.Brand as={Link} href="/">
                    CpGuide
                    </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navbar"/>
                <Navbar.Collapse id="main-navbar">
                    <Nav className="justify-content-end">
                        {!cookies['token'] && <Nav.Link as ={Link} href="/signup">Signup</Nav.Link>}
                        {!cookies['token'] && <Nav.Link as ={Link} href="/login">Login</Nav.Link>}
                        {cookies['token'] && <Nav.Link as ={Link} href="/logout" className="float-end">Logout</Nav.Link>}
                        
                        
                    
                    </Nav>
                </Navbar.Collapse>
            
        </Navbar>
    )
}

