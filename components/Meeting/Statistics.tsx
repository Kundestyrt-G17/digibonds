import React, { useEffect, useState } from "react";
import { IVote } from "@/schemas/vote";
import { Chart } from "react-charts";
import { VoteFavorType } from "@/utils/types";
import AttendanceBar from "@/components/Meeting/AttendanceBar";

interface StatisticsProps {
  votes: IVote[];
  totalBonds: number;
}

export default function Statistics(props: StatisticsProps) {
  const { votes, totalBonds } = props;

  const hasVoted = votes.filter((vote) => vote.favor !== "Not voted");
  const votedBondsOwned = hasVoted.reduce((a, b: IVote) => a + b.bondsOwned, 0);

  const attendance = Number((votedBondsOwned / totalBonds).toPrecision(3));

  function getAmountBonds(type: VoteFavorType): number {
    return (
      (votes
        .filter((vote) => vote.favor === type)
        .reduce((a, b: IVote) => a + b.bondsOwned, 0) /
        totalBonds) *
      100
    );
  }

  const series = React.useMemo(
    () => ({
      type: "bar",
    }),
    []
  );
  const axes = React.useMemo(
    () => [
      { primary: true, type: "ordinal", position: "bottom" },
      {
        position: "left",
        type: "linear",
        stacked: false,
        hardMax: 100,
        format: (num) => `${num}%`,
      },
    ],
    []
  );

  const data = React.useMemo(
    () => [
      {
        label: "In favor",
        data: [
          { x: "In favor", y: getAmountBonds("In favor") },
          { x: "In disfavor", y: getAmountBonds("In disfavor") },
          { x: "Not yet voted", y: getAmountBonds("Not voted") },
          { x: "Unknown", y: getAmountBonds("Unknown") },
        ],
      },
    ],
    [votes]
  );

  return (
    <div>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "12px",
            alignContent: "flex-end",
          }}
        >
          <h5 style={{ fontSize: "24px", margin: "0" }}>Attendance</h5>
          <p style={{ margin: 0, fontFamily: "Roboto Condensed" }}>
            Total:{" "}
            {Number(totalBonds).toLocaleString(
              undefined, // leave undefined to use the browser's locale,
              // or use a string like 'en-US' to override it.
              { minimumFractionDigits: 2 }
            )}{" "}
            NOK
          </p>
        </div>
        <AttendanceBar attendance={attendance} />
      </div>
      <div>
        <h6 style={{ fontSize: "24px" }}>Voting result</h6>
        <div
          style={{
            width: "400px",
            height: "300px",
          }}
        >
          <Chart series={series} axes={axes} data={data} datums={6} />
        </div>
      </div>
    </div>
  );
}
