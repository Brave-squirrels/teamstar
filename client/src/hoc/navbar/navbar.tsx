import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

import { logout } from "reduxState/user/loginUser";

const Navigation = () => {
  const dispatch = useDispatch();
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand to="/home" as={NavLink}>
        Hackathon
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link to="/testInput" as={NavLink}>
            Test input
          </Nav.Link>
          <NavDropdown title="Sample dropdown" id="collasible-nav-dropdown">
            <NavDropdown.Item to="/home" as={NavLink}>
              Sample dropdown link
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Sample separator link
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav>
          <Nav.Link href="/" onClick={() => dispatch(logout())}>
            Logout
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
