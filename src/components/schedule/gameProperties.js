import moment from "moment";

export default [
  {
    controlId: 'opponent',
    displayName: 'Opponent',
    type: 'text',
    requiresValidation: false,
    validationMsg: ''
  },
  {
    controlId: 'start',
    displayName: 'Time',
    type: 'date',
    requiresValidation: true,
    validationRegex: null,
    validationFunction: (date) => moment(date, 'M/D/YYYY h:mma', true).isValid(),
    validationMsg: 'Must be a valid date (ex: 1/1/2022 12:00pm)'
  },
  {
    controlId: 'field',
    displayName: 'Field',
    type: 'text',
    requiresValidation: false,
    validationMsg: ''
  },
  {
    controlId: 'hometeam',
    displayName: 'Home Team',
    type: 'text',
    requiresValidation: false,
    validationMsg: ''
  },
  {
    controlId: 'gamestatus',
    displayName: 'Status',
    type: 'text',
    requiresValidation: false,
    validationMsg: ''
  },
  {
    controlId: 'ourscore',
    displayName: 'Our Score',
    type: 'text',
    requiresValidation: false,
    validationMsg: ''
  },
  {
    controlId: 'opponentscore',
    displayName: 'Opponent Score',
    type: 'text',
    requiresValidation: false,
    validationMsg: ''
  },
  {
    controlId: 'opponentshortname',
    displayName: 'Opponent Shortname',
    type: 'text',
    requiresValidation: false,
    validationMsg: ''
  },
  {
    controlId: 'hide',
    displayName: 'Hide',
    type: 'checkbox',
    requiresValidation: false,
    validationMsg: ''
  },
  {
    controlId: 'recordgame',
    displayName: 'Recorded Game',
    type: 'checkbox',
    requiresValidation: false,
    validationMsg: ''
  },
  {
    controlId: 'veolink',
    displayName: 'Veo Link',
    type: 'text',
    requiresValidation: false,
    validationMsg: ''
  },
]