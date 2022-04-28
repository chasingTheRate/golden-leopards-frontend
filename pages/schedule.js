import React, { useState, useEffect } from "react";
import {
  Container,
} from 'react-bootstrap';

import { getSeasonSchedule, getNextGames } from '../src/api/goldenLeopardsApi';

import GLScheduleList from "../src/components/schedule/glScheduleList";
import GLNextGameContainer from '../src/components/next-game/glNextGameContainer';

export async function getServerSideProps() {
  const data = await getSeasonSchedule();
  const nextGameData = await getNextGames();
  return { props: { data, nextGameData } }
}

const GLSchedule = ({ data = [], nextGameData = [] }) => {
  return (
    <Container fluid className="gl-schedule-container">
      <GLNextGameContainer data={ nextGameData } ></GLNextGameContainer>
      <div className="gl-schedule-list-container">
        <div className="gl-schedule-title-container">
          <span>Spring 2022</span>
        </div>
        <GLScheduleList data={ data }></GLScheduleList>
      </div>
    </Container>
  );
}

export default GLSchedule;
