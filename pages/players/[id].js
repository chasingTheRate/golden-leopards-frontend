import React, { useState, useEffect, useRef } from "react";
import {
  Tabs,
  Tab,
  Container,
  Breadcrumb,
} from 'react-bootstrap'
import styled from 'styled-components';
import moment from "moment";
import Image from 'next/image';
import { useRouter } from 'next/router'

import { 
  getPlayerStatsByPlayerId,
} from '../../src/api/goldenLeopardsApi';

import GLSchedule from '../../src/components/schedule/glSchedule';
import GLLPageContainer from "../../src/components/multiuse/glPageContainer";
import GLPlayerGameStats from '../../src/components/leagues/glPlayerGameStats';

import GLPlayerGameStatsTable from "../../src/components/player/glPlayerGameStatsTable";

export async function getServerSideProps(context) {

  const id = context.params.id;
  const { year: ssYear = 'undefined', leagueId: ssLeagueId = 'undefined' } = context.query;

  const ssPlayerGameStats = await getPlayerStatsByPlayerId({id, year: ssYear, leagueId: ssLeagueId});
  
  let ssScale = 'years';

  if (ssLeagueId && ssLeagueId !== 'undefined') {
    ssScale = 'league'
  }

  if (ssYear && ssYear !== 'undefined') {
    ssScale = 'year'
  }

  return { props: { ssPlayerGameStats, id, ssYear, ssLeagueId, ssScale } }
}

const getScoreColor = (ourScore, opponentScore) => {

  const result = ourScore - opponentScore;
  
  if(result > 0) {
    return 'limegreen';
  } else if (result < 0) {
    return 'salmon';
  } else {
    return 'black'
  }
}

const yearColumn = {
  Header: 'Year',
  accessor: 'year',
  Cell: row => <div style={{
    textAlign: "center",
    maxWidth: 70,
    minWidth: 70,
    width: 70,
    padding: '8px',
    fontSize: '20px',
    color: '#15469d',
  }}>{row.value}</div>
}

const gamesColumn = {
  Header: 'Games',
  accessor: 'games',
  Cell: row => <div style={{
    textAlign: "center",
    maxWidth: 50,
    minWidth: 50,
    width: 50,
    fontSize: '16px',
  }}>{row.value}</div>
}

const goalsColumn = {
  Header: 'Goals',
  accessor: 'goals',
  Cell: row => <div style={{
    textAlign: "center",
    maxWidth: 50,
    minWidth: 50,
    width: 50,
    fontSize: '16px',
  }}>{row.value}</div>
}

const assistsColumn = {
  Header: 'Assists',
  accessor: 'assists',
  Cell: row => <div style={{
    textAlign: "center",
    maxWidth: 50,
    minWidth: 50,
    width: 50,
    fontSize: '16px',
  }}>{row.value}</div>
}

const savesColumn = {
  Header: 'Saves',
  accessor: 'saves',
  Cell: row => <div style={{
    textAlign: "center",
    maxWidth: 50,
    minWidth: 50,
    width: 50,
    fontSize: '16px',
  }}>{row.value}</div>
}

const leagueColumn = {
  Header: 'League',
  accessor: 'displayname',
  Cell: row => <div style={{
    textAlign: "center",
    maxWidth: 300,
    minWidth: 200,
    width: 200,
    fontSize: '16px',
    color: '#15469d',
    whiteSpace: 'unset',
    lineHeight: 'normal',
  }}>{row.value}</div>
}

const tacklesColumn = {
  Header: 'Tackles',
  accessor: 'tackles',
  Cell: row => <div style={{
    textAlign: "center",
    maxWidth: 50,
    minWidth: 50,
    width: 50,
    fontSize: '16px',
  }}>{row.value}</div>
}

const opponentColumn = {
  Header: 'Opponent',
  accessor: 'opponent',
  Cell: row => <div style={{
    textAlign: "left",
    maxWidth: 300,
    minWidth: 150,
    width: 150,
    paddingLeft: '5px',
    whiteSpace: 'unset',
    lineHeight: 'normal',
  }}>{ row.value }</div>
}

