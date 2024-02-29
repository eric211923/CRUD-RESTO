import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import "../App.css";

function AppNavbar() {
  return (
    <Navbar className="ms-auto" bg="light" variant="light">
      <Container>
        <Nav.Link as={NavLink} to="/" exact="true">
          <Navbar.Brand>UTAKpos</Navbar.Brand>
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
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
