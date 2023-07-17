import React, { useState, useEffect } from "react";
import {
  Button,
  Badge
} from 'react-bootstrap';
import moment from "moment";

import GLExpandableContainer from "../multiuse/glExpandableContainer";
import TournamentListItemAccordian from "../tournaments/tournamentListItemAccordian";

const FriendlyListItem = (props) => {

  const { record, handleAddPlayer } = props;

  const { gamestatus = 'scheduled', logofilename, logoheight = 40, logowidth = 40, playerStats = [] } = record;

  const [notAttending, setNotAttending] = useState(false);

  useEffect(() => {
    const { status } = record;
    setNotAttending(status === 'not attending');
  }, []);

 
  const isDisabled = (status) => {
    
    let isDisabled = false;
    switch (status) {
      case 'accepted':
      case 'registered':
      case 'not attending':
        isDisabled = true;
        break;
      default:
        isDisabled = false;
    }
    return isDisabled;
  }

  const getClassName = () => notAttending ? 'tli not-attending' : 'tli';


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

    } else if (gamestatus === 'canceled') {
      return (
        <div className="sli-logo-container">
          <Badge bg='danger'>CANCELED</Badge>
        </div>
      )
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

  const header = (
    <div>
        <div style={{ 
          display: 'flex',
        }}>
          <div style={{
              display: 'flex',
              flexGrow: 1,
              flexDirection: 'row'
            }}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                flexGrow: 2,
                fontWeight: 600,
                fontSize: '.8em',
                color: '#4b4b4b',
              }}>
                <span>{ getDate(record.start) }</span>
                <span> { getTime(record.start) }</span>
                <div>
                  { getHomeAwayBadge(record.is_hometeam, record.reverse_colors) }
                </div>
              </div>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                flexGrow: 1
              }}>
                <span style={{
                  fontWeight: 500,
                  fontSize: '.9em',
                  lineHeight: 1.1,
                  color: '#4b4b4b'
                }}>
                  { getOpponentName() }
                </span>
                <div style={{padding: '8px 0 0 0'}}>
                  <span style={{
                    lineHeight: '1em',
                    fontWeight: 500,
                    fontSize: '.8em',
                    color: '#969696',
                  }}>{ record.field }</span>
                </div>
                { getScoreOrLogo() }
              </div>
              <div style={{
                flexGrow: 2,
                display: 'flex',
                alignItems: 'start',
                justifyContent: 'end'
              }}>
                <Button disabled={ isDisabled(record.status) } onClick={ (e) => handleAddPlayer(e, record) }><i className="bi bi-person-add"></i></Button>
              </div>
          </div>
        </div>
        { (record.players && !notAttending) && 
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              height: '20px',
              margin: '5px',
            }}>
              <hr style={{flexGrow: 1}}></hr>
              <span style={{
                fontSize: '0.7em',
                color: 'rgb(100 100 100)',
                fontWeight: 600
              }}
              >&nbsp; Intrested &nbsp;</span>
              <hr style={{flexGrow: 1}}></hr>
            </div>
            <div>
              <div style={{
                display: 'flex',
                justifyContent: 'start',
                height: '40px',
                overflowX: 'scroll'
              }}>
                { record.players && record.players.map((i, index) => (
                  <div key={`players-badge-${index}`} style={{ marginRight: '3px'}}>
                    <Badge bg="secondary">{ i }</Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        }
      </div>
  )
  return (
    <div className={ getClassName() }>
      <GLExpandableContainer
        header= { header }
        accordion={
          <TournamentListItemAccordian
            record= {record}
            onEdit= {(record) => onEditTournament(record)}
          ></TournamentListItemAccordian>
        }
      ></GLExpandableContainer>
    </div>
  );
}

export default FriendlyListItem;
