import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, Link } from "react-router-dom";
import "./css.css";

function Header() {
  return (
    <Navbar
      fixed="top "
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      style={{ zIndex: 1 }}
      className="header"
    >
      <Container fluid>
        <Link to="/" className="navbar-brand">
          {" "}
          שלטי דרום
        </Link>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            {" "}
            <NavLink to="/" className="nav-link">
              דף הבית
            </NavLink>{" "}
            <NavLink to="/product" className="nav-link">
              מוצרים
            </NavLink>{" "}
            <NavLink to="/product" className="nav-link">
              הזמנות
            </NavLink>{" "}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
