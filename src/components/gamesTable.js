import { useTable } from 'react-table';
import React from 'react';
 
const displayResult = (result) => {
  switch (result) {
    case 'win': 
      return 'W';
    case 'loss':
      return 'L'
    case 'tie':
    case 'draw':
      return 'D';
    default:
      return '';
  }
}

var options = { month: 'short', day: 'numeric' }

const displayDate = (dateAsISOString) => {

  const date = new Date(dateAsISOString);
  return date.toLocaleDateString('en-US', options)
}

function GamesTable(props) {

const { data } = props;

  const columns = React.useMemo(
    () => [
      {
        Header: 'Date',
        minWidth: 75,
        accessor: (row, i) => displayDate(row.startTime),
      },
      {
        Header: 'Team',
        accessor: 'opposingTeamName',
      },
      {
        Header: 'Score',
        minWidth: 60,
        accessor: (row, i) => `${row.score} - ${row.opposingTeamScore}`,
      },
      {
        Header: 'W/L',
        minWidth: 50,
        accessor: (row, i) => displayResult(row.outcome),
      }
    ],
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data })

  return (
    <table {...getTableProps()} style={{ border: 'solid 1px blue', width: '100%' }}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th
              {...column.getHeaderProps()}
              style={{
                background: 'aliceblue',
                color: 'black',
                fontWeight: 'bold',
                minWidth: column.minWidth
              }}
            >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      padding: '10px',
                      border: 'solid 1px gray',
                    }}
                  >
                    {cell.render('Cell')}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default GamesTable