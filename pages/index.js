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
      <div className='last-game-container' style={{ paddingTop: '30px'}}>
        <div className='game-highlights-container' style={{ position: 'relative', width: '100%', paddingBottom: '56.25%'}}>
          <iframe
            style={{ position: 'absolute', top: 0,  left: 0, width: '100%', height: '100%', border: 0}}
            src="https://www.youtube.com/embed/VW_zFouGEac?autoplay=1&mute=1"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen>
          </iframe>
        </div>
      </div>
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
