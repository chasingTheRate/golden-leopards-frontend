import React, { useState, useEffect } from "react";

import {
  Container,
  Table
} from 'react-bootstrap';

import { getSeasons } from '../api/goldenLeopardsApi';

const GLSeasons = () => {

  const [seasons, setSeasons] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const seasons = await getSeasons();
      setSeasons(seasons);
    }
    fetchData();
  }, []);

  const getRows = () => {
    return seasons.map( (s, index) =>
        <tr key={index}>
          <td>{s.year}</td>
          <td>{s.season}</td>
        </tr>
    )
  }

  return (
      <Container fluid>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Year</th>
              <th>Season</th>
            </tr>
          </thead>
          <tbody>
            { getRows() }
          </tbody>
        </Table>
      </Container>
  );
}

export default GLSeasons;
