import React, { useState, useEffect } from "react";

import {
  Container,
  Button
} from 'react-bootstrap';

import GamesTable from '../components/gamesTable';

import { getGames } from '../api/goldenLeopardsApi';

const GLGames = () => {

  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const games = await getGames();
      setGames(games);
    }
    fetchData();
  }, []);

  const onFilter = (e) => {
    console.log('onFitler');
  }

  return (
    <Container fluid style={{ overflow: 'scroll' }}>
      <Container fluid style={{display: 'flex', flexDirection: 'row-reverse', padding: 0, marginBottom: '10px'}}>
          <Button onClick={onFilter}><i class="bi bi-filter"></i></Button>
      </Container>
      <GamesTable data={ games }></GamesTable>
    </Container>
  );
}

export default GLGames;
