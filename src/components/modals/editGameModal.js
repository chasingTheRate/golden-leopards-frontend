import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Button,
  Modal,
  Form,
  Spinner,
  FloatingLabel
} from 'react-bootstrap';

import moment from "moment";

const EditGameModal = ({ modalRef, show, onHide, onShow, selectedGame, onSubmit, isLoading, onExit }) => {
  
  const [game, setGame] = useState({});
  const [modalBodyHeight, setModalBodyHeight] = useState(0);
  
  React.useEffect(() => {
      setGame(selectedGame);
  }, [selectedGame])

  const handleOnShow = () => {
    const div = Object.assign( {}, modalRef);
    setModalBodyHeight(div.current.clientHeight);
  }
  
  const inputBoxDidChange = (e) => {
    const updatedGame = Object.assign({}, game);
    updatedGame[e.target.id] = e.target.value;
    setGame(updatedGame);
  }

  const numberInputBoxDidChange = (e) => {
    const updatedGame = Object.assign({}, game);
    updatedGame[e.target.id] = Number.parseInt(e.target.value);
    setGame(updatedGame);
  }

  const checkboxDidChange = (e) => {
    const updatedGame = Object.assign({}, game);
    updatedGame[e.target.id] = e.target.checked;
    setGame(updatedGame);
  }

  const updateGame = (e) => {
    onSubmit(game);
  }

  return (
      <Modal
        show={ show }
        onShow= { handleOnShow }
        onHide= { onHide }
        onExit = { onExit }
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton closeVariant='white'>
          <Modal.Title>Edit Game</Modal.Title>
        </Modal.Header>
        <Modal.Body ref={ modalRef }>

          { isLoading 

              ? <div className='tournament-modal-loading-container' style={{ height: `300px` }}>
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
              :
                <div style={{ maxHeight: '300px', overflowY: 'scroll'}}>
                  <Form.Group className="mb-3" controlId="opponent">
                    <Form.Label>Opponent</Form.Label>
                    <Form.Control type="text" value={ game.opponent || '' } onChange={ inputBoxDidChange }/>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="start">
                    <Form.Label>Time</Form.Label>
                    <Form.Control 
                      type="text" 
                      value={ moment.utc(game.start).local().format('M/D/YYYY h:mma') || '' } 
                      onChange={ inputBoxDidChange }
                      disabled
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="field">
                    <Form.Label>Field</Form.Label>
                    <Form.Control type="text" value={ game.field || '' } onChange={ inputBoxDidChange } />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="hometeam">
                    <Form.Label>Home Team</Form.Label>
                    <Form.Control type="text" value={ game.hometeam || '' } onChange={ inputBoxDidChange } disabled/>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="gamestatus">
                    <Form.Label>Game Status</Form.Label>
                    <Form.Control type="text" value={ game.gamestatus || '' } onChange={ inputBoxDidChange } />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="ourscore">
                    <Form.Label>Our Score</Form.Label>
                    <Form.Control type="text" value={ game.ourscore || '' } onChange={ numberInputBoxDidChange } />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="opponentscore">
                    <Form.Label>Opponent Score</Form.Label>
                    <Form.Control type="number" value={ game.opponentscore || '' } onChange={ numberInputBoxDidChange } />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="opponentshortname">
                    <Form.Label>Opponent Shortname</Form.Label>
                    <Form.Control type="text" value={ game.opponentshortname || '' } onChange={ inputBoxDidChange } />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="hide">
                    <Form.Check 
                      type="checkbox" 
                      label="Hide" 
                      checked={ game.hide || false } 
                      onChange={ checkboxDidChange }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="recordgame">
                    <Form.Check 
                      type="checkbox" 
                      label="Recorded Game" 
                      checked={ game.recordgame || false } 
                      onChange={ checkboxDidChange }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="veolink">
                    <Form.Label>Veo Link</Form.Label>
                    <Form.Control type="url" value={ game.veolink || '' } onChange={ inputBoxDidChange } />
                  </Form.Group>
                </div>
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={ onHide }>
            Close
          </Button>
          <Button variant="primary" onClick={ updateGame }>OK</Button>
        </Modal.Footer>
      </Modal>
  );
}

export default EditGameModal;
