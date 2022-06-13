
import {
  Navbar,
  Container,
  Nav,
  Button,
} from 'react-bootstrap';

import React, { useState } from "react";
import Image from 'next/image'
import Link from 'next/link'

import goldenLeopardsTextLogo from '../../public/goldenLeopardsTextBlue.png';

const GLNavBar = ({ user, isLoggedIn, handleLogin }) => {

  const [expanded, setExpanded] = useState(false);
  console.log(isLoggedIn);
  
  return (
    <div style={{position: 'relative', width: '100%'}}>
      <Navbar className="navbar-custom" bg="light" expand="lg" expanded={expanded}>
        <Container>
          <Navbar.Brand></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(expanded ? false : "expanded")}/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <div style={{height: '20px'}}></div>
                <Link href="/schedule" passHref>
                  <Nav.Link onClick={() => setExpanded(false)}>Schedule</Nav.Link>
                </Link>
                <Link href="/tournaments" passHref>
                  <Nav.Link onClick={() => setExpanded(false)}>Tournaments</Nav.Link>
                </Link>
                <Link href="/achievements" passHref>
                  <Nav.Link onClick={() => setExpanded(false)}>Achievements</Nav.Link>
                </Link>
            </Nav>
            <Nav className='justify-content-end'>
              <div>
                <Button className='login-button' onClick={ handleLogin }>{ isLoggedIn ? 'Logout' : 'Login'}</Button>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className='navbar-logo-container'>
        <Link href="/"><Image src={goldenLeopardsTextLogo} alt="Logo" height="80px" width="138px"/></Link>
      </div>
    </div>
  );
}

export default GLNavBar;
