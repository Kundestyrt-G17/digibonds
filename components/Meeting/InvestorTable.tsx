import React, { useMemo } from "react";
import { HeaderGroup, useSortBy, useTable } from "react-table";
import { useRouter } from "next/router";
import styles from "@/components/Meeting/Meetings.module.css";
import { IVote } from "@/schemas/vote";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { IMeeting } from "@/schemas/meeting";

interface InvestorTableProps {
  votes: IVote[];
  totalBonds: number;
  meeting: IMeeting;
}

export default function InvestorTable(props: InvestorTableProps) {
  const data = useMemo(() => props.votes, [props.votes]);
  const columns = useMemo(
    () => [
      {
        Header: "Company",
        accessor: "company.name",
      },
      {
        Header: "Amount (NOK)",
        accessor: "bondsOwned",
      },
      {
        id: "percentage",
        Header: "Amount (%)",
        accessor: (vote) => {
          return (
            ((vote.bondsOwned / props.totalBonds) * 100).toPrecision(3) + "%"
          );
        },
      },
      {
        Header: "Voted",
        accessor: "favor",
      },
      {
        id: "pohStatus",
        Header: "Proof of Holding",
        accessor: (d) => (
          <span style={{ display: "flex" }}>
            {d.pohStatus !== "-" ? (
              <FiberManualRecordIcon
                style={{
                  fill:
                    d.pohStatus === "Approved"
                      ? "#77CA9D"
                      : d.pohStatus === "Pending"
                      ? "#FFD07A"
                      : d.pohStatus === "Rejected"
                      ? "#FF5E5E"
                      : "",
                  alignSelf: "center",
                }}
              />
            ) : (
              ""
            )}
            <p>{d.pohStatus}</p>
          </span>
        ),
      },
    ],
    []
  );

  const tableInstance = useTable<any>({ columns, data }, useSortBy);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  const router = useRouter();
  const handleRowClick = (row: any) => {
    router.push({
      pathname: `/votes/${row.original._id}`,
      query: { meetingId: props.meeting._id },
    });
  };

  // @ts-ignore
  return (
    <>
      <table {...getTableProps()} style={{ borderSpacing: 0, width: "100%" }}>
        <thead>
          {headerGroups.map((headerGroup: any) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={styles.tableHeader}
                  style={{ padding: "5px 15px" }}
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <ArrowDropUpIcon />
                      ) : (
                        <ArrowDropDownIcon />
                      )
                    ) : (
                      ""
                    )}
                  </span>
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
    </>
  );
}
