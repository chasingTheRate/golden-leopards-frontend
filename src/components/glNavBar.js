
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

import './glNavBar.css'

const GLNavBar = () => {
  return (
    <Navbar expand="lg">
  <Container>
    <Link to="/" className="navbar-brand">
      <div style={{height: '50px'}}>
        <img src={logo} alt="Logo" height="55px"/>
      </div>
    </Link>
  </Container>
</Navbar>
  );
}

export default withRouter(GLNavBar);
