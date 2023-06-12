import React, { useState, useEffect, Fragment } from "react";
import {
  Form,
  Spinner,
} from 'react-bootstrap';

import leagueProperties from "../leagues/leagueProperties";

const LeagueForm = (props) => {

  const { 
    isLoading, 
    league,
    onChange,
    validationResults,
    onValidationChange
  } = props;

  
  useEffect(() => {
    let validationResult = {}
    leagueProperties.forEach(p => {
      validationResult = { ...validationResult, ...validationCheck(p, league[p.controlId])}
    });
    onValidationChange(validationResult)
  }, [league]);

  const validationCheck = (property, value) => {
    const valid = isValid(property, value);
    return {[property.controlId]: valid };
  }

  const inputBoxDidChange = (e, p) => {
    const updatedGame = Object.assign({}, league);
    updatedGame[e.target.id] = e.target.value;
    onValidationChange(validationCheck(p, e.target.value));
    onChange(updatedGame);
  }

  const checkboxDidChange = (e) => {
    const updatedLeague = Object.assign({}, league);
    updatedLeague[e.target.id] = e.target.checked;
    onChange(updatedLeague);
  }

  const selectDidChange = (e, p) => {
    const updatedLeague = Object.assign({}, league);
    updatedLeague[p.controlId] = e.target.value;
    validationCheck(p, e.target.value);
    onChange(updatedLeague);
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
      valid = property.validationFunction(newValue ? newValue : league[property.controlId]);
    }

    return valid
  }

  const getValue = (controlId) => {
    let value = '';

    try {
      value = league[controlId].toString();
    } catch (e) {
      // do nothing
    }

    return value;
  }

  const controlIsValid = (property, controlId) => {
    const validationResult = validationResults[controlId];
    return validationResult ? validationResult : isValid(property, league[property.controlId]);
  }

  const leaguePropertiesList = leagueProperties.map(p => {

    let control = [];
    
    switch (p.type) {
      case 'date':
      case 'text':
        control = (
          <Form.Group
            className='form-group'
            key={ p.controlId }
            controlId={ p.controlId }
            style={{ 
              minWidth: p.minWidth,
              maxWidth: p.maxWidth,
             }}
          >
            <Form.Label className='form-label'>{ p.displayName }</Form.Label>
            <Form.Control className='form-control' type="text" value={ getValue(p.controlId) } onChange={ (e) => inputBoxDidChange(e, p) }/>
            { controlIsValid(p, p.controlId) 
              ? <Form.Text className="text-muted">&nbsp;</Form.Text>
              : <Form.Text className="text-muted">{ p.validationMsg }</Form.Text>
            }
          </Form.Group>
        )
      break;
      case 'checkbox':
        control = (
          <Form.Group
            className='form-group'
            style={{ 
              minWidth: p.minWidth,
              maxWidth: p.maxWidth,
             }}
            key={ p.controlId }
            controlId={ p.controlId }
          >
            <Form.Check 
              type="checkbox" 
              label={ p.displayName } 
              checked={ league[p.controlId] || false } 
              onChange={ (e) => checkboxDidChange(e, p) }
            />
          </Form.Group>
        )
        break;
      case 'select':
        control = (
          <Form.Group 
            className='form-group'
            key={ p.controlId }
            controlId={ p.controlId }
            style={{
              minWidth: p.minWidth,
              maxWidth: p.maxWidth
            }}
          >
            <Form.Label>{ p.displayName }</Form.Label>
            <Form.Select 
              aria-label={ `${p.controlId}-select` }
              onChange={(e) => selectDidChange(e, p)}
              value={ league[p.controlId] || '' }
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
        <div style={{ display: 'flex', flexWrap: 'wrap', maxHeight: '300px', overflowY: 'scroll' }}>
          { leaguePropertiesList }
        </div>
      }
    </Fragment>
  );
}

export default LeagueForm;
