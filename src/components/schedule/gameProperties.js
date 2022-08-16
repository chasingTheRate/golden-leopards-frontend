import moment from "moment";

export const defaultGame = {
  start: "",
  opponent: "",
  is_hometeam: false,
  field: "",
  recordgame: false,
  veolink: "",
  ourscore: 0,
  hide: false,
  opponentscore: 0,
  gamestatus: "scheduled",
  league_id: "",
  opponentshortname: "",
}

export default [
  {
    controlId: 'opponent',
    displayName: 'Opponent',
    type: 'text',
    requiresValidation: true,
    validationRegex: /^\s*\S+.*/,
    validationMsg: 'Required'
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
    controlId: 'is_hometeam',
    displayName: 'Home Team',
    type: 'checkbox',
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
  {
    controlId: 'league_id',
    displayName: 'League',
    type: 'select',
    defaultValue: 'Select league',
    values: 'leagues',
    valueKey: 'displayname',
    requiresValidation: true,
    validationRegex: /^\s*\S+.*/,
    validationMsg: 'Required'
  },
]