
import {
  Navbar,
  Container,
  Nav,
} from 'react-bootstrap';

import React, { useState } from "react";
import Image from 'next/image'
import Link from 'next/link'
import Router from "next/router";

import goldenLeopardsTextLogo from '../../public/goldenLeopardsTextBlue.png';
import { clearCache } from '../api/goldenLeopardsApi';


const GLNavBar = () => {

  const [expanded, setExpanded] = useState(false);

  const handleClearCache = async () => {
    await clearCache();
    Router.reload();
  }

  return (
    <div style={{position: 'relative', width: '100%'}}>
      <Navbar className="navbar-custom" bg="light" expand="xl" expanded={expanded}>
        <Container>
          <Navbar.Brand></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(expanded ? false : "expanded")}> <i className="bi bi-three-dots"></i></Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <div style={{height: '20px'}}></div>
              <Link href="/schedule" passHref>
                <Nav.Link onClick={() => setExpanded(false)}>Schedule</Nav.Link>
              </Link>
              <Link href="/tournaments" passHref>
                <Nav.Link onClick={() => setExpanded(false)}>Tournaments</Nav.Link>
              </Link>
              <Link href="/leagues" passHref>
                <Nav.Link onClick={() => setExpanded(false)}>Leagues</Nav.Link>
              </Link>
              <Link href="/players" passHref>
                <Nav.Link onClick={() => setExpanded(false)}>Players</Nav.Link>
              </Link>
              <Link href="/achievements" passHref>
                <Nav.Link onClick={() => setExpanded(false)}>Achievements</Nav.Link>
              </Link>
              <div className="d-lg-none">
                <hr></hr>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                  <div style={{marginRight: '3px'}}>
                    <i className="bi bi-arrow-clockwise"></i>
                  </div>
                  <Nav.Link onClick={ handleClearCache }>Clear Cache</Nav.Link>
                </div>
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
