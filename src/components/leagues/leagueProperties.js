
export const defaultLeague = {
  name: '',
  displayname: '',
  year: '',
  type: 'season',
  scheduleurl: ''
}

export const leagueTypeOptions = [

  {
    value: 'season',
    displayName: 'Season'
  },
  {
    value: 'tournament',
    displayName: 'Tournament'
  },
  {
    value: 'friendly',
    displayName: 'Friendly'
  }
]

export default [
  {
    controlId: 'name',
    displayName: 'Name',
    type: 'text',
    requiresValidation: true,
    validationRegex: /^\s*\S+.*/,
    validationMsg: 'Required',
    minWidth: '100%',
    maxWidth: '100%'
  },
  {
    controlId: 'displayname',
    displayName: 'Display Name',
    type: 'text',
    validationRegex: /^\s*\S+.*/,
    requiresValidation: true,
    validationMsg: 'Required',
    minWidth: '100%',
    maxWidth: '100%'
  },
  {
    controlId: 'year',
    displayName: 'Year',
    type: 'text',
    validationRegex: /^\s*\S+.*/,
    requiresValidation: true,
    validationMsg: 'Required',
    minWidth: '100%',
    maxWidth: '100%'
  },
  {
    controlId: 'type',
    displayName: 'Type',
    type: 'select',
    defaultValue: 'Select League Type',
    values: 'leagueTypeOptions',
    valueKey: 'value',
    displayKey: 'displayName',
    requiresValidation: true,
    validationRegex: /^\s*\S+.*/,
    validationMsg: 'Required',
    minWidth: '100%',
    maxWidth: '100%'
  },
  {
    controlId: 'scheduleurl',
    displayName: 'Schedule URL',
    type: 'text',
    requiresValidation: false,
    validationMsg: 'Required',
    minWidth: '100%',
    maxWidth: '100%'
  }
]