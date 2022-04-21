import React, { useState, useEffect } from "react";
import {
  Container,
} from 'react-bootstrap';

import { getSeasonSchedule } from '../../src/api/goldenLeopardsApi';
import GLScheduleList from "./glScheduleList";
 
const GLSchedule = () => {

  const [seasonSchedule, setSeasonSchedule] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setSeasonSchedule(await getSeasonSchedule());
    }
    fetchData();
  }, []);

  return (
    <Container fluid className="gl-schedule-container">
        <div className="gl-schedule-title-container">
          <span>Spring 2022</span>
        </div>
        <GLScheduleList data={ seasonSchedule }></GLScheduleList>
    </Container>
  );
}

export default GLSchedule;
