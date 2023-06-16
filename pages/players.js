import React, { useState, useEffect } from "react";
import {
  Container,
} from 'react-bootstrap';

import Banner from '../src/components/banner/banner';
import TournamentBanner from '../src/components/banner/tournamentBanner';
import Image from 'next/image';

const GLPlayers = () => {
  return (
    <Container fluid style={{
      backgroundColor: 'white',
      height: '100%'
    }}>
      <Container style={{
        padding: '40px 12px 0 12px'
      }}>
        <Container className="player-list" style={{padding: 0}}>
          <div style={{display: 'flex'}}>
            <div style={{
              display: 'flex',
              justifyContent: 'start',
              alignItems: 'center',
              fontSize: '25px',
              width: '40px',
              color: '#15469d',
              }}>
              <span style={{fontWeight: 500}}>7</span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'start',
              alignItems: 'center',
              width: '70px',
            }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                overflow: 'hidden',}}
              >
                <Image 
                  src={ `https://d33nclgf902cx6.cloudfront.net/assets/players/jackie.jpeg` } 
                  alt="Logo" 
                  height={ 60 } 
                  width= { 60 }
                />
              </div>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '25px',
              flexGrow: 1,
              color: '#15469d'
            }}>
              <span style={{fontWeight: 600}}>Jackie</span>
            </div>
          <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'start',
              fontSize: '10px',
              color: 'rgb(75 75 75)',
              flexDirection: 'column',
              width: '70px',
            }}>
              <div><span style={{fontWeight: 700}}>GOALS: </span><span>1</span></div>
              <div><span style={{fontWeight: 700}}>ASSISTS: </span><span>2</span></div>
              <span><span style={{fontWeight: 700}}>TACKLES: </span><span>10</span></span>
              <span><span style={{fontWeight: 700}}>SAVES: </span><span>3</span></span>
            </div>
          </div>
          <hr></hr>
        </Container>
      </Container>
        
    </Container>
  );
}

export default GLPlayers;
