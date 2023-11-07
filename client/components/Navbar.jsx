import React from "react";
import { Container, Nav, Navbar, } from "react-bootstrap";
import { Link } from 'react-router-dom';

function NavBar(props) {
  return (
    <Navbar expand="lg" bg="primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={Link} to="/home">🐶 Dogagatchi+</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="my-1"/>
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <Nav.Link className="ms-auto" as={Link} to="/kennel">My Kennel 🦴</Nav.Link>
            <Nav.Link className="ms-auto" as={Link} to="/quiz" >Quiz 🤔</Nav.Link>
            <Nav.Link className="ms-auto" as={Link} to="/user">My Info ℹ️</Nav.Link>
            <Nav.Link className="ms-auto" as={Link} to="/leaderboard">Top Dogs 🏆</Nav.Link>
            <Nav.Link className="ms-auto" href="#logout">Log Out 👋</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
