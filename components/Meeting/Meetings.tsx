import React, { useMemo } from "react";

import { IMeeting } from "schemas/meeting";
import { IUser } from "@/schemas/user";
import { IVote } from "@/schemas/vote";

import { useTable } from "react-table";
import { useRouter } from "next/router";

import styles from "./Meetings.module.css";
import { VoteFavorType } from "@/utils/types";
import dateOptions from "@/utils/date";

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
          Header: "Issuing Company",
          accessor: "meetingName",
        },
        {
          Header: "ISIN",
          accessor: "isin",
        },
        {
          id: "votes",
          Header: "Attendance (%)",
          accessor: (d) =>
            `${(
              (d.votes
                .filter((vote) => vote.favor !== "Not voted")
                .reduce((a, b) => a + b.bondsOwned, 0) *
                100) /
              d.totalBonds
            ).toPrecision(3)}%`,
        },
        {
          id: "date",
          Header: "Date (Deadline)",
          accessor: (data) => {
            const date = new Date(data.date);
            return date.toLocaleDateString("en-UK", dateOptions);
          },
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
          Header: "Issuing Company",
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
          id: "date",
          Header: "Date (Deadline)",
          accessor: (data) => {
            const date = new Date(data.date);
            return date.toLocaleDateString("en-UK", dateOptions);
          },
        },
      ],
      []
    );
    handleRowClick = (row: any) => {
      const meeting = row.original;
      const vote: IVote = meeting.votes.find(
        (v: IVote) => v.company === props.user.company
      );

      switch (vote.favor) {
        case "In favor":
          router.push({
            pathname: `/summary/${vote._id}`,
            query: { meetingId: row.original._id },
          });
          break;
        case "In disfavor":
          router.push({
            pathname: `/summary/${vote._id}`,
            query: { meetingId: row.original._id },
          });
          break;
        case "Not voted":
          router.push(`/vote/?meetingId=${meeting._id}&voteId=${vote._id}`);
          break;
        default:
          break;
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
