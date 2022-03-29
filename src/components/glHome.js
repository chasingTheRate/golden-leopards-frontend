import React, { useState, useEffect } from "react";
import { getNextGames } from '../api/goldenLeopardsApi';
import {
  Container,
} from 'react-bootstrap';

import './glHome.css'
import logo from '../assets/images/goldenLeopards.png';
import NextGameList from './next-game/glNextGameList';

const GLHome = () => {

  const [nextGames, setNextGames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await getSeasonNextGames();
    }
    fetchData();
  }, []);

  const getSeasonNextGames = async () => {
    const nextGames = await getNextGames();
    setNextGames(nextGames);
  }

  return (
    <Container className="gl-home" fluid>
      <h5>Next Game</h5>
      <Container className="next-game-container">
        <NextGameList data={ nextGames }></NextGameList>
      </Container>
      <div className="logo-container">
          <img src={logo} alt="Logo" height="75px"/>
      </div>
    </Container>
  );
}

export default GLHome;
