
import {
  Navbar,
  Container,
  Nav
} from 'react-bootstrap';

import React, { useState } from "react";
import Image from 'next/image'

import goldenLeopardsTextLogo from '../../public/goldenLeopardsTextBlue.png';

const GLNavBar = () => {

  const [expanded, setExpanded] = useState(false);

  return (
    <div style={{position: 'relative', width: '100%'}}>
      <Navbar className="navbar-custom" bg="light" expand="lg" expanded={expanded}>
        <Container>
          <Navbar.Brand></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(expanded ? false : "expanded")}/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <div style={{height: '20px'}}></div>
              <Nav.Link to="/schedule" onClick={() => setExpanded(false)}>Schedule</Nav.Link>
              <Nav.Link to="/tournaments" onClick={() => setExpanded(false)}>Tournaments</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className='navbar-logo-container'>
        <a to="/"><Image src={goldenLeopardsTextLogo} alt="Logo" height="80px" width="138px"/></a>
      </div>
    </div>
  );
}

export default GLNavBar;
