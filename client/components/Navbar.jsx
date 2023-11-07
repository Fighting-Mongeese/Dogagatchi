import React from "react";
import { Container, Nav, Navbar, } from "react-bootstrap";
import { Link } from 'react-router-dom';
import axios from "axios";

function NavBar(props) {

  const logout = () => {
    console.log('pre sign out', sessionStorage.getItem('user'))
    
    sessionStorage.setItem('user', null)
    
    
    // axios.post('/auth/logout', {}, { withCredentials: true })
    //   .then((res) => console.log('response', res, sessionStorage.getItem('user')))
    //   .catch((err) => {
    //     console.error('server error: failed to logout', err)
    //   })
  }


  return (
    <Navbar expand="lg" bg="primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={Link} to="/home">🐶 Dogagatchi+</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="my-1" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <Nav.Link className="ms-auto" as={Link} to="/kennel">My Kennel 🦴</Nav.Link>
            <Nav.Link className="ms-auto" as={Link} to="/quiz" >Quiz 🤔</Nav.Link>
            <Nav.Link className="ms-auto" as={Link} to="/user">My Info ℹ️</Nav.Link>
            <Nav.Link className="ms-auto" as={Link} to="/leaderboard">Top Dogs 🏆</Nav.Link>
            <Nav.Link className="ms-auto" onClick={logout}>Log Out 👋</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
