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
  logoid: "",
  opponentshortname: "",
}

export const gameStatusOptions = [
  {
    value: 'scheduled',
    displayName: 'Scheduled'
  },
  {
    value: 'final',
    displayName: 'Final'
  },
  {
    value: 'canceled',
    displayName: 'Canceled'
  }
]

export default [
  {
    controlId: 'opponent',
    displayName: 'Opponent',
    type: 'text',
    requiresValidation: true,
    validationRegex: /^\s*\S+.*/,
    validationMsg: 'Required',
    minWidth: '100%',
    maxWidth: '100%'
  },
  {
    controlId: 'start',
    displayName: 'Time',
    type: 'date',
    requiresValidation: true,
    validationRegex: null,
    validationFunction: (date) => moment(date, 'M/D/YYYY h:mma', true).isValid(),
    validationMsg: 'Must be a valid date (ex: 1/1/2022 12:00pm)',
    minWidth: '175px',
    maxWidth: '100%'
  },
  {
    controlId: 'field',
    displayName: 'Field',
    type: 'text',
    requiresValidation: false,
    validationMsg: '',
    minWidth: '100%',
    maxWidth: '100%'
  },
  {
    controlId: 'gamestatus',
    displayName: 'Status',
    type: 'select',
    defaultValue: 'Select Game Status',
    values: 'gameStatusOptions',
    valueKey: 'value',
    displayKey: 'displayName',
    requiresValidation: true,
    validationRegex: /^\s*\S+.*/,
    validationMsg: 'Required',
    minWidth: '100%',
    maxWidth: '100%'
  },
  {
    controlId: 'ourscore',
    displayName: 'Our Score',
    type: 'text',
    requiresValidation: false,
    validationMsg: '',
    minWidth: '80px',
    maxWidth: '80px'
  },
  {
    controlId: 'opponentscore',
    displayName: 'Opp Score',
    type: 'text',
    requiresValidation: false,
    validationMsg: '',
    minWidth: '80px',
    maxWidth: '80px'
  },
  {
    controlId: 'opponentshortname',
    displayName: 'Opp Shortname',
    type: 'text',
    requiresValidation: false,
    validationMsg: '',
    minWidth: '100px',
    maxWidth: '100px'
  },
  {
    controlId: 'is_hometeam',
    displayName: 'Home Team',
    type: 'checkbox',
    requiresValidation: false,
    validationMsg: '',
    minWidth: '100px',
    maxWidth: '100%'
  },
  {
    controlId: 'reverse_colors',
    displayName: 'Reverse Colors',
    type: 'checkbox',
    requiresValidation: false,
    validationMsg: '',
    minWidth: '100px',
    maxWidth: '100%'
  },
  {
    controlId: 'hide',
    displayName: 'Hide',
    type: 'checkbox',
    requiresValidation: false,
    validationMsg: '',
    minWidth: '60px',
    maxWidth: '100%'
  },
  {
    controlId: 'recordgame',
    displayName: 'Recorded Game',
    type: 'checkbox',
    requiresValidation: false,
    validationMsg: '',
    minWidth: '120px',
    maxWidth: '100%'
  },
  {
    controlId: 'veolink',
    displayName: 'Veo Link',
    type: 'text',
    requiresValidation: false,
    validationMsg: '',
    minWidth: '100%',
    maxWidth: '100%'
  },
  {
    controlId: 'league_id',
    displayName: 'League',
    type: 'select',
    defaultValue: 'Select league',
    values: 'leagues',
    valueKey: 'id',
    displayKey: 'displayname',
    requiresValidation: true,
    validationRegex: /^\s*\S+.*/,
    validationMsg: 'Required',
    minWidth: '300px',
    maxWidth: '100%'
  },
  {
    controlId: 'logoid',
    displayName: 'Logo',
    type: 'select',
    defaultValue: 'Select logo',
    values: 'logos',
    valueKey: 'id',
    displayKey: 'display_name',
    requiresValidation: false,
    validationRegex: /^\s*\S+.*/,
    validationMsg: 'Required',
    minWidth: '300px',
    maxWidth: '100%'
  },
]