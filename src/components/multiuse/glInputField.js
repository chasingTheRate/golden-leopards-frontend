

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

export default ({ options, getValue, value, onChange, controlIsValid }) => (
  <Form.Group
    className='form-group'
    key={ options.controlId }
    controlId={ options.controlId }
    style={{ 
      minWidth: options.minWidth,
      maxWidth: options.maxWidth,
      }}
  >
    <Form.Label className='form-label'>{ options.displayName }</Form.Label>
    <Form.Control className='form-control' type="text" value={ getValue(options.controlId) } onChange={ (e) => onChange(e, options) }/>
    { controlIsValid(options, options.controlId) 
      ? <Form.Text className="text-muted">&nbsp;</Form.Text>
      : <Form.Text className="text-muted">{ options.validationMsg }</Form.Text>
    }
  </Form.Group>
)
