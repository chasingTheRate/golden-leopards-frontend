import React from "react";
import {
  Button,
  Badge
} from 'react-bootstrap';
import moment from "moment";

const TournamentListItem = ({record, onAdd }) => {

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

  const getMonth = (record) => {
    const { ['Start Date']: startDate, ['End Date']: endDate } = record;

    const startMonth = moment(startDate, 'YYYY-MM-DD').format('MMM');
    const endMonth = moment(endDate, 'YYYY-MM-DD').format('MMM');

    if (startMonth === endMonth) {
      return startMonth;
    }

    return `${startMonth}-${endMonth}`;
  };

  const getDates = (record) => {
    let { ['Start Date']: startDate, ['End Date']: endDate } = record;

    startDate = moment(startDate, 'YYYY-MM-DD').format('DD');
    endDate = moment(endDate, 'YYYY-MM-DD').format('DD');

    if (startDate === endDate) {
      return startDate;
    }

    return `${startDate}-${endDate}`;
  };

  return (
    <div 
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
              display: 'flex',
              flexGrow: 1,
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
            <div style={{ lineHeight: '1.1em', fontWeight: 500}}>
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
            <Button onClick={ (e) => onAdd(record) }><i className="bi bi-plus-circle"></i></Button>
          </div>
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
                <Badge>{ i }</Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
      );
}

export default TournamentListItem;