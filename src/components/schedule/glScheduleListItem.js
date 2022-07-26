import React from "react";
import {
  Badge
} from 'react-bootstrap';
import moment from "moment";

import Image from 'next/image';

const GLScheduleListItem = ({ record }) => {

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
    <div 
      className='sli'
      style={{ 
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#fff'
      }}>
        <div style={{ 
          display: 'flex',
        }}>
          <div style={{
                color: 'rgb(75 75 75)',
                fontWeight: 600, 
                fontSize: '0.8em',
                textAlign: 'start',
                padding: '0 5px 0 5px'
              }}>
            <span>{ getDate(record.start) }</span>
            <br></br>
            <span> { getTime(record.start) }</span>
            <div>
              { getHomeAwayBadge(record.hometeam) }
            </div>
          </div>
          <div style={{
              display: 'flex',
              flexGrow: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '3px 5px 3px 5px',
              textAlign: 'center'
            }}>
            <div className='sli-opponent-text' style={{ lineHeight: '1.1em' }}>
                { getOpponentName() }
                <div className='sli-location-text'>
                  <span>{ record.field }</span>
                </div>
            </div>
          </div>
            { getScoreOrLogo() }
        </div>
        <hr style={{flexGrow: 1}}></hr>
      </div>
      );
}

export default GLScheduleListItem;
