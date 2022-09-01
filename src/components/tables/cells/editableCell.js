import React from 'react'
import styled from 'styled-components'
import { useFlexLayout, useBlockLayout, useTable } from 'react-table'


const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData, // This is a custom function that we supplied to our table instance
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue || 0)

  const onChange = e => {
    let value = 0;

    try {
      value = Number.parseInt(e.target.value);
    } catch (e) {
      // Do Nothing
    }
    setValue(value)
  }

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    updateMyData(index, id, value)
  }

  // If the initialValue is changed external, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue || 0)
  }, [initialValue])

  return <input type="number" value={value} onChange={onChange} onBlur={onBlur} />
}

export default EditableCell;