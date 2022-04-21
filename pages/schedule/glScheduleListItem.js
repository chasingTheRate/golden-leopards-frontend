import React from "react";
import {
  Button,
  Badge
} from 'react-bootstrap';
import moment from "moment";

const GLScheduleListItem = ({ record }) => {

  const getDate = (timestamp) => {
    return (moment.utc(timestamp).format('MMM D'));
  };

  const getTime = (timestamp) => {
    return (moment.utc(timestamp).local().format('h:mma'));
  }

  const getHomeAwayBadge = (homeTeam) => {
    if ((homeTeam === 'Dash Woodlands 2010/11 - Johnson 1') || (homeTeam === 'Dash Woodlands 2010/11 - Johnson 2')) {
        return <Badge className="sli-badge-home">HOME</Badge>
    } else {
      return <Badge className="sli-badge-away" bg="light" text="dark">AWAY</Badge>
    }
  }

  const getOpponentName = () => {
    const { recordedGame, opponent, veoLink } = record;

    if (recordedGame) {
      return <a href={ veoLink }>{ opponent }</a>
    } else {
      return <span>{ opponent }</span>
    }
  }

  const getScore = () => {
    const { ourScore, opponentScore } = record;
    
    if (Number.isInteger(ourScore) && Number.isInteger(opponentScore)) {
      if (ourScore > opponentScore) {
        return <span className='sli-score-win'>{`W ${ourScore} - ${opponentScore}`}</span>
      } else if (ourScore < opponentScore) {
        return <span className='sli-score-loss'>{`L ${ourScore} - ${opponentScore}`}</span>
      } else {
        return <span className='sli-score-tie'>{`T ${ourScore} - ${opponentScore}`}</span>
      }
    } else {
      return null;
    }
  }

  return (
    <div 
      className='tli'
      style={{ 
        display: 'flex',
        flexDirection: 'column',
        padding: 12,
        marginBottom: '12px',
        borderRadius: '5px',
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
        backgroundColor: 'white'
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
              { getHomeAwayBadge(record.homeTeam) }
            </div>
          </div>
          <div style={{
              display: 'flex',
              flexGrow: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '3px 5px 3px 5px'
            }}>
            <div className='sli-opponent-text' style={{ lineHeight: '1.1em' }}>
                { getOpponentName() }
                <div className='sli-location-text'>
                  <span>{ record.field }</span>
                </div>
            </div>
          </div>
            <div className="sli-score-container">
                { getScore() }
            </div>
        </div>
      </div>
      );
}

export default GLScheduleListItem;
