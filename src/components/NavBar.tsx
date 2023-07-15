import { AiOutlineCode } from "react-icons/ai"; // Import an icon from react-icons
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { useCookies } from "react-cookie";

export default function NavBar() {
  const pathName = usePathname();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const logout = () => {
    // Your logout logic here
    removeCookie("token");
    // Perform any additional logout actions if needed
  };

  return (
    <Navbar
      bg="primary"
      variant="dark"
      expand="sm"
      className="navbar-dark"
      collapseOnSelect
      suppressHydrationWarning
      style={{ backgroundImage: "linear-gradient(to right, #2c3e50, #3498db)" }} // Gradient Background
    >
      <Container>
        {/* Custom Logo with Icon */}
        <Navbar.Brand as={Link} href="/">
          <AiOutlineCode size={24} className="me-2" /> {/* Icon */}
          CpGuide
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="mr-auto">
            <Nav.Link as={Link} href="/">
              Home
            </Nav.Link>
            
            {/* Add more navigation links as needed */}
          </Nav>
          <Nav>
            {!cookies["token"] && (
              <>
                <Nav.Link as={Link} href="/signup">
                  Signup
                </Nav.Link>
                <Nav.Link as={Link} href="/login">
                  Login
                </Nav.Link>
              </>
            )}
            {cookies["token"] && (
              <Button variant="outline-light" className="me-2" onClick={logout}>
                Logout
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
      <style jsx global>{`
        /* Custom Font Style */
        body {
          font-family: "Arial", sans-serif;
        }
        /* Custom hover effect on navigation links */
        .navbar .nav-link:hover {
          color: #fff;
        }
      `}</style>
    </Navbar>
  );
}
