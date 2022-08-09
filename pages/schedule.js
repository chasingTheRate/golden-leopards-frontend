import React, { useState, useEffect, useRef } from "react";
import {
  Container,
} from 'react-bootstrap';
import Image from 'next/image';
import _ from 'lodash';
import moment from "moment";

import { getSeasonSchedule, getNextGames, getLeagues, updateGame } from '../src/api/goldenLeopardsApi';

import GLScheduleList from "../src/components/schedule/glScheduleList";
import GLNextGameContainer from '../src/components/next-game/glNextGameContainer';
import EditGameModal from '../src/components/modals/editGameModal';

export async function getServerSideProps() {

  const ssSchedules = await getSeasonSchedule();
  const leagues = await getLeagues();
  const nextGameData = await getNextGames();

  return { props: { ssSchedules, nextGameData, leagues } }
}

const GLSchedule = ({ ssSchedules = [], nextGameData = [] }) => {

  const [schedule, setSchedule] = useState(ssSchedules);
  const [showEditGameModal, setShowEditGameModal] = useState(false);
  const [selectedGame, setSelectedGame] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [modalBodyHeight, setModalBodyHeight] = useState(0);

  const modalRef = useRef(null)


  const handleShowEditGameModal = () => {
    setShowEditGameModal(true)
  }

  const handleCloseEditGameModal = () => {
    setShowEditGameModal(false);
  }

   const handleOnExit = () => {
    setIsLoading(false);
    setSelectedGame({});
   }

  const handleEditGame = (game) => {
    setSelectedGame(game);
    handleShowEditGameModal();
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
        logofilename,
        logoheight = 60,
        logowidth = 60,
        scheduleurl,
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
          <GLScheduleList data={ games } onEditGame={ handleEditGame }></GLScheduleList>
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
      ></EditGameModal>
    </Container>
  );
}

export default GLSchedule;
