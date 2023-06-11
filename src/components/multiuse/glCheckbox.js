

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

export default ({ options, value, onChange }) => (
  <Form.Group
    className='form-group'
    style={{ 
      minWidth: options.minWidth,
      maxWidth: options.maxWidth,
      }}
    key={ options.controlId }
    controlId={ options.controlId }
  >
    <Form.Check 
      type="checkbox" 
      label={ options.displayName } 
      checked={ value || false } 
      onChange={ (e) => onChange(e, options) }
    />
  </Form.Group>
)
