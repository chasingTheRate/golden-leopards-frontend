import React, { useState, useEffect } from "react";
import Image from 'next/image';

import { getNextGames } from '../src/api/goldenLeopardsApi';
import {
  Container,
} from 'react-bootstrap';

import logo from '../public/goldenLeopards.png';
import GLNextGameContainer from '../src/components/next-game/glNextGameContainer';


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
      <GLNextGameContainer data={ data }></GLNextGameContainer>
      <div className="logo-container">
        <div>
          <Image src={logo} alt="Logo" height="75px" width="75"/>
        </div>
      </div>
    </Container>
  );
}

export default GLHome;
