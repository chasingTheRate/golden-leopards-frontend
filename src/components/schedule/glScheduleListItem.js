import React from "react";
import {
  Button,
  Badge
} from 'react-bootstrap';
import moment from "moment";

import './glScheduleListItem.css';

const GLScheduleListItem = ({record, onAdd }) => {

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
            <span>Mar 5</span>
            <br></br>
            <span>11:30am</span>
            <div>
              <Badge className="sli-badge-away" bg="light" text="dark">AWAY</Badge>
            </div>
          </div>
          <div style={{
              display: 'flex',
              flexGrow: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '0 5px 0 5px'
            }}>
            <div style={{ lineHeight: '1.1em', fontWeight: 500, color: '#4f68b1'}}>
                <span>Dash Woodlands 2008/09 - Cumbie</span>
                <div className='sli-location-text'>
                  <span href="">Bear Branch Sportsfields (BB) Field # 1B Recreational</span>
                </div>
            </div>
          </div>
            <div className="sli-score-container">
                <span>L 0-6</span>
            </div>
        </div>
      </div>
      );
}

export default GLScheduleListItem;
