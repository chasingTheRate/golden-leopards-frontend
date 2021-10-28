import React, { useState, useEffect } from "react";

import {
  Container,
  Table
} from 'react-bootstrap';

import { getPlayers } from '../api/goldenLeopardsApi';

const GLPlayers = () => {

  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const games = await getPlayers();
      setPlayers(games);
    }
    fetchData();
  }, []);

  const getRows = () => {
    return players.map( (p, index) => {
      return (
        <tr key={index}>
          <td>{p.number}</td>
          <td>{`${p.firstName}`}</td>
        </tr>
      )
    })
  }

  return (
      <Container fluid>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Number</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            { getRows() }
          </tbody>
        </Table>
      </Container>
  );
}

export default GLPlayers;
