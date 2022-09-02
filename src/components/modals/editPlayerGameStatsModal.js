import React, { useState } from "react";
import {
  Button,
  Modal,
} from 'react-bootstrap';
import styled from 'styled-components';

import EditPlayerGameStatsTable from "../tables/editPlayerGameStatsTable";
import EditableCell from "../tables/cells/editableCell";
import EditableCheckboxCell from "../tables/cells/editableCheckboxCell";


const Styles = styled.div`
  /* This is required to make the table full-width */
  display: block;
  max-width: 100%;
  max-height: 300px;
  overflow-y: scroll;

  table {
    /* Make sure the inner table is always as wide as needed */
    width: 100%;
    border-spacing: 0;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      text-align: center;
      
      :last-child {
        border-right: 0;
      }

      .input-wrap input{
        width: 100%;
      }

      .checkbox-wrap input{
        vertical-align: middle;
      }
      
      input {
        font-size: 1rem;
        padding: 0;
        margin: 0;
        text-align: center;
      }
    }
  }

  .pagination {
    padding: 0.5rem;
  }
`

const EditPlayerGameStatsModal = ({modalRef, show, onHide, handleOnExit, onSubmit, roster, onExit }) => {

  const [data, setData] = useState(roster);

  React.useEffect(() => {
    setData(roster);
  }, [roster])

  const updateMyData = (rowIndex, columnId, value) => {
    setData(old =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          }
        }
        return row
      })
    )
  }

  const columns = React.useMemo(
    () => [
      {
        Header: 'Player',
        accessor: 'displayname',
        maxWidth: 75,
        width: 3,
      },
      {
        Header: 'P',
        accessor: 'played',
        maxWidth: 75,
        width: 1,
        Cell: EditableCheckboxCell
      },
      {
        Header: 'G',
        accessor: 'goals',
        width: 1,
        Cell: EditableCell
      },
      {
        Header: 'A',
        accessor: 'assists',
        width: 1,
        Cell: EditableCell
      },
      {
        Header: 'S',
        accessor: 'saves',
        width: 1,
        Cell: EditableCell
      },
      {
        Header: 'Tck',
        accessor: 'defensive_tackles',
        width: 1,
        Cell: EditableCell
      },
    ],
    []
  )

  return (
      <Modal
        show={ show }
        onHide= { onHide }
        onExit = { onExit }
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton closeVariant='white'>
          <Modal.Title>Edit Player Stats</Modal.Title>
        </Modal.Header>
        <Modal.Body ref={ modalRef }>
          <Styles>
            <EditPlayerGameStatsTable
              columns={ columns }
              data={ data }
              updateMyData= { updateMyData }
            ></EditPlayerGameStatsTable>
          </Styles>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={ (e) => onHide()}>
            Close
          </Button>
          <Button variant="primary" onClick={ (e) => onSubmit(data) }>OK</Button>
        </Modal.Footer>
      </Modal>
  );
}

export default EditPlayerGameStatsModal;
