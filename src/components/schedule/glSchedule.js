import React, { useState, useEffect, useRef } from "react";

import {
  Container
} from 'react-bootstrap';

import GLLeagueHeader from './GLLeagueHeader'; 
import GLScheduleList from './glScheduleList';

const GLSchedule = ({ schedule }) => {

  const {
    games,
    league
  } = schedule;

  return (
    <div styled={{ padding: '12px 0 0 0'}}>
      <GLLeagueHeader league={ league }></GLLeagueHeader>
      <Container style={{padding: '15px 12px 0px 12px'}}>
        <GLScheduleList
          data={ games }
          displayOnly={ true }
        ></GLScheduleList>
      </Container>
    </div>
  );
}

export default GLSchedule;
