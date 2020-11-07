import React, { useEffect, useState } from "react";
import { IVote } from "@/schemas/vote";

interface StatisticsProps {
  votes: IVote[];
  totalAmount: number;
}

export default function Statistics(props: StatisticsProps) {
  const { votes, totalAmount } = props;

  const [amount, setAmount] = useState<number>(0);

  const hasVoted = votes.filter((vote) => vote.favor !== "Not voted");

  const votedFavor = votes.filter((vote) => vote.favor === "Favor");
  const votedDisfavor = votes.filter((vote) => vote.favor === "Disfavor");
  const notVoted = votes.filter((vote) => vote.favor === "Not voted");

  function findAmount() {
    votedFavor.map((vote) => {
      setAmount(amount + vote.bondsOwned);
    });
  }

  useEffect(() => {
    findAmount();
  }, []);

  return (
    <div>
      <div>
        <h5 style={{ fontSize: "24px" }}>Attendance</h5>
        {amount / totalAmount}
      </div>
      <div>
        <h6>Voting result</h6>
      </div>
    </div>
  );
}
