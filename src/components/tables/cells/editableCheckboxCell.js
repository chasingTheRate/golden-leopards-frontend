import React from 'react'
import styled from 'styled-components'
import { useFlexLayout, useBlockLayout, useTable } from 'react-table'
import {
  Container,
  Button,
  Modal,
  Form,
  Spinner
} from 'react-bootstrap';

const EditableCheckboxCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData, // This is a custom function that we supplied to our table instance
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue)

  const onChange = e => {
    updateMyData(index, id, !value)
    setValue(!value)
  }

  // If the initialValue is changed external, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  return (
    <div className='checkbox-wrap'>   
      <Form.Check type='checkbox' id={`check-api-checkbox-${id}`}>
        <Form.Check.Input type='checkbox' checked={value} onChange={ onChange }/>
      </Form.Check>     
    </div>)
}

export default EditableCheckboxCell;