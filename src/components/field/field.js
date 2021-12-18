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
      <Container style={{height: '100%'}}>
          <Pitch></Pitch>
          <ReservesArea></ReservesArea>
          <Draggable bounds='parent'>
            <div style={{height: '50px', width: '50px', backgroundColor: 'red'}}></div>
          </Draggable>
      </Container>
  );
}

export default Field;
