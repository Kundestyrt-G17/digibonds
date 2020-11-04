import React, { useMemo } from "react";
import { useRouter } from "next/router";
import { useTable } from "react-table";
import styles from "./Meetings.module.css";
import { IMeeting } from "schemas/meeting";

interface MeetingsProps {
  meetings: IMeeting[];
}

const Meetings = (props: MeetingsProps) => {
  console.log(props.meetings);
  const data = useMemo(() => props.meetings, [props.meetings]);
  const columns = useMemo(
    () => [
      {
        Header: "Meeting Name",
        accessor: "meetingName",
      },
      {
        Header: "ISIN",
        accessor: "isin",
      },
      {
        Header: "Total Bonds",
        accessor: "totalBonds",
      },
      {
        Header: "Date",
        accessor: "date",
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

  const router = useRouter();
  const handleRowClick = (row: any) => {
    router.push(`/meetings/${row.original._id}`);
  };

  return (
    <table {...getTableProps()} style={{ borderSpacing: 0, width: "100%" }}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()} className={styles.tableHeader}>
                {column.render("Header")}
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
                    {cell.render("Cell")}
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

export default Meetings;
