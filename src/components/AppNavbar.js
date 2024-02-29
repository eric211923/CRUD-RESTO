import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import "../App.css";

function AppNavbar() {
  return (
    <Navbar className="Nav-name" bg="light" variant="light" fluid>
      <div className="container-fluid">
        <Nav.Link as={NavLink} to="/" exact="true">
          <Navbar.Brand>
            <img src={logo} alt="logo" fluid />
          </Navbar.Brand>
        </Nav.Link>
        <Nav className="ms-auto">
          <Nav.Link as={NavLink} to="/" exact="true">
            Home
          </Nav.Link>
          <Nav.Link as={NavLink} to="/admin" exact="true">
            Dashboard
          </Nav.Link>
          <Nav.Link as={NavLink} to="/add" exact="true">
            Add Item
          </Nav.Link>
        </Nav>
      </div>
    </Navbar>
  );
}

export default AppNavbar;
