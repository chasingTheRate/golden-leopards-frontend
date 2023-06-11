import React, { useState, useEffect, Fragment } from "react";
import {
  Form,
  Spinner,
} from 'react-bootstrap';

import tournamentProperties from "./tournamentProperties";
import { tournamentStatusOptions } from "./tournamentProperties";
import GLCheckbox from "../multiuse/glCheckbox";
import GLInputField from "../multiuse/glInputField";
import GLSelect from "../multiuse/glSelect";

const TournamentForm = (props) => {

  const { 
    isLoading, 
    tournament,
    onChange,
    validationResults,
    onValidationChange
  } = props;

  useEffect(() => {
    let validationResult = {}
    Object.entries(tournamentProperties).forEach(([key, value]) => {
      validationResult = { ...validationResult, ...validationCheck(key, value)}
    });
    onValidationChange(validationResult)
  }, [tournament]);

  const validationCheck = (property, value) => {
    const valid = isValid(property, value);
    return {[property.controlId]: valid };
  }

  const inputBoxDidChange = (e, options) => {
    const updatedTournament = Object.assign({}, tournament);
    updatedTournament[e.target.id] = e.target.value;
    onValidationChange(validationCheck(options, e.target.value));
    onChange(updatedTournament);
  }

  const checkboxDidChange = (e) => {
    const updatedTournament = Object.assign({}, tournament);
    updatedTournament[e.target.id] = e.target.checked;
    onChange(updatedTournament);
  }

  const selectDidChange = (e, options) => {
    const updatedTournament = Object.assign({}, tournament);
    updatedTournament[options.controlId] = e.target.value;
    validationCheck(options, e.target.value);
    onChange(updatedTournament);
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
      valid = property.validationFunction(newValue ? newValue : tournament[property.controlId]);
    }

    return valid
  }

  
  const controlIsValid = (property, controlId) => {
    const validationResult = validationResults[controlId];
    return validationResult ? validationResult : isValid(property, tournament[ property.controlId]);
  }

  const getValue = (controlId) => {
    let value = '';

    try {
      value = tournament[controlId].toString();
    } catch (e) {
      // do nothing
    }
    return value;
  }

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
            <GLCheckbox 
              options={ tournamentProperties.hide }
              value={tournament.hide}
              onChange={ checkboxDidChange }
            ></GLCheckbox>
            <GLCheckbox
              options={ tournamentProperties.isLocal }
              value={ tournament.islocal }
              onChange={ checkboxDidChange }
            ></GLCheckbox>
            <GLCheckbox
              options={ tournamentProperties.isOutOfState }
              value={tournament.isoutofstate}
              onChange={ checkboxDidChange }
            ></GLCheckbox>
            <GLInputField 
              options={ tournamentProperties.name }
              getValue={ getValue }
              controlIsValid={ controlIsValid }
            ></GLInputField>
            <GLInputField 
              options={ tournamentProperties.location }
              getValue={ getValue }
              controlIsValid={ controlIsValid }
              onChange={ inputBoxDidChange }
            ></GLInputField>
             <GLInputField 
              options={ tournamentProperties.url }
              getValue={ getValue }
              controlIsValid={ controlIsValid }
              onChange={ inputBoxDidChange }
            ></GLInputField>
            <GLSelect
              options={ tournamentProperties.status }
              selectOptions={ tournamentStatusOptions }
              value= { tournament.status }
              controlIsValid={ controlIsValid }
              onChange={ selectDidChange }
            ></GLSelect>
            <GLInputField 
              options={ tournamentProperties.startDate }
              getValue={ getValue }
              controlIsValid={ controlIsValid }
              onChange={ inputBoxDidChange }
            ></GLInputField>
            <GLInputField 
              options={ tournamentProperties.endDate }
              getValue={ getValue }
              controlIsValid={ controlIsValid }
              onChange={ inputBoxDidChange }
            ></GLInputField>
        </div>
      }
    </Fragment>
  );
}

export default TournamentForm;
