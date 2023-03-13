import React, { useState, useEffect } from "react";
import {
  Button,
  Badge
} from 'react-bootstrap';
import moment from "moment";

const TournamentListItem = ({record, onAdd }) => {

  const [notAttending, setNotAttending] = useState(false);

  useEffect(() => {
    const { status } = record;
    setNotAttending(status === 'not attending');
  }, []);

  const formatDate = (record) => {
    let { startdate, enddate } = record;

    startdate = moment(startdate, 'YYYY-MM-DD').format('MMM D');
    const startMonth = moment(startdate, 'MMM D').format('MMM');
    const startDay = moment(startdate, 'MMM D').format('DD');

    enddate = moment(enddate, 'YYYY-MM-DD').format('MMM D');
    const endMonth = moment(enddate, 'MMM D').format('MMM');
    const endDay = moment(enddate, 'MMM D').format('D');

    if (startdate === enddate) {
      return startdate;
    }

    return `${startdate}-${endDay}`;
  }

  const isFilled = () => {
    const { status = '' } = record;
    return status === 'filled';
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'accepted':
        return <Badge className='tli-status-badge' bg="success">ACCEPTED</Badge>
      case 'registered':
        return <Badge className='tli-status-badge' bg="info">REGISTERED</Badge>
      case 'not attending':
        return <Badge className='tli-status-badge' bg="warning">NOT ATTENDING</Badge>
      default:
        return null
    }
  }

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

  return (
    <div className={ getClassName() }>
        <div style={{ 
          display: 'flex',
        }}>
          <div style={{
              display: 'flex',
              flexGrow: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              textAlign: 'center'
            }}>
            <div style={{ lineHeight: '1.1em', fontWeight: 500}}>
                { getStatusBadge(record.status) }
                <a href={ record.url }>{ record.name }</a>
                <br></br>
                <span
                  style={{
                    color: 'rgb(75 75 75)',
                    fontWeight: 600, 
                    fontSize: '0.8em',
                  }}
                >{ formatDate(record) }</span>
                <span style={{
                    color: 'rgb(75 75 75)',
                    fontWeight: 600, 
                    fontSize: '0.8em',
                  }}> | </span>
                <span
                  style={{ 
                    fontSize: '0.8em',
                    color: '#ffd700',
                    fontWeight: 600
                }}
                >{ record.location }</span>
            </div>
          </div>
          { 
            !notAttending &&
              <div style={{width: '50px'}}>
                <Button disabled={ isDisabled(record.status) } onClick={ (e) => onAdd(record) }><i className="bi bi-person-add"></i></Button>
              </div>
          }
        </div>
        { (record.players && !notAttending) && 
        
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              height: '20px',
              margin: '5px',
              padding: '0 30px 0 30px'
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
        <div>
          { !notAttending &&
              <hr style={{marginTop: 0}}></hr>
          }
        </div>
      </div>
      );
}

export default TournamentListItem;
