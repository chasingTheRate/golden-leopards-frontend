import React, { useState, useEffect, useRef } from "react";
import { getRoster, getTournamentSchedule, updateTournament} from '../api/goldenLeopardsApi';
import {
  Container,
  Button,
  Modal,
  Form,
  Spinner
} from 'react-bootstrap';
import _ from 'lodash';
import moment from 'moment';

import './glHome.css'
import logo from '../assets/images/goldenLeopards.png';
import TournamentScheduleTable from '../components/tournamentScheduleTable';

const GLHome = () => {

  return (
    <Container fluid style={{ padding: 0, zIndex: 100}}>
      
    </Container>
  );
}

export default GLHome;
