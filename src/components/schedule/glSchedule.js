import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Button,
  Modal,
  Form,
  Spinner
} from 'react-bootstrap';
import _ from 'lodash';
import moment from 'moment';
import { getSeasonSchedule } from '../../api/goldenLeopardsApi';

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
    <Container fluid style={{ padding: 0, zIndex: 100}}>
      <Container style={{overflowX: 'scroll', padding: 0}}>
        <div style={{color: 'rgb(100, 100, 100)', textAlign: 'center', padding: '0 0 0 3px', marginTop: '30px', marginBottom: '15px', fontWeight: 700 }}>
          <span>Spring 2022</span>
        </div>
        <GLScheduleList data={ seasonSchedule }></GLScheduleList>
      </Container>
    </Container>
  );
}

export default GLSchedule;