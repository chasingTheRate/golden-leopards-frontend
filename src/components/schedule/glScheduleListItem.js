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

const GLScheduleListItem = ({ record, eventKey, onEditGame }) => {

  const { gamestatus = 'scheduled', logofilename, logoheight = 40, logowidth = 40 } = record;

  const getDate = (timestamp) => {
    return (moment.utc(timestamp).format('MMM D'));
  };

  const getTime = (timestamp) => {
    return (moment.utc(timestamp).local().format('h:mma'));
  }

  const getHomeAwayBadge = (hometeam) => {
    if ((hometeam === 'Dash Woodlands 2010/11 - Johnson 1') || (hometeam === 'Dash Woodlands 2010/11 - Johnson 2')) {
        return <Badge className="sli-badge-home">HOME</Badge>
    } else {
      return <Badge className="sli-badge-away" bg="light" text="dark">AWAY</Badge>
    }
  }

  const getOpponentName = () => {
    const { recordgame, opponent, veolink } = record;

    if (recordgame) {
      return <a href={ veolink }>{ opponent }</a>
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
                    { getHomeAwayBadge(record.hometeam) }
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
            <div className="sli-action-container">
              <div className="sli-action-button-container">
                <Button
                  size="sm"
                  onClick= { (e) =>  onEditGame(record) }
                ><i className="bi bi-pencil"></i></Button>
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
