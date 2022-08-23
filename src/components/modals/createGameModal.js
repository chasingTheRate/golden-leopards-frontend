import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
} from 'react-bootstrap';
import moment from "moment";

import { defaultGame, gameStatusOptions } from "../schedule/gameProperties";

import GameForm from "../schedule/gameForm";

const CreateGameModal = ({
  modalRef,
  show,
  onHide,
  onSubmit,
  isLoading,
  onExit,
  leagues,
  logos,
  selectedGame,
}) => {
  
  const [game, setGame] = useState(selectedGame);
  const [validationResults, setValidationResults] = useState({});

  useEffect(() => {
    setGame(selectedGame);
  }, [selectedGame])

  

  const handleOnExit = () => {
    setGame(defaultGame);
    onExit();
  }

  const handleGameChange = (updatedGame) => {
    setGame(updatedGame);
  }

  const handleValidationChange = (newValidationResults) => {
    setValidationResults({...validationResults, ...newValidationResults});
  }

  const updateGame = (e) => {
    const tempGame = Object.assign({}, game);
    tempGame.start = moment(game.start, 'M/D/YYYY h:mma').toISOString();
    onSubmit(tempGame);
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
          <Modal.Title>Create Game</Modal.Title>
        </Modal.Header>
        <Modal.Body ref={ modalRef }>
          <GameForm 
              game={ game }
              leagues={ leagues }
              logos={ logos }
              gameStatusOptions={ gameStatusOptions }
              onChange = { handleGameChange }
              validationResults = { validationResults }
              onValidationChange = { handleValidationChange }
              isLoading = { isLoading }
            ></GameForm>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={ onHide }>
            Close
          </Button>
          <Button variant="primary" onClick={ updateGame } disabled={ isDisabled }>OK</Button>
        </Modal.Footer>
      </Modal>
  );
}

export default CreateGameModal;
