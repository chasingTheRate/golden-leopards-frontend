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

import PlayerGameStats from "../multiuse/playerGameStats";


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
  
  const router = useRouter();
  
  const { 
    ourscore, 
    opponentscore, 
    opponentshortname = 'OPP',
    logofilename,
    logoheight,
    logowidth,
    recordgame,
    veolink,
    playerStats = [],
    highlights = false,
    highlights_url
  } = record;

  const gameStats = {
    goals: [],
    assists: [],
    saves: [],
    defensive_tackles: [],
    attacking_tackles: [],
    captain: []
  };

  playerStats.forEach(p => {
    ['goals', 'assists', 'saves', 'defensive_tackles', 'attacking_tackles', 'captain'].forEach(stat => {
      gameStats[stat].push(({ displayname: p.displayname, value: p[stat] }))
    })
  })

  Object.keys(gameStats).forEach(key => {
    gameStats[key].sort((a, b) => (b.value-a.value))
  });

  const handleVideoClick = () => {
    router.push(veolink);
  }

  return (
    <Accordion defaultActiveKey={ eventKey }>
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
                <span>{ ourscore }</span>
              </div>
              <div className='grli-half-text-container'>
                <span>FT</span>
              </div>
              <div className='grli-score-text-container'>
                <span>{ opponentscore }</span>
              </div>
              <div className='grli-logo-top-container grli-opp-logo-container'>
                <div className='grli-logo-container'>
                  <div>
                    { logofilename 
                      ? <Image src={ `https://d33nclgf902cx6.cloudfront.net/assets/teams/${ logofilename }` }  alt="Logo" height={ logoheight } width={ logowidth }/>
                      : <div className='grli-logo-placeholder'></div>
                    }
                  </div>
                  <div className='grli-team-name-text-container'>
                    <span>{ opponentshortname }</span>
                  </div>
                </div>
              </div>
          </div>
        </CustomToggle>
        </div>
        </Card.Header>
        <Accordion.Collapse eventKey={ eventKey }>
          <Card.Body style={{ padding: '12px 0 0 0'}}>
            { highlights &&
              <div className="youtube-container" style={{
                position: 'relative',
                paddingBottom: '56.25%',
                width: '100%',
                overflow: 'hidden',
                marginBottom: '13px'
              }}>
                <iframe 
                  src={ highlights_url }
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullscreen
                  style={{
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', borderRadius: '5px'
                  }}>
                </iframe>
              </div>
            }
            <PlayerGameStats gameStats={ gameStats }></PlayerGameStats>
            { recordgame &&
              <div style={{display: 'flex', flexDirection: 'column'}} className='sli-action-container'>
                <div style={{paddingTop: '5px'}}>
                  <Button
                    style={{backgroundColor: 'red'}}
                    size="sm"
                    disabled={ !recordgame }
                    onClick={ handleVideoClick }
                  ><i className="bi bi-camera-video"></i></Button>
                </div>
              </div>
            }
          </Card.Body>
        </Accordion.Collapse>
        <hr style={{flexGrow: 1}}></hr>
      </Card>
    </Accordion>
  );
}

export default GLGameResultItem;
