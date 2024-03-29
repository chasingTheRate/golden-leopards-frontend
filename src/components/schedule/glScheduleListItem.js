import React from "react";
import {
  Badge,
  Accordion,
  useAccordionButton,
  Card,
  Button
} from 'react-bootstrap';
import moment from "moment";
import Image from 'next/image';
import _ from 'lodash';

import PlayerGameStats from "../multiuse/playerGameStats";
import { gameStatusOptionKeys } from "./gameProperties";

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

const GLScheduleListItem = ({ record, eventKey, onEditGame, onEditPlayerGameStats, displayOnly }) => {

  const {
    gamestatus = 'scheduled',
    logofilename,
    logoheight = 40,
    logowidth = 40,
    playerStats = [],
    highlights,
    highlights_url,
  } = record;

  const gameStats = {
    goals: [],
    assists: [],
    passes: [],
    saves: [],
    fouls: [],
    defensive_tackles: [],
    attacking_tackles: [],
    captain: []
  };

  playerStats.forEach(p => {
    ['goals', 'assists', 'saves', 'passes', 'fouls', 'defensive_tackles', 'attacking_tackles', 'captain'].forEach(stat => {
      gameStats[stat].push(({ displayname: p.displayname, value: p[stat] }))
    })
  })

  Object.keys(gameStats).forEach(key => {
    gameStats[key].sort((a, b) => (b.value-a.value))
  });

  const getDate = (timestamp) => {
    return (moment.utc(timestamp).local().format('MMM D'));
  };

  const getTime = (timestamp) => {
    return (moment.utc(timestamp).local().format('h:mma'));
  }

  const getHomeAwayBadge = (isHomeTeam, reverseColors) => {

    var badge;
    
    if (isHomeTeam && reverseColors) {
      badge = <Badge className="sli-badge-away" bg="light" text="dark">HOME</Badge>
    } else if (isHomeTeam && !reverseColors) {
      badge = <Badge className="sli-badge-home">HOME</Badge>
    } else if (!isHomeTeam && reverseColors) {
      badge = <Badge className="sli-badge-home">AWAY</Badge>;
    } else if (!isHomeTeam && !reverseColors) {
      badge = <Badge className="sli-badge-away" bg="light" text="dark">AWAY</Badge>
    }

    return badge;
  }

  const handleClick = (e) => {
    e.stopPropagation();
    return true;
  }

  const getOpponentName = () => {
    const { recordgame, opponent, veolink } = record;

    if (recordgame) {
      return <a href={ veolink } onClick={ (e) => handleClick(e) }>{ opponent }</a>
    } else {
      return <span>{ opponent }</span>
    }
  }

  const getScore = () => {

    const { ourscore, opponentscore } = record;
    
    if (Number.isInteger(ourscore) && Number.isInteger(opponentscore)) {
      if (ourscore > opponentscore) {
        return <span className='sli-score-win'>{`W ${ourscore} - ${opponentscore}`}</span>
      } else if (ourscore < opponentscore) {
        return <span className='sli-score-loss'>{`L ${ourscore} - ${opponentscore}`}</span>
      } else {
        return <span className='sli-score-tie'>{`T ${ourscore} - ${opponentscore}`}</span>
      }
    } else {
      return null;
    }
  }

  const finalScoreComponent = (
    <div className="sli-score-container">{ getScore() }</div>
  );

  const canceledScoreComponent = (
    <div className="sli-logo-container">
      <Badge bg='danger'>CANCELED</Badge>
    </div>
  );

  const rainedOutScoreComponent = (
    <div className="sli-logo-container">
      <Badge bg='warning'>RAINED OUT</Badge>
    </div>
  );

  const scheduledScoreComponent = (
    <div className="sli-logo-container">
      { logofilename &&
        <Image 
          src={ `https://d33nclgf902cx6.cloudfront.net/assets/teams/${ logofilename }` } 
          alt="Logo" 
          height={ logoheight } 
          width= { logowidth }
        /> }
    </div>
  )

  const scoreComponents = {
    [gameStatusOptionKeys.final]: finalScoreComponent,
    [gameStatusOptionKeys.canceled]: canceledScoreComponent,
    [gameStatusOptionKeys.scheduled]: scheduledScoreComponent,
    [gameStatusOptionKeys.rainedOut]: rainedOutScoreComponent
  }

  return (
    <Accordion>
      <Card style={{border: 0 }}>
        <Card.Header style={{ padding: 0, border: 0 }}>
          <div className='sli'>
            <CustomToggle eventKey={ eventKey }>
              <div className="sli-container">
                <div className="sli-time-location-container">
                  <span>{ getDate(record.start) }</span>
                  <br></br>
                  <span> { getTime(record.start) }</span>
                  <div>
                    { getHomeAwayBadge(record.is_hometeam, record.reverse_colors) }
                  </div>
                </div>
                <div className="sli-opponent-field-container">
                  <div className='sli-opponent-text'>
                      { getOpponentName() }
                      <div className='sli-location-text'>
                        <span>{ record.field }</span>
                      </div>
                  </div>
                </div>
                { scoreComponents[gamestatus] }
              </div>
            </CustomToggle>
          </div>
        </Card.Header>
        { !displayOnly &&
          <Accordion.Collapse eventKey={ eventKey }>
            <Card.Body className="sli-card-container">
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
                    allowFullScreen
                    style={{
                      position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', borderRadius: '5px'
                    }}>
                  </iframe>
                </div>
              }
              <PlayerGameStats gameStats={ gameStats }></PlayerGameStats>
              <div className="sli-action-container">
                <div className="sli-action-button-container">
                  <Button
                    size="sm"
                    onClick= { (e) =>  onEditGame(record) }
                  ><i className="bi bi-pencil"></i></Button>
                </div>
                <div className="sli-action-button-container">
                  <Button
                    size="sm"
                    onClick={( (e) => onEditPlayerGameStats(record)) }
                  ><i className="bi bi-clipboard-data"></i></Button>
                </div>
              </div>
            </Card.Body>
          </Accordion.Collapse>
        }
        <hr style={{flexGrow: 1}}></hr>
      </Card>
    </Accordion>
  );
}

export default GLScheduleListItem;
