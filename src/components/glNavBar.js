
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
import goldenLeopardsTextLogo from '../assets/images/goldenLeopardsTextBlue.png';


import './glNavBar.css'

const GLNavBar = () => {
  return (
    <div style={{backgroundColor: '#4f68b1', height: '50px'}}>
      <Container style={{display: 'flex'}}>
        <div style={{display: 'flex', paddingTop: '10px', flexGrow: 1, flexBasis: 1}}>
          <Link to="/" style={{ padding: 0 }}>
            <div>
              <img src={logo} alt="Logo" height="35px"/>
            </div>
          </Link>
        </div>
        <div style={{flexBasis: 1, flexGrow: 1 }}>
          <img src={goldenLeopardsTextLogo} alt="Logo" height="80px"/>
        </div>
        <div style={{flexBasis: 1, flexGrow: 1}}></div>
      </Container>
    </div>
  );
}

export default withRouter(GLNavBar);
