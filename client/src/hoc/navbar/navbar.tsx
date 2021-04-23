import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

import Logo from "assets/logo.png";

import { logout } from "reduxState/user/loginUser";
import { RootState } from "reduxState/store";

const Navigation = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.loginUser.userData);
  const location = useLocation();
  const teamId = location.pathname.split("/")[2];
  return (
    <Navbar collapseOnSelect expand="lg" bg="secondary" variant="dark">
      <Navbar.Brand to="/home" as={NavLink}>
        <div
          style={{
            display: "flex",
            gap: "0.5em",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={Logo} alt="Logo" style={{ height: "2em" }} />
          Hackathon
        </div>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto" style={{ gap: "1.5em" }}>
          <NavDropdown title="Teams" id="collasible-nav-dropdown">
            {/* {userData.teams.map((team)=> (
              <NavDropdown.Item to={`/team/${team.id}`} as={NavLink}>
              {team.name}
            </NavDropdown.Item>
            ))} */}
            <NavDropdown.Item to="/home" as={NavLink}>
              Here team name
            </NavDropdown.Item>
            <NavDropdown.Item to="/dnd" as={NavLink}>
              Drag&Drop
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Sample separator link
            </NavDropdown.Item>
          </NavDropdown>
          {teamId && (
            <Nav.Link href={`/team/${teamId}/calendar`}>Calendar</Nav.Link>
          )}
          <Nav.Link href="/settings">Settings</Nav.Link>
          <Nav.Link href="/" onClick={() => dispatch(logout())}>
            Logout
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
