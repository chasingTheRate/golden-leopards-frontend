import React, { useState, useEffect, useRef } from "react";
import {
  Tabs,
  Tab,
} from 'react-bootstrap'
import styled from 'styled-components';

import { getLeagueSchedule } from '../../src/api/goldenLeopardsApi';
import GLSchedule from '../../src/components/schedule/glSchedule';
import GLLPageContainer from "../../src/components/multiuse/glPageContainer";
import GLPlayerGameStats from '../../src/components/leagues/glPlayerGameStats';

export async function getServerSideProps(context) {

  const id = context.params.id
  const ssLeagueSchedule = await getLeagueSchedule(id);
  
  return { props: { ssLeagueSchedule } }
}

const GLTabsWrap = styled.div`
  font-size: small;
  
  ul {
    padding: 0 12px 0 12px
  }
  .nav-pills .nav-link.active {
    background-color: #15469d;
    color: white;
    font-weight: 600;
  }

  .nav-pills .nav-link {
    color: #15469d;
    font-weight: 600;
  }
`

const GLLeague = ({ ssLeagueSchedule = [] }) => {

  const { cumlativePlayerGameStats = [] } = ssLeagueSchedule

  return (
    <GLLPageContainer>
      <GLTabsWrap>
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
        { cumlativePlayerGameStats.length > 0 &&
          <Tab eventKey="profile" title="Stats">
            <GLPlayerGameStats stats={ cumlativePlayerGameStats }></GLPlayerGameStats>
          </Tab>
        }
      </Tabs>
      </GLTabsWrap>
    </GLLPageContainer>
    );
}

export default GLLeague;
