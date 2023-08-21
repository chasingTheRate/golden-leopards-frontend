import React, { useState, useEffect, useRef } from "react";
import { useTable, useSortBy } from 'react-table';

function GLPlayerGameStats({stats}) {

  const data = React.useMemo(
    () => stats,
    []
  )

  const columns = React.useMemo(
    () => [
      {
        Header: '',
        accessor: 'displayname',
      },
      {
        Header: 'Games',
        accessor: 'games_played',
      },
      {
        Header: 'Goals',
        accessor: 'goals',
      },
      {
        Header: 'Assists',
        accessor: 'assists'
      },
      {
        Header: 'Saves',
        accessor: 'saves'
      },
      {
        Header: 'Tackles',
        accessor: 'def_tackles'
      },
      {
        Header: 'AttackingTackles',
        accessor: 'attacking_tackles'
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
  } = useTable(
    { 
      columns, 
      data 
    },
    useSortBy
  )

  return (
    <div style={{ width: '100%', padding: '12px 12px 24px 12px'}}>
    <table {...getTableProps()} style={{ borderTop: 'solid 1px #d1d2d3', width: '100%' }}>
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
                  fontSize: 'x-small'
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
    </div>
  )
}

export default GLPlayerGameStats;
