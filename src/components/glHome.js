import React, { useState, useEffect, useRef } from "react";
import { getRoster, getTournamentSchedule, updateTournament} from '../api/goldenLeopardsApi';
import {
  Container,
  Button,
  Modal,
  Form,
  Spinner
} from 'react-bootstrap';
import _ from 'lodash';
import moment from 'moment';

import './glHome.css'
import TournamentScheduleTable from '../components/tournamentScheduleTable';

const GLHome = () => {

  const [tournamentSchedule, setTournamentSchedule] = useState([]);
  const [filteredTournamentSchedule, setFilteredTournamentSchedule] = useState([]);
  const [roster, setRoster] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedTournament, setSelectedTournament] = useState({});
  const [selectedMonth, setSelectedMonth] = useState();
  const [selectedLocation, setSelectedLocation] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [modalBodyHeight, setModalBodyHeight] = useState(0);

  const ref = useRef(null)



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
    setFilteredTournamentSchedule(tournamentSchedule);
  }

  const handleClose = () => {
    setSelectedTournament({});
    setShow(false)
  };

  const handleShow = () => {
    setShow(true);
  }

  const handleOnShow = () => {
    const div = Object.assign( {}, ref);
    setModalBodyHeight(div.current.clientHeight);
  }

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
      handleClose();
      return;
    }

    try {
      setIsLoading(true);
      await updateTournament(selectedTournament.id, selectedTournament);
      await getSchedule();
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
    handleClose();
  }

  const handleMonthChange = (e) => {
    e.preventDefault();
    setSelectedMonth(e.target.value);
    filterTournamentSchedule(null, e.target.value);
  }

  const handleLocationChange = (e) => {
    e.preventDefault();
    setSelectedLocation(e.target.value);
    filterTournamentSchedule(e.target.value, null);
  }

  const isValidLocation = ({ isLocal = false, isOutOfState = false }, location) => {
  
    let isValid = false;

    switch (location) {
      case undefined:
      case null:
      case 'Location':
      case 'all':
        return true;
      case 'local':
        isValid = isLocal;
        break;
      case 'inState':
        isValid = !isOutOfState
        break;
      case 'outOfState':
        isValid = isOutOfState;
        break;
      default:
        return true;
    }

    return isValid;
  }

  const isValidMonth = ({ ['Start Date']: startDate }, month) => {

    if (!month || month === 'Month' || month === 'all') {
      return true;
    }

    return month ? moment(startDate, 'YYYY-MM-DD').format('MMM').toString() === month : true;
  };

  const filterTournamentSchedule = (location, month) => {
    const defaultLocation = location ? location : selectedLocation;
    const defaultMonth = month ? month : selectedMonth;

    let filtered = tournamentSchedule.filter(t => isValidLocation(t, defaultLocation));
    filtered = filtered.filter(t => isValidMonth(t, defaultMonth));
    setFilteredTournamentSchedule(filtered);
  }

  return (
    <Container fluid style={{ padding: 0, zIndex: 100}}>
      <Container style={{overflowX: 'scroll', padding: 0}}>
        <div style={{color: 'rgb(100, 100, 100)', textAlign: 'center', padding: '0 0 0 3px', marginTop: '30px', marginBottom: '15px', fontWeight: 700 }}>
          <span>Upcoming Tournaments</span>
        </div>
        <div style={{ margin: '15px 0 15px 0', textAlign: 'left' }}>
          <span style={{
                  fontSize: '0.7em',
                  color: 'rgb(100 100 100)',
                  fontWeight: 600
                }}
                >&nbsp; FILTER &nbsp;</span>
          <div style={{display: 'flex' }}>
            <div style={{margin: '0 8px 0 0', flexGrow: 1}}>
              <Form.Select className='gl-select' aria-label="Tournament Month" onChange={ handleMonthChange } value={ selectedMonth }>
                <option>Month</option>
                <option value="Jan">January</option>
                <option value="Feb">February</option>
                <option value="Mar">March</option>
                <option value="Apr">April</option>
                <option value="May">May</option>
                <option value="Jun">June</option>
                <option value="Jul">July</option>
                <option value="Aug">August</option>
                <option value="Sep">September</option>
                <option value="Oct">October</option>
                <option value="Nov">November</option>
                <option value="Dec">December</option>
                <option value="all">All</option>
              </Form.Select>
            </div>
          
            <div style={{flexGrow: 1}}>
              <Form.Select className='gl-select' aria-label="Tournament Location" onChange={ handleLocationChange } value={ selectedLocation }>
                <option>Location</option>
                <option value="local">Local Only</option>
                <option value="inState">Texas Only</option>
                <option value="outOfState">Out of State</option>
                <option value="all">All</option>
              </Form.Select>
            </div>
          </div>
        </div>
        <TournamentScheduleTable 
          data={ filteredTournamentSchedule }
          addPlayerToTournament= { addPlayerToTournament }
        ></TournamentScheduleTable>
      </Container>
      <Modal
        show={show}
        onHide={handleClose}
        onShow= { handleOnShow }
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton closeVariant='white'>
          <Modal.Title>Add/Remove Interested Player(s)</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {isLoading 
              ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: `${modalBodyHeight}px` }}>
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
              : <div ref={ref} key={`default-checkbox`} style={{color: 'rgb(100, 100, 100)'}}>
              {roster.map(r => (
                <Form.Check
                  key={`roster-checkbox-${r.id}`} 
                  type={'checkbox'}
                  id={`default-checkbox-${r.id}`}
                  label={ r.displayName }
                  inline
                  checked={ selectedTournament.players ? selectedTournament.players.includes(r.id) : false }
                  onChange={ (e) => handleCheckboxChange(e, r) }
                  style={{width: '85px'}}
                />
              ))}
            </div>}
            
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={ handleAddPlayerOk }>OK</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default GLHome;
