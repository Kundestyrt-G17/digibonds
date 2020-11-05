import React, { useMemo } from "react";

import { IMeeting } from "schemas/meeting";
import { IUser } from "@/schemas/user";

import { useTable } from "react-table";
import { useRouter } from "next/router";

import styles from "./Meetings.module.css";

interface MeetingsProps {
  meetings: IMeeting[];
  user: IUser;
}

const Meetings = (props: MeetingsProps) => {
  let matchedMeetings;
  let columns;
  let handleRowClick;

  const router = useRouter();

  if (props.user.isBroker) {
    matchedMeetings = props.meetings;
    columns = useMemo(
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
    handleRowClick = (row: any) => {
      router.push(`/meetings/${row.original._id}`);
    };
  } else {
    matchedMeetings = props.meetings.filter((m) => {
      return m.votes.some((vote) => vote.company === props.user.company);
    });
    columns = useMemo(
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
          id: "status",
          Header: "Status",
          accessor: (meeting: IMeeting) => {
            return meeting.votes.find((v) => v.company === props.user.company)
              .favor;
          },
        },
        {
          Header: "Date",
          accessor: "date",
        },
      ],
      []
    );
    handleRowClick = (row: any) => {
      const favor = row.original.votes.find(
        (v) => v.company === props.user.company
      ).favor;
      switch (favor) {
        case "Favor" || "Disfavor":
          console.log("TODO");
          break;
        case "Not voted":
          router.push(`/vote/?meeting=${row.original._id}`);
      }
    };
  }

  const data = useMemo(() => matchedMeetings, [props.meetings]);

  const tableInstance = useTable<any>({ columns, data });
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

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
