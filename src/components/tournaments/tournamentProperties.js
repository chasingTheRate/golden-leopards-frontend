import moment from "moment";

export const defaultTournament = {
  status: "",
  name: "",
  hide: false,
  islocal: false,
  isoutofstate: false,
  location: "",
  startdate: moment().format(),
  enddate: moment().add(1, 'days').format(),
  url: ""
}

export const tournamentStatusOptions = [
  {
    value: 'accepted',
    displayName: 'Accepted'
  },
  {
    value: 'registered',
    displayName: 'Registered'
  },
  {
    value: 'not attending',
    displayName: 'Not Attending'
  }
]

export default {
  location: {
    controlId: 'location',
    displayName: 'Location',
    type: 'text',
    requiresValidation: true,
    validationRegex: /^\s*\S+.*/,
    validationMsg: 'Required',
    minWidth: '100%',
    maxWidth: '100%'
  },
  name: {
    controlId: 'name',
    displayName: 'Name',
    type: 'text',
    requiresValidation: true,
    validationRegex: /^\s*\S+.*/,
    validationMsg: 'Required',
    minWidth: '100%',
    maxWidth: '100%'
  },
  url: {
    controlId: 'url',
    displayName: 'URL',
    type: 'text',
    requiresValidation: false,
    validationRegex: /^\s*\S+.*/,
    validationMsg: 'Required',
    minWidth: '100%',
    maxWidth: '100%'
  },
  startDate: {
    controlId: 'startdate',
    displayName: 'Start Date',
    type: 'date',
    requiresValidation: true,
    validationRegex: null,
    validationFunction: (date) => moment(date, 'M/D/YYYY', true).isValid(),
    validationMsg: 'Must be a valid date (ex: 1/1/2022)',
    minWidth: '175px',
    maxWidth: '100%'
  },
  endDate: {
    controlId: 'enddate',
    displayName: 'End Date',
    type: 'date',
    requiresValidation: true,
    validationRegex: null,
    validationFunction: (date) => moment(date, 'M/D/YYYY', true).isValid(),
    validationMsg: 'Must be a valid date (ex: 1/1/2022)',
    minWidth: '175px',
    maxWidth: '100%'
  },
  status: {
    controlId: 'status',
    displayName: 'Status',
    type: 'select',
    defaultValue: 'Select Tournamnent Status',
    values: 'tournamentStatusOptions',
    valueKey: 'value',
    displayKey: 'displayName',
    requiresValidation: false,
    validationRegex: /^\s*\S+.*/,
    validationMsg: 'Required',
    minWidth: '100%',
    maxWidth: '100%'
  },
  hide: {
    controlId: 'hide',
    displayName: 'Hide',
    type: 'checkbox',
    requiresValidation: false,
    validationMsg: '',
    minWidth: '60px',
    maxWidth: '100%'
  },
  isLocal: {
    controlId: 'islocal',
    displayName: 'Local',
    type: 'checkbox',
    requiresValidation: false,
    validationMsg: '',
    minWidth: '60px',
    maxWidth: '100%'
  },
  isOutOfState: {
    controlId: 'isoutofstate',
    displayName: 'Out of State',
    type: 'checkbox',
    requiresValidation: false,
    validationMsg: '',
    minWidth: '60px',
    maxWidth: '100%'
  }
}