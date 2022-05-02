import React, { useState, useEffect } from "react";
import Image from 'next/image';

import { getNextGames, getLastGameResults } from '../src/api/goldenLeopardsApi';
import {
  Container,
} from 'react-bootstrap';

import logo from '../public/goldenLeopards.png';
import GLNextGameContainer from '../src/components/next-game/glNextGameContainer';
import GLGameResultContainer from '../src/components/game-result/gameResultContainer';

export async function getServerSideProps() {
  const data = await getNextGames();
  const lastGameResultsData = await getLastGameResults();
  return { props: { data, lastGameResultsData } }
}

const GLHome = ({ data, lastGameResultsData }) => {

  return (
    <Container className="gl-home" fluid>
      <GLGameResultContainer data={ lastGameResultsData }></GLGameResultContainer>
      <GLNextGameContainer data={ data }></GLNextGameContainer>
    </Container>
  );
}

export default GLHome;
