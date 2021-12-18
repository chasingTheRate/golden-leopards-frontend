import React, { useState, useEffect } from "react";

import {
  Container,
  Table
} from 'react-bootstrap';

import { getPlayersStats, getTeamRecord } from '../api/goldenLeopardsApi';

const GLHome = () => {

  const [playersStats, setPlayersStats] = useState([]);
  const [teamRecord, setTeamRecord] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      const playersStats = await getPlayersStats();
      const teamRecord = await getTeamRecord();
      setPlayersStats(playersStats);
      setTeamRecord(teamRecord);
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
        <Container style = {{padding: '10px'}}>
          { teamRecord &&
            <h1 style={{color: '#0d6efd'}}
              >{`${teamRecord.wins}-${teamRecord.losses}-${teamRecord.ties}`}
            </h1>
          }
        </Container>
        <Container style={{overflowX: 'scroll'}}>
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
      </Container>
  );
}

export default GLHome;
