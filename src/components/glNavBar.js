
 import {
  Link,
} from "react-router-dom";

import {
  Navbar,
  Container,
  Nav,
} from 'react-bootstrap';

import { withRouter } from 'react-router'

import logo from '../assets/images/goldenLeopards.png';

const GLNavBar = () => {
  return (
    <Navbar bg="light" expand="lg">
  <Container>
    <Link to="/" className="navbar-brand">
      <div style={{height: '50px'}}>
        <img src={logo} alt="Logo" height="55px"/>
      </div>
    </Link>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Link to="/seasons" className="nav-link">Seasons</Link>
        <Link to="/games" className="nav-link">Games</Link>
        <Link to="/players" className="nav-link">Players</Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
    // <Navbar fixedToTop>
    //   <Navbar.Group>
    //       <Navbar.Heading>Golden Leopards</Navbar.Heading>
    //       <Navbar.Divider />
    //       <Link to="/seasons">
    //         <Button className="bp3-minimal" icon="layers" text="Seasons"></Button>
    //       </Link>
    //       <Link to="/games">
    //         <Button className="bp3-minimal" icon="clipboard" text="Games" />
    //       </Link>
    //       <Link to="/players">
    //         <Button className="bp3-minimal" icon="person" text="Players" />
    //       </Link>
    //   </Navbar.Group>
    // </Navbar>
  );
}

export default withRouter(GLNavBar);
