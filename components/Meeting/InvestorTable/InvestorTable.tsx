import React, { useMemo } from "react";
import { useSortBy, useTable } from "react-table";
import { useRouter } from "next/router";
import styles from "@/components/Meeting/Meetings.module.css";
import { IVote } from "@/schemas/vote";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

interface InvestorTableProps {
  votes: IVote[];
  totalBonds: number;
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
        Header: "Proof of Holding",
        accessor: "pohStatus",
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
  const handleRowClick = (row: any) => {};

  return (
    <>
      <table {...getTableProps()} style={{ borderSpacing: 0, width: "100%" }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={styles.tableHeader}
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
