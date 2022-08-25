import React, { useState } from "react";
import {
  Button,
  Modal,
} from 'react-bootstrap';
import moment from "moment";

import GameForm from "../schedule/gameForm";
import { gameStatusOptions } from "../schedule/gameProperties";

const EditGameModal = (props) => {
  
  const { 
    modalRef, 
    show, 
    onHide, 
    selectedGame, 
    onSubmit, 
    isLoading, 
    onExit,
    leagues,
    logos
  } = props;

  const [game, setGame] = useState({});
  const [validationResults, setValidationResults] = useState({});

  React.useEffect(() => {
    const tempGame = Object.assign({}, selectedGame);
    tempGame.start = moment.utc(tempGame.start, 'YYYY-MM-DDTHH:mm:ss.sssZ').local().format('M/D/YYYY h:mma').toString();
    setGame(tempGame);
  }, [selectedGame])

  const handleGameChange = (updatedGame) => {
    setGame(updatedGame);
  }

  const handleValidationChange = (validationResult) => {
    setValidationResults({ ...validationResults, ...validationResult });
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
        onExit = { onExit }
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton closeVariant='white'>
          <Modal.Title>Edit Game</Modal.Title>
        </Modal.Header>
        <Modal.Body ref={ modalRef } style={{padding: '8px'}}>
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

export default EditGameModal;
