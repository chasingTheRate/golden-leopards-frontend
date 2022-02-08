import React, { useState, useEffect } from "react";
import {
  Container,
  Button,
  Badge
} from 'react-bootstrap';
import moment from 'moment';

const TournamentScheduleTable = ({ columns, data }) => {

  const formatDate = (record) => {
    const { ['Start Date']: startDate, ['End Date']: endDate } = record;

    if (!endDate || startDate === endDate) {
      return moment(startDate, 'YYYY-MM-DD').format('MMM DD');
    }

    return `${moment(startDate, 'YYYY-MM-DD').format('MMM DD')}-${moment(endDate, 'YYYY-MM-DD').format('DD')}`;
  };
  return (
    <Container 
      fluid 
      style={{ 
        padding: 0, 
      }}>
      <div style={{ display: 'flex', flexDirection: 'column'}}>
        { data.map(d => {
          return (
          <div 
          style={{ 
            display: 'flex',
            flexDirection: 'column',
            padding: 12,
            marginBottom: '12px',
            borderColor: 'lightGray', 
            borderStyle: 'solid', 
            borderRadius: '5px'
          }}>
            <div style={{ 
            display: 'flex',
          }}>
              <div style={{ width: '85px', textAlign:'left' }}>{ formatDate(d) }</div>
              <div style={{ flexGrow: 1}}>
                <div>
                  <a href={ d.Url }>{ d.Name }</a>
                </div>
                <div>
                  <span>{ d.Location }</span>
                </div>
              </div>
              <div style={{width: '50px'}}>
                <Button><i className="bi bi-plus-circle"></i></Button>
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'start', height: '40px', alignItems: 'center'}}>
                <div style={{ marginRight: '3px'}}>
                  <Badge >Jackie</Badge>
                </div>
                <div>
                  <Badge>Mckenna</Badge>
                </div>
            </div>
            </div>
            
    
          </div>
          )
        })}
      </div>
    </Container>
  );
}

export default TournamentScheduleTable;