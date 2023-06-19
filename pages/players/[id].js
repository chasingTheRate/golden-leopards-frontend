import React, { useState, useEffect, useRef } from "react";
import {
  Tabs,
  Tab,
  Container,
  Breadcrumb,
  Button,
} from 'react-bootstrap'
import styled from 'styled-components';
import moment from "moment";
import Image from 'next/image';
import { useRouter } from 'next/router'

import { 
  getPlayerStatsByPlayerId,
  getPlayerById,
} from '../../src/api/goldenLeopardsApi';

import GLSchedule from '../../src/components/schedule/glSchedule';
import GLLPageContainer from "../../src/components/multiuse/glPageContainer";
import GLPlayerGameStats from '../../src/components/leagues/glPlayerGameStats';

import GLPlayerGameStatsTable from "../../src/components/player/glPlayerGameStatsTable";

export async function getServerSideProps(context) {

  const id = context.params.id;
  const {
    year: ssYear = 'undefined',
    leagueId: ssLeagueId = 'undefined',
    leagueName = 'undefined'
  } = context.query;
  
  const ssPlayerGameStats = await getPlayerStatsByPlayerId({id, year: ssYear, leagueId: ssLeagueId});
  let playerDataResult = await getPlayerById(id);
  
  let ssScale = 'years';
  let ssTableTitle = 'YEARLY'

  if (ssLeagueId && ssLeagueId !== 'undefined') {
    ssScale = 'league';
    ssTableTitle = leagueName;

  } else if (ssYear && ssYear !== 'undefined') {
    ssScale = 'year';
    ssTableTitle = ssYear;
  }

  return { props: { ssPlayerData: playerDataResult[0], ssPlayerGameStats, id, ssYear, ssLeagueId, ssScale, ssTableTitle } }
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
    fontSize: '14px',
    color: '#15469d',
    fontWeight: 400,
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
    fontSize: '14px',
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
    fontSize: '14px',
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
    fontSize: '14px',
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
    fontSize: '14px',
  }}>{row.value}</div>
}

const leagueColumn = {
  Header: 'League',
  accessor: 'displayname',
  Cell: row => <div style={{
    textAlign: "left",
    maxWidth: 300,
    minWidth: 150,
    width: 150,
    fontSize: '14px',
    color: '#15469d',
    whiteSpace: 'unset',
    lineHeight: 'normal',
    padding: '0 0 0 12px',
    fontWeight: 400,
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
    fontSize: '14px',
  }}>{row.value}</div>
}

const opponentColumn = {
  Header: 'Opponent',
  accessor: 'opponent',
  Cell: c => <div style={{
    textAlign: "left",
    maxWidth: 150,
    minWidth: 100,
    width: 100,
    paddingLeft: '5px',
    whiteSpace: 'unset',
    lineHeight: 'normal',
    fontSize: '14px',
    color: '#15469d'
  }}>
      { c.row.original.recordgame ?
          <a
            href={ c.row.original.veolink } 
            target="_blank"
            style={{color: '#15469d'}}
          >{ c.row.original.opponent }</a> :
          <span>{ c.row.original.opponent }</span>
      }
  </div>
}

const scoreColumn = {
  Header: 'Score',
  Cell: (c) => <div style={{
    textAlign: "center",
    maxWidth: 70,
    minWidth: 50,
    width: 50,
    paddingLeft: '5px',
    fontSize: '14px',
    color: getScoreColor(c.row.original.ourscore, c.row.original.opponentscore)
  }}>{`${c.row.original.ourscore} - ${c.row.original.opponentscore}`}</div>
}

