import React, { useState, useEffect } from "react";
import {
  Container,
} from 'react-bootstrap';

import {
  getRoster,
} from '../src/api/goldenLeopardsApi';

import GLPlayersList from '../src/components/players/glPlayersList';

export async function getServerSideProps() {

  const players = await getRoster();

  return { props: { players } }
}

const GLPlayers = ({
  players = [] 
}) => {
  return (
    <Container fluid style={{
      backgroundColor: 'white'
    }}>
      <Container style={{
        padding: '40px 12px 0 12px'
      }}>
        <GLPlayersList
          players={players}
        ></GLPlayersList>
      </Container>
        
    </Container>
  );
}

export default GLPlayers;
