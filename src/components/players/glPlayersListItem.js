import React, { useState, useEffect } from "react";
import {
  Button,
  Badge
} from 'react-bootstrap';
import moment from "moment";
import Image from 'next/image';
import styled from 'styled-components';

import GLLink from "../multiuse/glLink";

const GLPlayerNumber = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  font-size: 25px;
  color: #15469d;
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 35px;
  span {
    font-weight: 500
  }
`

const GLPlayerImage = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
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
  color: #15469d;

  span {
    font-weight: 600;
  }
`
const GLPlayerStats = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: ;center;
  align-items: start;
  font-size: 10px;
  color: rgb(75 75 75);
  flex-direction: column;

  .gl-player-stats-title {
    font-weight: 700
  }
`
const handleLinkClick = (e) => {
  e.stopPropagation();
  return true;
}

const PlayerListItem = ({player }) => {
  return (
    <div>
      <div style={{display: 'flex'}}>
        <div style={{display: 'flex', flexGrow: 1, flexBasis: 0}}>
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
        </div>
        <div style={{display: 'flex', flexGrow: 2, flexBasis: 0, justifyContent: 'center', alignItems: 'center', minWidth: 0}}>
          <GLPlayerName>
            <GLLink href={`/players/${encodeURIComponent(player.id)}`} name={ player.displayname } onClick={ handleLinkClick }></GLLink>
          </GLPlayerName>
        </div>
        <div style={{flexGrow: 1, flexBasis: 0}}>
          <GLPlayerStats>
            <div><span className="gl-player-stats-title">GAMES: </span><span>{player.games}</span></div>
            <div><span className="gl-player-stats-title">GOALS: </span><span>{player.goals}</span></div>
            <div><span className="gl-player-stats-title">ASSISTS: </span><span>{player.assists}</span></div>
            <div><span className="gl-player-stats-title">TACKLES: </span><span>{player.tackles}</span></div>
            <div><span className="gl-player-stats-title">ATT TACKLES: </span><span>{player.attacking_tackles}</span></div>
            <div><span className="gl-player-stats-title">SAVES: </span><span>{player.saves}</span></div>
          </GLPlayerStats>
        </div>
      </div>
      <hr></hr>
    </div>
  );
}

export default PlayerListItem;