const dateColumn = {
  accessor: 'start',
  Cell: (c) => <div style={{
    textAlign: "center",
    maxWidth: 50,
    minWidth: 50,
    width: 50,
    paddingLeft: '5px',
    fontSize: '12px',
    color: 'rgb(125,125,125)'
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
}

const scaleRegression = {
  year: 'years',
  league: 'year',
}

const getTableTitle = (scale, year, localLeagueName) => {
  return {
    years: 'YEARLY',
    year: year,
    league: localLeagueName
  }[scale]
}

const GLPlayer = ({ ssPlayerData, ssPlayerGameStats = [], id, ssYear, ssLeagueId, ssScale, ssTableTitle }) => {

  const router = useRouter()
  
  const [playerGameStats, setPlayerGameStats] = useState(ssPlayerGameStats);
  const [scale, setScale] = useState(ssScale);
  const [year, setYear] = useState(ssYear);
  const [leagueId, setLeagueId] = useState(ssLeagueId);
  const [columns, setColumns] = useState(columnOptions[ssScale])
  const [tableTitle, setTableTitle] = useState(ssTableTitle)


  const onRowClick = async (r) => {
    
    const { year: rowYear, id: rowId, displayname: rowDisplayName } = r;

    const localYear = rowYear || year;
    const localLeagueId = rowId || leagueId;
    const localLeagueName = rowDisplayName

    if (scale==='league') {
      return;
    } 

    router.push(
      `/players/${id}?year=${localYear}&leagueId=${localLeagueId}&leagueName=${localLeagueName}`, 
      undefined, 
      { shallow: true }
    );

    const updatedStats = await getPlayerStatsByPlayerId({id, year: localYear, leagueId: localLeagueId});
    const nextScale = scaleProgression[scale];


    setPlayerGameStats(updatedStats);
    setColumns(columnOptions[nextScale]);
    setScale(nextScale);
    setYear(localYear);
    setLeagueId(localLeagueId);
    setTableTitle(getTableTitle(nextScale, localYear, localLeagueName));
  }

  const handleGoBack = async () => {

    if (scale==='years') {
      return;
    }

    const nextScale = scaleRegression[scale];

    let localYear = year;
    let localLeagueId = leagueId;

    if (nextScale === 'years') {
      localYear = 'undefined';
      localLeagueId = 'undefined';
    } else if (nextScale === 'year') {
      localLeagueId = 'undefined';
    }

    router.push(`/players/${id}?year=${localYear}&leagueId=${localLeagueId}`, undefined, { shallow: true });

    const updatedStats = await getPlayerStatsByPlayerId({id, year: localYear, leagueId: localLeagueId});

    setScale(nextScale);
    setYear(localYear);
    setLeagueId(localLeagueId);
    setPlayerGameStats(updatedStats);
    setColumns(columnOptions[nextScale]);
    setTableTitle(getTableTitle(nextScale, localYear));
  }

  return (
    <Container style={{backgroundColor: 'white', padding: 0, height: '100%'}}>
      <div style={{
        padding: '10px 12px 0px 12px',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
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
            <div><span style={{fontWeight: 600}}>{ssPlayerData.jerseynumber}</span></div>
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
            <div><span style={{fontWeight: 500}}>{ssPlayerData.firstname}</span></div>
            <div><span style={{fontWeight: 700}}>{ssPlayerData.lastname}</span></div>
          </div>
        </div>
        <div style={{
          height: 120,
          flexGrow: 1,
          alignContent: 'end',
          justifyContent: 'end',
          display: 'flex'
          }}>
          { ssPlayerData.profile_image_filename ?
            <Image 
              src={ `https://d33nclgf902cx6.cloudfront.net/assets/players/profile_jackie.png` } 
              alt="playerProfile" 
              height={ 120 } 
              width= { 100 }
            /> :
            <div style={{
              display: 'flex',
              fontSize: '80px',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'rgb(200, 200, 200)'
            }}>
              <i className="bi bi-person-circle"></i>
            </div>
          }
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
        padding: '0 0 0 8px',
        justifyContent: 'start',
        alignItems: 'center',
        backgroundColor: '#15469d'
      }}>
        <div style={{flexGrow: 2, flexBasis: 0}}>
          <Button style={{color: '#15469d', backgroundColor: 'white'}}disabled={ scale === 'years' } onClick={ handleGoBack }>
            <i className="bi bi-arrow-left-circle-fill"></i>
          </Button>
        </div>
        <div style={{flexGrow: 1, textAlign: 'center'}}>
          <span style={{color: 'white', fontWeight: 800, fontSize: '14px'}}>{tableTitle}</span>
        </div>
        <div style={{flexGrow: 2, flexBasis: 0}}></div>
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
