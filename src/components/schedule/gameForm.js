import React, { useState, useEffect, Fragment } from "react";
import {
  Form,
  Spinner,
} from 'react-bootstrap';

import gameProperties from "../schedule/gameProperties";

const GameForm = (props) => {

  const { 
    isLoading, 
    game,
    onChange,
    validationResults,
    onValidationChange
  } = props;

  
  useEffect(() => {
    let validationResult = {}
    gameProperties.forEach(p => {
      validationResult = { ...validationResult, ...validationCheck(p, game[p.controlId])}
    });
    onValidationChange(validationResult)
  }, [game]);

  const validationCheck = (property, value) => {
    const valid = isValid(property, value);
    return {[property.controlId]: valid };
  }

  const inputBoxDidChange = (e, p) => {
    const updatedGame = Object.assign({}, game);
    updatedGame[e.target.id] = e.target.value;
    onValidationChange(validationCheck(p, e.target.value));
    onChange(updatedGame);
  }

  const checkboxDidChange = (e) => {
    const updatedGame = Object.assign({}, game);
    updatedGame[e.target.id] = e.target.checked;
    onChange(updatedGame);
  }

  const selectDidChange = (e, p) => {
    const updatedGame = Object.assign({}, game);
    updatedGame[p.controlId] = e.target.value;
    validationCheck(p, e.target.value);
    onChange(updatedGame);
  }

  const isValid = (property, newValue) => {
  
    let valid = true;

    if (!property.requiresValidation) {
      return valid;
    }

    if (property.validationRegex) {
      valid = property.validationRegex.test(newValue);
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

  const controlIsValid = (property, controlId) => {
    const validationResult = validationResults[controlId];
    return validationResult ? validationResult : isValid(property, game[ property.controlId]);
  }

  const gamePropertiesList = gameProperties.map(p => {

    let control = [];

    switch (p.type) {
      case 'date':
      case 'text':
        control = (
          <Form.Group key={ p.controlId } style={{paddingBottom: '8px'}} controlId={ p.controlId }>
            <Form.Label>{ p.displayName }</Form.Label>
            <Form.Control type="text" value={ getValue(p.controlId) } onChange={ (e) => inputBoxDidChange(e, p) }/>
            { controlIsValid(p, p.controlId) 
              ? <Form.Text className="text-muted">&nbsp;</Form.Text>
              : <Form.Text className="text-muted">{ p.validationMsg }</Form.Text>
            }
          </Form.Group>
        )
      break;
      case 'checkbox':
        control = (
          <Form.Group key={ p.controlId } controlId={ p.controlId }>
            <Form.Check 
              type="checkbox" 
              label={ p.displayName } 
              checked={ game[p.controlId] || false } 
              onChange={ (e) => checkboxDidChange(e, p) }
            />
            { controlIsValid(p, p.controlId) 
              ? <Form.Text className="text-muted">&nbsp;</Form.Text>
              : <Form.Text className="text-muted">{ p.validationMsg }</Form.Text>
            }
          </Form.Group>
        )
        break;
      case 'select':
        control = (
          <Form.Group key={ p.controlId } style={{paddingBottom: '8px'}} controlId={ p.controlId }>
            <Form.Label>{ p.displayName }</Form.Label>
            <Form.Select 
              aria-label={ `${p.controlId}-select` }
              onChange={(e) => selectDidChange(e, p)}
              value={ game[p.controlId] || '' }
            >
              <option value="">{ p.defaultValue }</option>
              { props[p.values].map(l => (<option key={ l[p.valueKey] } value={ l[p.valueKey] }>{ l[p.displayKey] }</option>)) }
            </Form.Select>
            { controlIsValid(p, p.controlId)
              ? <Form.Text className="text-muted">&nbsp;</Form.Text>
              : <Form.Text className="text-muted">{ p.validationMsg }</Form.Text>
            }
          </Form.Group>
        )
        break;
      default:
        break;
    }

    return control;
  })

  return (
    <Fragment>
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
    </Fragment>
  );
}

export default GameForm;
