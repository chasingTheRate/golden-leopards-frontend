import React, { useState, useEffect } from "react";
import {
  Container,
} from 'react-bootstrap';

import { getSeasonSchedule } from '../src/api/goldenLeopardsApi';

import GLScheduleList from "../src/components/schedule/glScheduleList";

export async function getServerSideProps() {
  const data = await getSeasonSchedule();
  return { props: { data } }
}

const GLSchedule = ({ data }) => {
  return (
    <Container fluid className="gl-schedule-container">
        <div className="gl-schedule-title-container">
          <span>Spring 2022</span>
        </div>
        <GLScheduleList data={ data }></GLScheduleList>
    </Container>
  );
}

export default GLSchedule;
