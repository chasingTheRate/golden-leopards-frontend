import React from "react";
import {
  Accordion,
  useAccordionButton,
  Card,
  Button
} from 'react-bootstrap';

import Image from 'next/image';
import { useRouter } from 'next/router'

import logo from '../../../public/goldenLeopards.png';


function CustomToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionButton(eventKey);
  return (
    <div
      onClick={decoratedOnClick}
    >
      {children}
    </div>
  );
}

const GLGameResultItem = ({ record, eventKey }) => {
  
  const router = useRouter()

  const { 
    ourScore, 
    opponentScore, 
    opponentShortName = 'OPP',
    teamLogoFileName,
    teamLogoHeight,
    teamLogoWidth,
    recordedGame,
    veoLink
  } = record;

  const handleVideoClick = () => {
    router.push(veoLink);
  }

  return (
    <Accordion>
      <Card style={{border: 0 }}>
        <Card.Header style={{ padding: 0, border: 0 }}>
          <div className='grli'>
            <CustomToggle eventKey={ eventKey }>
              <div className='grli-score-container'>
              <div className='grli-logo-top-container'>
                <div className='grli-logo-container'>
                  <div>
                    <Image src={logo} alt="Logo" height="40px" width="40"/>
                  </div>
                  <div className='grli-team-name-text-container'>
                    <span>GL</span>
                  </div>
                </div>
              </div>
              <div className='grli-score-text-container'>
                <span>{ ourScore }</span>
              </div>
              <div className='grli-half-text-container'>
                <span>FT</span>
              </div>
              <div className='grli-score-text-container'>
                <span>{ opponentScore }</span>
              </div>
              <div className='grli-logo-top-container grli-opp-logo-container'>
                <div className='grli-logo-container'>
                  <div>
                    { teamLogoFileName 
                      ? <Image src={ `https://d33nclgf902cx6.cloudfront.net/assets/teams/${ teamLogoFileName }` }  alt="Logo" height={ teamLogoHeight } width={ teamLogoWidth }/>
                      : <div className='grli-logo-placeholder'></div>
                    }
                  </div>
                  <div className='grli-team-name-text-container'>
                    <span>{ opponentShortName }</span>
                  </div>
                </div>
              </div>
          </div>
        </CustomToggle>
        </div>
        </Card.Header>
        <Accordion.Collapse eventKey={ eventKey }>
          <Card.Body style={{ padding: '12px 0 0 0'}}>
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <div style={{paddingTop: '5px'}}>
                <Button
                  size="sm"
                  disabled={ !recordedGame }
                  onClick={ handleVideoClick }
                ><i className="bi bi-camera-video"></i></Button>
              </div>
            </div>
          </Card.Body>
        </Accordion.Collapse>
        <hr style={{flexGrow: 1}}></hr>
      </Card>
    </Accordion>
  );
}

export default GLGameResultItem;
