import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
} from 'react-bootstrap';

import { defaultLeague, leagueTypeOptions } from "../leagues/leagueProperties";

import LeagueForm from "../forms/leagueForm";

const CreateLeagueModal = ({
  modalRef,
  show,
  onHide,
  onSubmit,
  isLoading,
  onExit,
  leagues,
  logos,
  selectedLeague,
}) => {
  
  const [league, setLeague] = useState(selectedLeague);
  const [validationResults, setValidationResults] = useState({});

  useEffect(() => {
    setLeague(selectedLeague);
  }, [selectedLeague])

  const handleOnExit = () => {
    setLeague(defaultLeague);
    onExit();
  }

  const handleLeagueChange = (updatedLeague) => {
    setLeague(updatedLeague);
  }

  const handleValidationChange = (newValidationResults) => {
    setValidationResults({...validationResults, ...newValidationResults});
  }

  const updateLeague = (e) => {
    const tempLeague = Object.assign({}, league);
    console.log(tempLeague);
    onSubmit(tempLeague);
  }


  const isDisabled = Object.values(validationResults).includes(false);

  return (
      <Modal
        show={ show }
        onHide= { onHide }
        onExit = { handleOnExit }
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton closeVariant='white'>
          <Modal.Title>Create League</Modal.Title>
        </Modal.Header>
        <Modal.Body ref={ modalRef }>
          <LeagueForm
              league={ league }
              leagues={ leagues }
              logos={ logos }
              leagueTypeOptions={ leagueTypeOptions }
              onChange = { handleLeagueChange }
              validationResults = { validationResults }
              onValidationChange = { handleValidationChange }
              isLoading = { isLoading }
            ></LeagueForm>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={ onHide }>
            Close
          </Button>
          <Button variant="primary" onClick={ updateLeague } disabled={ isDisabled }>OK</Button>
        </Modal.Footer>
      </Modal>
  );
}

export default CreateLeagueModal;
