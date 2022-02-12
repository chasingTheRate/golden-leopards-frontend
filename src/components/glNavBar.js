
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
    <Navbar expand="xl" mx-auto style={{height: '50px'}}>
  <Container>
    <Link to="/" className="navbar-brand" style={{ padding: 0 }}>
      <div>
        <img src={logo} alt="Logo" height="35px"/>
      </div>
    </Link>
  </Container>
</Navbar>
  );
}

export default withRouter(GLNavBar);
