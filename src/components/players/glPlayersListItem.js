import React, { useState, useEffect } from "react";
import {
  Button,
  Badge
} from 'react-bootstrap';
import moment from "moment";
import Image from 'next/image';

import styled from 'styled-components';

const GLPlayerNumber = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  font-size: 25px;
  width: 45px;
  color: #15469d;

  span {
    font-weight: 500
  }
`

const GLPlayerImage = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 70px;
`

const GLPlayerImageMask = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
`

const GLPlayerImageDefault = styled.div`
  font-size: 50px;
  color: rgb(225, 225, 225);
`

const GLPlayerName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  flex-grow: 1;
  color: #15469d;

  span {
    font-weight: 600;
  }
`
const GLPlayerStats = styled.div`
  display: flex;
  justify-content: ;center;
  align-items: start;
  font-size: 10px;
  color: rgb(75 75 75);
  flex-direction: column;
  width: 70px;

  .gl-player-stats-title {
    font-weight: 700
  }
`

const PlayerListItem = ({player }) => {
  return (
    <div>
      <div style={{display: 'flex'}}>
        <GLPlayerNumber>
          <span>{ player.jerseynumber }</span>
        </GLPlayerNumber>
        <GLPlayerImage>
          { player.s3_filename 
            ?
              <GLPlayerImageMask>
                <Image 
                  src={ `https://d33nclgf902cx6.cloudfront.net/assets/players/jackie2.jpeg` } 
                  alt="Logo" 
                  height={ 60 } 
                  width= { 60 }
                />
              </GLPlayerImageMask>
            : 
              <GLPlayerImageDefault>
                <i className="bi bi-person-circle"></i>
              </GLPlayerImageDefault>
            }
        </GLPlayerImage>
        <GLPlayerName>
          <span>{ player.displayname }</span>
        </GLPlayerName>
      <GLPlayerStats>
          <div><span className="gl-player-stats-title">GAMES: </span><span>{player.games}</span></div>
          <div><span className="gl-player-stats-title">GOALS: </span><span>{player.goals}</span></div>
          <div><span className="gl-player-stats-title">ASSISTS: </span><span>{player.assists}</span></div>
          <div><span className="gl-player-stats-title">TACKLES: </span><span>{player.tackles}</span></div>
          <div><span className="gl-player-stats-title">SAVES: </span><span>{player.saves}</span></div>
        </GLPlayerStats>
      </div>
      <hr></hr>
    </div>
  );
}

export default PlayerListItem;
