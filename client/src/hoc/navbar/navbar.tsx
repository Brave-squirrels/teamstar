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
    <Navbar collapseOnSelect expand="lg" bg="secondary" variant="dark">
      <Navbar.Brand to="/home" as={NavLink}>
        Hackathon
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <NavDropdown title="Sample dropdown" id="collasible-nav-dropdown">
            <NavDropdown.Item to="/home" as={NavLink}>
              Sample dropdown link
            </NavDropdown.Item>
            <NavDropdown.Item to="/dnd" as={NavLink}>
              Drag&Drop
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Sample separator link
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav>
          <Nav.Link to="/settings" as={NavLink}>
            Settings
          </Nav.Link>
          <Nav.Link href="/" onClick={() => dispatch(logout())}>
            Logout
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
