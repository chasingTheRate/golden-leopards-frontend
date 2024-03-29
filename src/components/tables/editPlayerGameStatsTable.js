import React from 'react'
import { useFlexLayout, useTable } from 'react-table'

function EditPlayerGameStatsTable({ columns, data = [], updateMyData }) {


  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
    updateMyData
  }, useFlexLayout)

  // Render the UI for your table
  return (
    <table className='pgs-table' {...getTableProps()}>
      <thead style={{position: 'sticky', top: 0, zIndex: 10, backgroundColor: 'white'}}>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map(column => (
            <th
              {...column.getHeaderProps()}
            >
              {column.render('Header')}
            </th>
          ))}
        </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default EditPlayerGameStatsTable
