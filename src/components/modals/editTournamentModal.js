import React, { useState } from "react";
import {
  Button,
  Modal,
} from 'react-bootstrap';
import moment from "moment";


import TournamentForm from "../tournaments/tournamentForm";
import { tournamentStatusOptions } from "../tournaments/tournamentProperties";''

const EditTournamentModal = (props) => {
  
  const { 
    modalRef, 
    show, 
    onHide, 
    selectedTournament, 
    onSubmit, 
    isLoading, 
    onExit,
    leagues,
    logos
  } = props;

  const [tournament, setTournament] = useState({});
  const [validationResults, setValidationResults] = useState({});

  React.useEffect(() => {
    const tempTournament = Object.assign({}, selectedTournament);
    tempTournament.startdate = moment.utc(tempTournament.startdate, 'YYYY-MM-DDTHH:mm:ss.sssZ').local().format('M/D/YYYY').toString();
    tempTournament.enddate = moment.utc(tempTournament.enddate, 'YYYY-MM-DDTHH:mm:ss.sssZ').local().format('M/D/YYYY').toString();
    setTournament(tempTournament);
  }, [selectedTournament])

  const handleTournamentChange = (updatedTournament) => {
    setTournament(updatedTournament);
  }

  const handleValidationChange = (validationResult) => {
    setValidationResults({ ...validationResults, ...validationResult });
  }

  const updateTournament = (e) => {
    const tempTournament = Object.assign({}, tournament);
    onSubmit(tempTournament);
  }

  const isDisabled = Object.values(validationResults).includes(false);

  return (
      <Modal
        show={ show }
        onHide= { onHide }
        onExit = { onExit }
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton closeVariant='white'>
          <Modal.Title>Edit Tournament</Modal.Title>
        </Modal.Header>
        <Modal.Body ref={ modalRef } style={{padding: '8px'}}>
          <TournamentForm 
            tournament={ tournament }
            leagues={ leagues }
            logos={ logos }
            tournamentStatusOptions={ tournamentStatusOptions }
            onChange = { handleTournamentChange }
            validationResults = { validationResults }
            onValidationChange = { handleValidationChange }
            isLoading = { isLoading }
          ></TournamentForm>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={ onHide }>
            Close
          </Button>
          <Button variant="primary" onClick={ updateTournament } disabled={ isDisabled }>OK</Button>
        </Modal.Footer>
      </Modal>
  );
}

export default EditTournamentModal;
