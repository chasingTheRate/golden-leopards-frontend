import React, { useState, useEffect } from "react";
import {
  Container,
} from 'react-bootstrap';
import Image from 'next/image';

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
      const {
        logoFileName,
        logoHeight = 60,
        logoWidth = 60,
        scheduleLink,
      } = league

      let leagueTitle = scheduleLink
        ? <div className="gl-schedule-link-title-container">
            <a href={ scheduleLink }>{ league.displayName }</a>
          </div>
        : <div className="gl-schedule-title-container">
                <span>{ league.displayName }</span>
          </div>

      let leagueLogo = league.logoFileName
      ? <div>
          <Image src={ `https://d33nclgf902cx6.cloudfront.net/assets/leagues/${ logoFileName }` } alt="leagueLogo" height={ logoHeight } width={ logoWidth }/>
        </div>
      : null

      leagues.push(
        <div key={`league_${count}`} className="gl-schedule-list-container">
          <Container style={{display: 'flex', flexDirection: 'column', alignItems: "center", justifyContent: 'center'}}>
            { leagueLogo }
            { leagueTitle }
          </Container>
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
