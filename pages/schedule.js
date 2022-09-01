import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Button,
} from 'react-bootstrap';
import Image from 'next/image';
import _ from 'lodash';

import {
  getSeasonSchedule,
  getNextGames,
  getLeagues,
  getLogos,
  getRoster,
  updateGame,
  createGame,
  updatePlayerGameStats, 
} from '../src/api/goldenLeopardsApi';

import GLScheduleList from "../src/components/schedule/glScheduleList";
import GLNextGameContainer from '../src/components/next-game/glNextGameContainer';
import EditGameModal from '../src/components/modals/editGameModal';
import CreateGameModal from '../src/components/modals/createGameModal';
import EditPlayerGameStatsModal from "../src/components/modals/editPlayerGameStatsModal";

import { defaultGame } from "../src/components/schedule/gameProperties";

export async function getServerSideProps() {

  const ssSchedules = await getSeasonSchedule();
  const leagues = await getLeagues();
  const nextGameData = await getNextGames();
  const logos = await getLogos();
  const roster = await getRoster();

  return { props: { ssSchedules, nextGameData, leagues, logos, roster } }
}

const GLSchedule = ({
  ssSchedules = [],
  nextGameData = [],
  leagues = [],
  logos = [],
  roster = [] 
}) => {

  const [schedule, setSchedule] = useState(ssSchedules);
  const [showEditGameModal, setShowEditGameModal] = useState(false);
  const [showCreateGameModal, setShowCreateGameModal] = useState(false);
  const [showEditPlayerGameStatsModal, setShowEditPlayerGameStatsModal] = useState(false);
  const [selectedGame, setSelectedGame] = useState({});
  const [selectedPlayerGameStats, setSelectedPlayerGameStats] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const modalRef = useRef(null)

  const handleShowEditGameModal = () => {
    setShowEditGameModal(true);
  }

  const handleShowEditPlayerGameStatsModal = () => {
    setShowEditPlayerGameStatsModal(true);
  }

  const handleShowCreateGameModal = () => {
    setShowCreateGameModal(true);
  }

  const handleCloseEditGameModal = () => {
    setShowEditGameModal(false);
    setShowCreateGameModal(false);
  }

  const handleCloseCreateGameModal = () => {
    setShowCreateGameModal(false);
  }

  const handleCloseEditPlayerGameStatsModal = () => {
    setShowEditPlayerGameStatsModal(false);
  }

   const handleOnExit = () => {
    setIsLoading(false);
    setSelectedGame({});
    setSelectedPlayerGameStats([]);
   }

  const handleEditGame = (game) => {
    setSelectedGame(game);
    handleShowEditGameModal();
  }

  const handleEditPlayerGameStats = (game) => {
    const { playerStats } = game;
    let gamePlayerStats = Object.assign([], roster);
    gamePlayerStats = gamePlayerStats.map(gps => {
      const stats = playerStats.find(p => p.player_id === gps.id)
    
      if (stats) {
        gps = {...gps, ...stats}
        gps.played = true;
      } else {
        gps.played = false;
      }
      return gps;
    })

    gamePlayerStats.sort((x, y) => { return (x.played === y.played) ? 0 : x.played ? -1 : 1;});
    
    setSelectedPlayerGameStats(gamePlayerStats);
    setSelectedGame(game);
    handleShowEditPlayerGameStatsModal();
  }

  const handleCreateGame = (leagueid) => {
    handleShowCreateGameModal(true);
  }

  const handleOnSubmit = async (game) => {
    try {
      setIsLoading(true);
      await updateGame(game);
      await refreshSchedule();
    } catch (e) {
      console.error(e);
    }
    handleCloseEditGameModal();
  }

  const handleUpdatePlayerGameStats = async (playerGameStats) => {
    //  Filter out players who didn't play
    playerGameStats = playerGameStats.filter(pgs => pgs.played === true);
    await updatePlayerGameStats(selectedGame.id, playerGameStats);
    await refreshSchedule();
    handleCloseEditPlayerGameStatsModal();
  }

  const handleOnCreateGameSubmit = async (game) => {
    try {
      setIsLoading(true);
      await createGame(game);
      await refreshSchedule();
    } catch (e) {
      console.error(e);
    }
    handleCloseEditGameModal();
  }

  const refreshSchedule = async () => {
    const schedule = await getSeasonSchedule();
    setSchedule(schedule)
  }

  const getLeagues = () => {

    const leagues = [];
    var count = 0;

    for (const [key, value] of Object.entries(schedule)) {

      count++;
      const { league, games } = value;
      const {
        logofilename = '',
        logoheight = 60,
        logowidth = 60,
        scheduleurl = '',
      } = league

      let leagueTitle = scheduleurl
        ? <div className="gl-schedule-link-title-container">
            <a href={ scheduleurl }>{ league.displayname }</a>
          </div>
        : <div className="gl-schedule-title-container">
                <span>{ league.displayname }</span>
          </div>

      let leagueLogo = league.logofilename
      ? <div>
          <Image src={ `https://d33nclgf902cx6.cloudfront.net/assets/leagues/${ logofilename }` } alt="leagueLogo" height={ logoheight } width={ logowidth }/>
        </div>
      : null

      leagues.push(
        <div key={`league_${count}`} className="gl-schedule-list-container">
          <Container style={{display: 'flex', flexDirection: 'column', alignItems: "center", justifyContent: 'center'}}>
            { leagueLogo }
            { leagueTitle }
          </Container>
          <GLScheduleList
            data={ games }
            onEditGame={ handleEditGame }
            onEditPlayerGameStats={ handleEditPlayerGameStats }
          ></GLScheduleList>
          <div className="league-action-bar-container">
            <Button
              variant="outline-primary"
              size="sm"
              onClick={ (e) => handleCreateGame(league.id) }
            >
              <i className="bi bi-plus-lg"></i>
            </Button>
          </div>
        </div>
      )
    }

    return leagues;

  }

  return (
    <Container fluid className="gl-schedule-container">
      { _.size(nextGameData) > 0 && 
        <GLNextGameContainer data={ nextGameData } ></GLNextGameContainer>
      }
      { getLeagues() }
      <EditGameModal
        modalRef= { modalRef }
        show={ showEditGameModal }
        onHide={ handleCloseEditGameModal }
        onExit={ handleOnExit }
        backdrop="static"
        keyboard={false}
        centered
        selectedGame={ selectedGame }
        onSubmit={ handleOnSubmit }
        isLoading={ isLoading }
        leagues={ leagues }
        logos={ logos }
      ></EditGameModal>
      <CreateGameModal
        modalRef= { modalRef }
        show={ showCreateGameModal }
        onHide={ handleCloseCreateGameModal }
        onExit={ handleOnExit }
        backdrop="static"
        keyboard={false}
        centered
        selectedGame={ defaultGame }
        onSubmit={ handleOnCreateGameSubmit }
        isLoading={ isLoading }
        leagues={ leagues }
        logos={ logos }
      ></CreateGameModal>
      <EditPlayerGameStatsModal
        modalRef= { modalRef }
        show={ showEditPlayerGameStatsModal }
        onHide={ handleCloseEditPlayerGameStatsModal }
        onExit={ handleOnExit }
        isLoading={ isLoading }
        roster={ selectedPlayerGameStats }
        onSubmit= { handleUpdatePlayerGameStats }
      ></EditPlayerGameStatsModal>
    </Container>
  );
}

export default GLSchedule;
