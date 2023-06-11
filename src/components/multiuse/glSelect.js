

import styled from 'styled-components';
import {
  Form,
  Spinner,
} from 'react-bootstrap';

const StyledLink = styled.a`
  color: #15469d;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9em;
  line-height: 1.1em;
`

export default ({ options, value, onChange, controlIsValid, selectOptions }) => (
  <Form.Group 
    className='form-group'
    key={ options.controlId }
    controlId={ options.controlId }
    style={{
      minWidth: options.minWidth,
      maxWidth: options.maxWidth
    }}
  >
    <Form.Label>{ options.displayName }</Form.Label>
    <Form.Select 
      aria-label={ `${options.controlId}-select` }
      onChange={(e) => onChange(e, options)}
      value={ value || '' }
    >
      <option value="">{ options.defaultValue }</option>
      { selectOptions.map(l => (<option key={ l[options.valueKey] } value={ l[options.valueKey] }>{ l[options.displayKey] }</option>)) }
    </Form.Select>
    { controlIsValid(options, options.controlId)
      ? <Form.Text className="text-muted">&nbsp;</Form.Text>
      : <Form.Text className="text-muted">{ options.validationMsg }</Form.Text>
    }
  </Form.Group>
)
