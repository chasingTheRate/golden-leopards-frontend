import React, { useState, useEffect } from "react";
import {
  Container,
} from 'react-bootstrap';

import { getSeasonSchedule, getNextGames, getLeagues } from '../src/api/goldenLeopardsApi';

import GLScheduleList from "../src/components/schedule/glScheduleList";
import GLNextGameContainer from '../src/components/next-game/glNextGameContainer';

export async function getServerSideProps() {
  const schedules = await getSeasonSchedule();
  const leagues = await getLeagues();
  const nextGameData = await getNextGames();

  return { props: { schedules, nextGameData, leagues } }
}

const GLSchedule = ({ schedules = [], leagues, nextGameData = [] }) => {

  const getLeague = (id) => leagues.find(l => l.id === id);

  const getLeagues = () => {

    const leagues = [];
    var count = 0;

    for (const [key, value] of Object.entries(schedules)) {

      count++;
      const league = getLeague(key);

      let leagueTitle = league.scheduleLink
        ? <div className="gl-schedule-link-title-container">
            <a href={ league.scheduleLink }>{ league.displayName }</a>
          </div>
        : <div className="gl-schedule-title-container">
                <span>{ league.displayName }</span>
          </div>

      leagues.push(
        <div key={`league_${count}`} className="gl-schedule-list-container">
          { leagueTitle }
          <GLScheduleList data={ value }></GLScheduleList>
        </div>
      )
    }

    return leagues;

  }

  return (
    <Container fluid className="gl-schedule-container">
      <GLNextGameContainer data={ nextGameData } ></GLNextGameContainer>
      { getLeagues() }
    </Container>
  );
}

export default GLSchedule;