const scoreColumn = {
  Header: 'Score',
  Cell: (c) => <div style={{
    textAlign: "center",
    maxWidth: 70,
    minWidth: 50,
    width: 50,
    paddingLeft: '5px',
    color: getScoreColor(c.row.original.ourscore, c.row.original.opponentscore)
  }}>{`${c.row.original.ourscore} - ${c.row.original.opponentscore}`}</div>
}

const dateColumn = {
  accessor: 'start',
  Cell: (c) => <div style={{
    textAlign: "center",
    maxWidth: 70,
    minWidth: 70,
    width: 70,
    paddingLeft: '5px'
  }}>{moment.utc(c.value).local().format('M/D/YY')}</div>
}

const columnOptions = {
  years: [
    yearColumn,
    gamesColumn,
    goalsColumn,
    assistsColumn,
    savesColumn,
    tacklesColumn
  ],
  year: [
    leagueColumn,
    gamesColumn,
    goalsColumn,
    assistsColumn,
    savesColumn,
    tacklesColumn
  ],
  league: [
    dateColumn,
    scoreColumn,
    opponentColumn,
    goalsColumn,
    assistsColumn,
    savesColumn,
    tacklesColumn
  ],

}

const scaleProgression = {
  years: 'year',
  year: 'league',
  league: 'game',
}

const GLPlayer = ({ ssPlayerGameStats = [], id, ssYear, ssLeagueId, ssScale }) => {

  console.log(ssPlayerGameStats);
  console.log(ssScale);

  const router = useRouter()
  
  const [playerGameStats, setPlayerGameStats] = useState(ssPlayerGameStats);
  const [scale, setScale] = useState(ssScale);
  const [year, setYear] = useState(ssYear);
  const [leagueId, setLeagueId] = useState(ssLeagueId);
  const [columns, setColumns] = useState(columnOptions[ssScale])

  const onRowClick = async (r) => {
    
    console.log(r);

    const { year, id: leagueId } = r;

    console.log(year);
    console.log(leagueId);

    if (scale==='games') {
      return;
    }

    console.log(`/players/${id}?year=${year}?leagueId=${leagueId}`);
    router.push(`/players/${id}?year=${year}&leagueId=${leagueId}`, undefined, { shallow: true });


    const updatedStats = await getPlayerStatsByPlayerId({id, year, leagueId});
    const nextScale = scaleProgression[scale];

    console.log(updatedStats);
    console.log(nextScale);

    setPlayerGameStats(updatedStats);
    setColumns(columnOptions[nextScale]);
    setScale(nextScale);

    if (year) {
      setYear(year);
    }
  }

  return (
    <Container style={{backgroundColor: 'white', padding: 0}}>
      <div style={{
        padding: '25px 12px 0px 12px',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center'
      }}>
        <div style={{display: 'flex'}}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'start',
            flexDirection: 'column',
            fontSize: '50px',
            padding: '0 8px 0 10px',
            color: '#15469d',
          }}>
            <div><span style={{fontWeight: 600}}>7</span></div>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'start',
            flexDirection: 'column',
            fontSize: '25px',
            padding: '0 0 0 10px',
            color: '#15469d',
          }}>
            <div><span style={{fontWeight: 300}}>Jackie</span></div>
            <div><span style={{fontWeight: 600}}>Eaton</span></div>
          </div>
        </div>
        <div style={{
          height: 150,
          flexGrow: 1,
          alignContent: 'end',
          justifyContent: 'end',
          display: 'flex'
          }}>
          <Image 
            src={ `https://d33nclgf902cx6.cloudfront.net/assets/players/profile_jackie.png` } 
            alt="playerProfile" 
            height={ 150 } 
            width= { 130 }
          />
        </div>
      </div>
      <div style={{
        backgroundColor: 'rgba(251, 214, 4, 1)',
        height: '20px',
        width: '100%',
        borderStyle: 'solid',
        borderWidth: '3px 0px',
        borderColor: '#15469d',
      }}></div>
      <div style={{
        height: '50px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#15469d'
      }}>
      </div>
      <div style={{overflowX: 'scroll'}}>
        <GLPlayerGameStatsTable
          data={playerGameStats}
          columns={ columns }
          onRowClick= { onRowClick }
        ></GLPlayerGameStatsTable>
      </div>
    </Container>
    );
}

export default GLPlayer;
