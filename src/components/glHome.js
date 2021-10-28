import React, { useState, useEffect } from "react";

import {
  Container,
  Table
} from 'react-bootstrap';

import { getPlayersStats } from '../api/goldenLeopardsApi';

const GLHome = () => {

  const [playersStats, setPlayersStats] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const playersStats = await getPlayersStats();
      console.log(playersStats);
      setPlayersStats(playersStats);
    }
    fetchData();
  }, []);

  const getRows = () => {
    return playersStats.map( (p, index) => {
      return (
        <tr key={index}>
          <td>{p.playerName}</td>
          <td>{`${p.total_goals}`}</td>
          <td>{`${p.total_assists}`}</td>
          <td>{`${p.total_saves}`}</td>
          <td>{`${p.total_goals_allowed}`}</td>
          <td>{`${p.avg_minutes_played_per_game}`}</td>
        </tr>
      )
    })
  }

  return (
      <Container fluid>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Player</th>
              <th>Goals</th>
              <th>Assists</th>
              <th>Saves</th>
              <th>Goals Allowed</th>
              <th>Avg min/gm</th>
            </tr>
          </thead>
          <tbody>
            { getRows() }
          </tbody>
        </Table>
      </Container>
  );
}

export default GLHome;
