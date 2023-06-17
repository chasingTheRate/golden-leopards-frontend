import React, { useState, useEffect, useRef } from "react";
import { useTable, useSortBy } from 'react-table';

function GLPlayerGameStatsTable({data = [], columns, onRowClick}) {

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    { 
      columns, 
      data
    },
    useSortBy
  )

  return (
    <table {...getTableProps()} style={{ borderTop: 'solid 1px #d1d2d3'}}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                style={{
                  borderBottom: 'solid 1px #d1d2d3',
                  color: '#15469d',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  fontSize: 'x-small',
                  width: column.width,
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
            <tr {...row.getRowProps()}
              onClick={() => onRowClick(row.original)}
              className="clickable-row"
            >
              {row.cells.map(cell => {
                return (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      padding: '10px',
                      borderBottom: 'solid 1px #d1d2d3',
                      textAlign: 'center',
                      fontSize: 'small',
                      color: 'rgb(75,75,75)',
                      fontWeight: '500',
                      lineHeight: .5
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

export default GLPlayerGameStatsTable;
