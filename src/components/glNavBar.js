
 import {
  Link,
} from "react-router-dom";

import {
  Navbar,
  Container,
  Nav,
} from 'react-bootstrap';

import { withRouter } from 'react-router'

import goldenLeopardsTextLogo from '../assets/images/goldenLeopardsTextBlue.png';


import './glNavBar.css'

const GLNavBar = () => {
  return (
    <div style={{backgroundColor: '#4f68b1', height: '50px'}}>
      <Container style={{display: 'flex'}}>
        <div style={{flexBasis: 1, flexGrow: 1 }}>
          <img src={goldenLeopardsTextLogo} alt="Logo" height="80px"/>
        </div>
      </Container>
    </div>
  );
}

export default withRouter(GLNavBar);
