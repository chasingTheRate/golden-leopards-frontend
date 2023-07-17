import React, { useState, useEffect, useRef } from "react";
import {
  Container,
} from 'react-bootstrap';

import {
  getFriendlies,
  getRoster,
  updateGamePlayers
} from '../src/api/goldenLeopardsApi';

import GLLPageContainer from "../src/components/multiuse/glPageContainer";
import GLLListContainer from "../src/components/multiuse/glListContainer";
import GLTable from "../src/components/multiuse/glTable";
import FriendlyListItem from "../src/components/friendlies/friendlyListItem";
import AddRemovePlayerModal from "../src/components/modals/addRemovePlayerModal";

export async function getServerSideProps() {
  const ssFriendlies = await getFriendlies();
  const ssRoster = await getRoster();
  //  ss = Server Side
  return { props: { ssFriendlies, ssRoster } }
}

const GLFriendlies = ({
  ssFriendlies = [],
  ssRoster = [] 
}) => {
  
  const [friendlies, setFriendlies] = useState(ssFriendlies);
  const [roster, setRoster] = useState(ssRoster);
  const [show, setShow] = useState(false);
  const [selectedFriendly, setSelectedFriendly] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [modalBodyHeight, setModalBodyHeight] = useState(0);
  
  let ref = useRef();


  const refreshFriendlies = async () => {
    const friendlies = await getFriendlies();
    setFriendlies(friendlies);
  }

  const handleAddPlayer = async(e, record) => {
    e.stopPropagation();
    setSelectedFriendly(record);
    setShow(true)
  }

  const handleAddPlayerSubmit = async(e, record) => {
  
    const previousFriendly = friendlies.find(t => t.id === selectedFriendly.id);

    if (_.isEqual(previousFriendly.player_ids, selectedFriendly.player_ids)) {
      handleClose();
      return;
    }

    try {
      setIsLoading(true);
      await updateGamePlayers(selectedFriendly.id, selectedFriendly);
      await refreshFriendlies();
    } catch (e) {
      console.error(e);
    }
    handleClose();
  }

  const handleCheckboxChange = (e, player) => {
    const updatedFriendly = Object.assign({}, selectedFriendly);
    const existingPlayers = updatedFriendly.player_ids ? updatedFriendly.player_ids : [];

    if (existingPlayers.includes(player.id)) {
      updatedFriendly.player_ids = existingPlayers.filter(e => e !== player.id);
    } else {
      updatedFriendly.player_ids = [ ...existingPlayers, player.id];
    }
    
    setSelectedFriendly(updatedFriendly);
  }

  const handleOnShow = () => {
      const div = Object.assign( {}, ref);
      setModalBodyHeight(div.current.clientHeight);
  }

  const handleClose = () => {
    setShow(false);
    setIsLoading(false);
  }

  const handleOnExit = () => {
    setIsLoading(false);
    setSelectedFriendly({});
  }

  return (
    <GLLPageContainer>
      <GLLListContainer>
        <div className='tournament-title-container'>
          <span style={{fontSize: 'medium'}}>Upcoming Friendlies</span>
        </div>
        <GLTable 
          data={ friendlies }
          GenericListItem={ FriendlyListItem }
          handleAddPlayer={ handleAddPlayer }
        ></GLTable>
      </GLLListContainer>
      <AddRemovePlayerModal
        game={ selectedFriendly }
        modalRef={ref}
        onShow={ handleOnShow }
        show={show}
        onHide={ handleClose }
        onSubmit={ handleAddPlayerSubmit }
        onExit = { handleOnExit }
        isLoading = { isLoading }
        roster={ roster }
        handleAddRemovePlayer={ handleCheckboxChange }
        modalBodyHeight={modalBodyHeight}
      ></AddRemovePlayerModal>
    </GLLPageContainer>
  );
}

export default GLFriendlies;