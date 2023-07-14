import React, { useState, useEffect } from "react";
import {
  Container,
} from 'react-bootstrap';

// import {
//   getPlayersWithCurrentStats,
// } from '../src/api/goldenLeopardsApi';


export async function getServerSideProps() {


  return { props: {  } }
}

const GLFriendlies = ({
  players = [] 
}) => {
  return (
    <Container fluid style={{
      backgroundColor: 'white'
    }}>
      <Container style={{
        padding: '40px 12px 0 12px'
      }}>
        <div>TEST</div>
      </Container>
    </Container>
  );
}

export default GLFriendlies;
