import React, { useMemo } from 'react';
import { useTable } from 'react-table';
import { useRouter } from 'next/router';
import styles from '@/components/Meeting/Meetings.module.css';
import { IVote } from '@/schemas/vote';

interface InvestorTableProps {
  votes: IVote[];
  totalAmount: number;
}


export default function InvestorTable(props: InvestorTableProps) {
  const data = useMemo(() => props.votes, [props.votes]);
  const columns = useMemo(
    () => [
      {
        Header: 'Comapny',
        accessor: 'company.name',
      },
      {
        Header: 'Amount (NOK)',
        accessor: 'amount',
      },
      {
        id: 'percentage',
        Header: 'Amount (%)',
        accessor: (vote) => {
          console.log(vote.amount, props.totalAmount);
          return (vote.amount / props.totalAmount * 100).toPrecision(2) + "%";
        },
      },
      {
        id: 'voted',
        Header: 'Voted',
        accessor: vote => {
          if (vote.voted === null) {
            return 'Unknown';
          } else {
            return vote.voted ? 'Favor' : 'Disfavor';
          }
        },
      },
      {
        Header: 'Proof of Holding',
        accessor: 'pohStatus',
      },

    ],
    [],
  );

  const tableInstance = useTable<any>({ columns, data });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  const router = useRouter();
  const handleRowClick = (row: any) => {
  };

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
            onClick={() => handleRowClick(row)}
            className={styles.tableRow}
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