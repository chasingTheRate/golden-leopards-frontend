import React, { useState, useEffect } from "react";
import { getRoster, getTournamentSchedule, updateTournament} from '../api/goldenLeopardsApi';
import {
  Container,
  Button,
  Modal,
  Form
} from 'react-bootstrap';
import _ from 'lodash';

import backgroundVideo from '../assets/videos/background.mp4';
import './glHome.css'
import TournamentScheduleTable from '../components/tournamentScheduleTable';

const GLHome = () => {

  const [tournamentSchedule, setTournamentSchedule] = useState([]);
  const [roster, setRoster] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedTournament, setSelectedTournament] = useState({});
 
  useEffect(() => {
    const fetchData = async () => {
      await getSchedule();
      const roster = await getRoster();
      setRoster(roster);
    }
    fetchData();
  }, []);
 
  const getSchedule = async () => {
    const tournamentSchedule = await getTournamentSchedule();
    setTournamentSchedule(tournamentSchedule);
  }

  const handleClose = () => {
    setSelectedTournament({});
    setShow(false)
  };

  const handleShow = () => setShow(true);

  const handleCheckboxChange = (e, player) => {
    const updatedTournament = Object.assign({}, selectedTournament);
    const existingPlayers = updatedTournament.players ? updatedTournament.players : [];

    if (existingPlayers.includes(player.id)) {
      updatedTournament.players = existingPlayers.filter(e => e !== player.id);
    } else {
      updatedTournament.players = [ ...existingPlayers, player.id];
    }
    
    setSelectedTournament(updatedTournament);
  }

  const addPlayerToTournament = (tournament) => {
    setSelectedTournament(tournament);
    handleShow();
  }

  const handleAddPlayerOk = async (e) => {

    const previousTournament = tournamentSchedule.find(t => t.id === selectedTournament.id);

    if (_.isEqual(previousTournament.players, selectedTournament.players)) {
      console.log('test');
      handleClose();
      return;
    }

    try {
      await updateTournament(selectedTournament.id, selectedTournament);
      await getSchedule();
      handleClose();
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className='home-container'>
      <div className="video-container">
       <video autoPlay loop muted id='video'>
          <source src={ backgroundVideo } type='video/mp4'></source>
        </video>
        <div class="caption">
          <h2>Golden Leopards</h2>
        </div>
      </div>
      <Container fluid style={{ padding: 0, zIndex: 100}}>
        
        <Container style={{overflowX: 'scroll', padding: 0}}>
          <div style={{textAlign: 'center', padding: '0 0 0 3px', marginTop: '20px' }}>
            <h6>Upcoming Tournaments</h6>
          </div>
          <TournamentScheduleTable 
            data={ tournamentSchedule }
            addPlayerToTournament= { addPlayerToTournament }
          ></TournamentScheduleTable>
        </Container>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Select Player(s)</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <div key={`default-checkbox`}>
                {roster.map(r => (
                  <Form.Check
                    key={`roster-checkbox-${r.id}`} 
                    type={'checkbox'}
                    id={`default-checkbox-${r.id}`}
                    label={ r.displayName }
                    inline
                    checked={ selectedTournament.players ? selectedTournament.players.includes(r.id) : false }
                    onChange={ (e) => handleCheckboxChange(e, r) }
                  />
                ))}
              </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={ handleAddPlayerOk }>OK</Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}

export default GLHome;
