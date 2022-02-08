import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";

import {
  Container,
} from 'react-bootstrap';

import Pitch from './pitch/pitch';
import ReservesArea from './reservesArea/reservesArea';

import './field.css';

const Field = () => {
  return (
      <Container style={{position: 'relative', width: '100%', padding: 0}}>
          <Pitch></Pitch>
          <ReservesArea></ReservesArea>
          <div style={{
            position: 'absolute',
            width: '100%', height: '100%',
            backgroundColor: 'transparent',
            top: 0,
            left: 0,
            }}>
                <Draggable bounds='parent'>
                  <div style={{height: '50px', width: '50px', backgroundColor: 'black', color: 'white', top: "25px", left: '50px'}}>
                    test
                  </div>
                </Draggable>
          </div>
      </Container>
  );
}

export default Field;
