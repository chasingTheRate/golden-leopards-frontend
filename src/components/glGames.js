import React, { useState, useEffect } from "react";

import {
  Container,
  Table
} from 'react-bootstrap';

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

  const getRows = () => {
    return games.map( (g, index) => {
      const date = new Date(g.gameDate);
      return (
        <tr key={index}>
          <td>{date.toLocaleDateString()}</td>
          <td>{g.opposingTeamName}</td>
          <td>{`${g.score} - ${g.opposingTeamScore}`}</td>
          <td>{ g.outcome }</td>
        </tr>
      )
    })
  }

  return (
      <Container fluid>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>Team</th>
              <th>Score</th>
              <th>W/L</th>
            </tr>
          </thead>
          <tbody>
            { getRows() }
          </tbody>
        </Table>
      </Container>
  );
}

export default GLGames;
