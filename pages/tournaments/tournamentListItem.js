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
    let { ['Start Date']: startDate, ['End Date']: endDate } = record;

    startDate = moment(startDate, 'YYYY-MM-DD').format('MMM D');
    const startMonth = moment(startDate, 'MMM D').format('MMM');
    const startDay = moment(startDate, 'MMM D').format('DD');

    endDate = moment(endDate, 'YYYY-MM-DD').format('MMM D');
    const endMonth = moment(endDate, 'MMM D').format('MMM');
    const endDay = moment(endDate, 'MMM D').format('D');

    if (startDate === endDate) {
      return startDate;
    }

    return `${startDate}-${endDay}`;
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
                <a href={ record.Url }>{ record.Name }</a>
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
                >{ record.Location }</span>
            </div>
          </div>
          <div style={{width: '50px'}}>
            <Button color='red' disabled={ isDisabled(record.status) } onClick={ (e) => onAdd(record) }><i className="bi bi-plus-circle"></i></Button>
          </div>
        </div>
        { (record.interested && !notAttending) && 
        
          <div>
            <div style={{display: 'flex', alignItems: 'center', height: '20px', marginTop: '5px' }}>
              <hr style={{flexGrow: 1}}></hr>
              <span style={{
                fontSize: '0.7em',
                color: 'rgb(100 100 100)',
                fontWeight: 600
              }}
              >&nbsp; INTERESTED &nbsp;</span>
              <hr style={{flexGrow: 1}}></hr>
            </div>
            <div>
              <div style={{
                display: 'flex',
                justifyContent: 'start',
                height: '40px',
                alignItems: 'center',
                overflowX: 'scroll'
              }}>
                { record.interested && record.interested.map((i, index) => (
                  <div key={`interested-badge-${index}`} style={{ marginRight: '3px'}}>
                    <Badge bg="secondary">{ i }</Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        }
      </div>
      );
}

export default TournamentListItem;
