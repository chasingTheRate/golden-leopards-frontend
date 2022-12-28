import React from "react";
import {
  Badge,
  Accordion,
  useAccordionButton,
  Card,
  Button,
  Tab,
  Tabs,
} from 'react-bootstrap';
import moment from "moment";
import Image from 'next/image';
import _ from 'lodash';

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

const GLScheduleListItem = ({ record, eventKey, onEditGame, onEditPlayerGameStats }) => {

  const { gamestatus = 'scheduled', logofilename, logoheight = 40, logowidth = 40, playerStats = [] } = record;

  const gameStats = {
    goals: [],
    assists: [],
    saves: [],
    defensive_tackles: []
  };

  playerStats.forEach(p => {
    ['goals', 'assists', 'saves', 'defensive_tackles'].forEach(stat => {
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

  const getScoreOrLogo = () => {
  
    if (gamestatus === 'final') {

      return <div className="sli-score-container">
        { getScore() }
      </div>

    } else {

      return (
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
    }     
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
                { getScoreOrLogo() }
              </div>
            </CustomToggle>
          </div>
        </Card.Header>
        <Accordion.Collapse eventKey={ eventKey }>
          <Card.Body className="sli-card-container">
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
        <hr style={{flexGrow: 1}}></hr>
      </Card>
    </Accordion>
  );
}

export default GLScheduleListItem;
