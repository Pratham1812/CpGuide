"use client";

import Link from "next/link"; //linker
import { usePathname } from "next/navigation";
import {Navbar,Container,Nav, NavDropdown} from "react-bootstrap";
//we can directly import as it is a client component
export default function NavBar(){
    const pathName = usePathname();

    return(
        <Navbar bg="primary" variant="dark" expand="sm" collapseOnSelect>
            <Container>
                <Navbar.Brand as={Link} href="/">
                    Home
                    {/* <Link href='/'>Home</Link> */}
                    </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navbar"/>
                <Navbar.Collapse id="main-navbar">
                    <Nav>
                        <Nav.Link as ={Link} href="/signup">Signup</Nav.Link>
                        <Nav.Link as ={Link} href="/login">Login</Nav.Link>
                        <Nav.Link as={Link} href="/rest">Static</Nav.Link>
                        <Nav.Link as={Link} href="/dynamic">Dynamic</Nav.Link>
                        <NavDropdown title="Topics" id="topics-dropdown">
                            <NavDropdown.Item as ={Link} href="/topics/fitness">Fitness</NavDropdown.Item>
                            <NavDropdown.Item as ={Link} href="/topics/coding">Coding</NavDropdown.Item>
                            <NavDropdown.Item as ={Link} href="/topics/health">Health</NavDropdown.Item>
                        </NavDropdown>
                        
                    
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

