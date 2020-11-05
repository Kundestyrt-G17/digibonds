import React, { useMemo } from 'react';
import { IUser } from '@/schemas/user';
import { useTable } from 'react-table';
import styles from '@/components/Meeting/Meetings.module.css';
import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';


interface BrokerTableProps {
  users: IUser[];
  edit: (data) => void;
  handleDelete: (data) => void;
  isBondholderTable: boolean;
}

export default function UserTable(props: BrokerTableProps) {
  const data = useMemo(() => props.users, [props.users]);

  let columns;

  if(props.isBondholderTable){
    columns = useMemo(
      () => [
        {
          Header: 'Brokers Name',
          accessor: 'name',
        },
        {
          Header: 'Email',
          accessor: 'email',
        },
        {
          Header: 'Phone Number',
          accessor: 'phone',
        },
        {
          Header: 'Responsible Broker',
          accessor: 'broker.name',
        },
        {
          id: 'buttons',
          Header: '',
          accessor: (d) => {
            return (
              <div><IconButton onClick={() => props.edit(d)}><EditIcon/></IconButton><IconButton
                onClick={() => props.handleDelete(d)}><DeleteIcon/></IconButton></div>);
          },
        },
      ],
      [],
    );
  } else {
    columns = useMemo(
      () => [
        {
          Header: 'Brokers Name',
          accessor: 'name',
        },
        {
          Header: 'Email',
          accessor: 'email',
        },
        {
          Header: 'Phone Number',
          accessor: 'phone',
        },
        {
          id: 'buttons',
          Header: '',
          accessor: (d) => {
            return (
              <div><IconButton onClick={() => props.edit(d)}><EditIcon/></IconButton><IconButton
                onClick={() => props.handleDelete(d)}><DeleteIcon/></IconButton></div>);
          },
        },
      ],
      [],
    );
  }

  const tableInstance = useTable<any>({ columns, data });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;


  return (
    <table {...getTableProps()} style={{ borderSpacing: 0, width: '100%' }}>
      <thead>
      {headerGroups.map((headerGroup) => (
        <tr {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map((column) => (
            <th {...column.getHeaderProps()} className={styles.tableHeader}>
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
          <tr
            {...row.getRowProps()}
          >
            {row.cells.map((cell) => {
              return (
                <td {...cell.getCellProps()} className={styles.tableCell}>
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
}