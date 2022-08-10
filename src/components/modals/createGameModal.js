import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Modal,
  Form,
  Spinner,
} from 'react-bootstrap';
import moment from "moment";

import gameProperties from "../schedule/gameProperties";

const CreateGameModal = ({ modalRef, show, onHide, onSubmit, isLoading, onExit }) => {
  
  const [game, setGame] = useState({});
  const [validationResults, setValidationResults] = useState({});

  const handleOnShow = () => {
    
    const initialValidationCheck = {}
    
    gameProperties.forEach(p => {
      initialValidationCheck[p.controlId] = isValid(p, game[p.controlId])
    });

    setValidationResults(initialValidationCheck);
  }

  const validationCheck = (property, value) => {
    const valid = isValid(property, value);
    setValidationResults({...validationResults, [property.controlId]: valid});
  }

  const inputBoxDidChange = (e, p) => {
    const updatedGame = Object.assign({}, game);
    updatedGame[e.target.id] = e.target.value;
    validationCheck(p, e.target.value);
    setGame(updatedGame);
  }

  const checkboxDidChange = (e) => {
    const updatedGame = Object.assign({}, game);
    updatedGame[e.target.id] = e.target.checked;
    setGame(updatedGame);
  }

  const updateGame = (e) => {
    const tempGame = Object.assign({}, game);
    tempGame.start = moment(game.start, 'M/D/YYYY h:mma').toISOString();
    onSubmit(tempGame);
  }

  const isValid = (property, newValue) => {

    let valid = true;

    if (!property.requiresValidation) {
      return valid;
    }

    if (property.validationRegex) {
      valid = property.validationRegex.test(newValue ? newValue : game[property.controlId]);
    }

    if (property.validationFunction) {
      valid = property.validationFunction(newValue ? newValue : game[property.controlId]);
    }

    return valid
  }

  const getValue = (controlId) => {
    let value = '';

    try {
      value = game[controlId].toString();
    } catch (e) {
      // do nothing
    }

    return value;
  }

  const isDisabled = Object.values(validationResults).includes(false);

  const gamePropertiesList = gameProperties.map(p => {

    let control = [];

    switch (p.type) {
      case 'date':
      case 'text':
        control = (
          <Form.Group key={ p.controlId } style={{paddingBottom: '8px'}} controlId={ p.controlId }>
            <Form.Label>{ p.displayName }</Form.Label>
            <Form.Control type="text" value={ getValue(p.controlId) } onChange={ (e) => inputBoxDidChange(e, p) }/>
            { isValid(p) 
              ? <Form.Text className="text-muted">&nbsp;</Form.Text>
              : <Form.Text className="text-muted">{ p.validationMsg }</Form.Text>
            }
          </Form.Group>
        )
      break;
      case 'checkbox':
        control = (
          <Form.Group key={ p.controlId } style={{paddingBottom: '8px'}} controlId={ p.controlId }>
            <Form.Check 
              type="checkbox" 
              label={ p.displayName } 
              checked={ game[p.controlId] || false } 
              onChange={ (e, p) => checkboxDidChange(e, p) }
            />
          </Form.Group>
        )
        break;
      default:
        break;
    }

    return control;
  })

  return (
      <Modal
        show={ show }
        onShow={ handleOnShow }
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
                  { gamePropertiesList }
                </div>
          }
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
