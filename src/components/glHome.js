import React, { useState, useEffect } from "react";
import { useTable } from 'react-table'
import { getTournamentSchedule, getTeamRecord } from '../api/goldenLeopardsApi';
import {
  Container,
  Button,
  Badge
} from 'react-bootstrap';
import moment from 'moment';

import TournamentScheduleTable from '../components/tournamentScheduleTable';

const GLHome = () => {

  const [tournamentSchedule, setTournamentSchedule] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const tournamentSchedule = await getTournamentSchedule();
      setTournamentSchedule(tournamentSchedule);
    }
    fetchData();
  }, []);
 

  return (
      <Container fluid style={{ padding: 0 }}>
        <Container style={{overflowX: 'scroll', padding: 0}}>
          <div>Upcoming Tournaments</div>
          <TournamentScheduleTable data={ tournamentSchedule }></TournamentScheduleTable>
        </Container>
      </Container>
  );
}

export default GLHome;
