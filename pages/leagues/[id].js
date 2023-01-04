import React, { useState, useEffect, useRef } from "react";
import {
  Tabs,
  Tab,
} from 'react-bootstrap'

import { getLeagueSchedule } from '../../src/api/goldenLeopardsApi';
import GLSchedule from '../../src/components/schedule/glSchedule';
import GLLPageContainer from "../../src/components/multiuse/glPageContainer";
import GLPlayerGameStats from '../../src/components/leagues/glPlayerGameStats';

export async function getServerSideProps(context) {

  const id = context.params.id
  const ssLeagueSchedule = await getLeagueSchedule(id);
  
  return { props: { ssLeagueSchedule } }
}

const GLLeague = ({ ssLeagueSchedule = [] }) => {

  const { cumlativePlayerGameStats } = ssLeagueSchedule

  return (
    <GLLPageContainer>
      <Tabs
      defaultActiveKey="schedule"
      id="leageue-page-tabs"
      className="mb-3"
      justify
      variant='pills'
    >
      <Tab eventKey="schedule" title="Schedule/Results">
        <GLSchedule schedule={ ssLeagueSchedule }></GLSchedule>
      </Tab>
      <Tab eventKey="profile" title="Stats">
        <GLPlayerGameStats stats={ cumlativePlayerGameStats }></GLPlayerGameStats>
      </Tab>
    </Tabs>
      
    </GLLPageContainer>
    );
}

export default GLLeague;
