import React, { useMemo } from 'react';
import { useTable } from 'react-table';
import { useHistory } from 'react-router-dom';

import './index.css';

const Meeting = () => {
  const data = React.useMemo(
    () => [
      {
        id: 0,
        name: 'Norwegian Air Meeting',
        isin: '1237hfjh33hf32j',
        votes: '71%',
        date: '20.02.20',
      },
      {
        id: 1,
        name: 'Norwegian Air Meeting',
        isin: '1237hfjh33hf32j',
        votes: '65%',
        date: '20.02.20',
      },
      {
        id: 2,
        name: 'Norwegian Air Meeting',
        isin: '1237hfjh33hf32j',
        votes: '40%',
        date: '20.02.20',
      },
      {
        id: 3,
        name: 'Norwegian Air Meeting',
        isin: '1237hfjh33hf32j',
        votes: '13%',
        date: '20.02.20',
      },
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: 'Meeting Name',
        accessor: 'name',
      },
      {
        Header: 'ISIN',
        accessor: 'isin',
      },
      {
        Header: 'Votes',
        accessor: 'votes',
      },
      {
        Header: 'Date',
        accessor: 'date',
      },
    ],
    []
  );
  const tableInstance = useTable<any>({ columns, data });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  const history = useHistory();
  const handleRowClick = (row: any) => {
    history.push(`/meetings/${row.id}`);
  };

  return (
    <table {...getTableProps()} style={{ borderSpacing: 0, width: '100%' }}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                style={{
                  height: '50px',
                  background: '#144781',
                  color: 'white',
                }}
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} onClick={() => handleRowClick(row)}>
              {row.cells.map((cell) => {
                return (
                  <td {...cell.getCellProps()} style={{ padding: '20px' }}>
                    {cell.render('Cell')}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Meeting;
