import React, { useState, useEffect } from "react";
import Image from 'next/image';

import { getNextGames } from '../src/api/goldenLeopardsApi';
import {
  Container,
} from 'react-bootstrap';

import logo from '../public/goldenLeopards.png';
import NextGameList from '../src/components/next-game/glNextGameList';

// This gets called on every request
export async function getServerSideProps() {

  // Fetch data from external API
  const data = await getNextGames();
  // Pass data to the page via props
  return { props: { data } }
}

const GLHome = ({ data }) => {

  return (
    <Container className="gl-home" fluid>
      <div className="next-game-title-container">
        <h5>Next Games</h5>
      </div>
      <Container className="next-game-container">
        <NextGameList data={ data }></NextGameList>
      </Container>
      <div className="logo-container">
        <div>
          <Image src={logo} alt="Logo" height="75px" width="75"/>
        </div>
      </div>
    </Container>
  );
}

export default GLHome;
