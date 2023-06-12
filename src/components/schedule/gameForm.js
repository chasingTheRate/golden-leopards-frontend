import React, { useState, useEffect, Fragment } from "react";
import {
  Form,
  Spinner,
} from 'react-bootstrap';

import gameProperties from "../schedule/gameProperties";
import { gameStatusOptions } from "../schedule/gameProperties";
import GLInputField from "../multiuse/glInputField";
import GLCheckbox from "../multiuse/glCheckbox";
import GLSelect from "../multiuse/glSelect";
import GLSelectWithAction from "../multiuse/glSelectWithAction";

const GameForm = (props) => {

  const { 
    isLoading, 
    game,
    leagues,
    logos,
    onChange,
    validationResults,
    onValidationChange
  } = props;

  
  useEffect(() => {
    let validationResult = {}
    Object.entries(gameProperties).forEach(([key, value]) => {
      validationResult = { ...validationResult, ...validationCheck(key, value)}
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
          {/* //{ gamePropertiesList } */}
          <GLInputField
            options={ gameProperties.opponent }
            getValue={ getValue }
            controlIsValid={ controlIsValid }
            onChange={ inputBoxDidChange }
          ></GLInputField>
          <GLInputField
            options={ gameProperties.start }
            getValue={ getValue }
            controlIsValid={ controlIsValid }
            onChange={ inputBoxDidChange }
          ></GLInputField>
          <GLInputField
            options={ gameProperties.field }
            getValue={ getValue }
            controlIsValid={ controlIsValid }
            onChange={ inputBoxDidChange }
          ></GLInputField>
          <GLSelect
            options={ gameProperties.gameStatus }
            selectOptions={ gameStatusOptions }
            value= { game.gamestatus }
            controlIsValid={ controlIsValid }
            onChange={ selectDidChange }
          ></GLSelect>
          <GLInputField
            options={ gameProperties.ourScore }
            getValue={ getValue }
            controlIsValid={ controlIsValid }
            onChange={ inputBoxDidChange }
          ></GLInputField>
          <GLInputField
            options={ gameProperties.opponentScore }
            getValue={ getValue }
            controlIsValid={ controlIsValid }
            onChange={ inputBoxDidChange }
          ></GLInputField>
          <GLInputField
            options={ gameProperties.opponentShortName }
            getValue={ getValue }
            controlIsValid={ controlIsValid }
            onChange={ inputBoxDidChange }
          ></GLInputField>
          <GLCheckbox
            options={ gameProperties.isHometeam }
            value={game.ishometeam}
            onChange={ checkboxDidChange }
          ></GLCheckbox>
          <GLCheckbox
            options={ gameProperties.reverseColors }
            value={game.reversecolors}
            onChange={ checkboxDidChange }
          ></GLCheckbox>
          <GLCheckbox
            options={ gameProperties.hide }
            value={game.hide}
            onChange={ checkboxDidChange }
          ></GLCheckbox>
          <GLCheckbox
            options={ gameProperties.recordGame }
            value={game.recordgame}
            onChange={ checkboxDidChange }
          ></GLCheckbox>
          <GLSelect
            options={ gameProperties.leagueId }
            selectOptions={ leagues }
            value= { game.league_id }
            controlIsValid={ controlIsValid }
            onChange={ selectDidChange }
          ></GLSelect>
          <GLSelect
            options={ gameProperties.logoId }
            selectOptions={ logos }
            value= { game.logoid }
            controlIsValid={ controlIsValid }
            onChange={ selectDidChange }
          ></GLSelect>
        </div>
      }
    </Fragment>
  );
}

export default GameForm;
