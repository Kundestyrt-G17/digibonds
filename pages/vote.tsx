import React, { useState } from "react";
import { VotePageType } from "../utils/types";

import BallotForm from "../components/BallotForm/BallotForm";
import { Vote } from "../utils/interfaces";
import styles from "./vote.module.css";

import { Button } from "@material-ui/core";

import Link from "next/link";

const BallotPage = () => {
  const [filledOutVote, setFilledOutVote] = useState<Vote>();
  const [votePage, setVotePage] = useState<VotePageType>("Ballot");

  const changePage = () => {
    switch (votePage) {
      case "Ballot":
        return (
          <>
            <h1>Fill out ballot </h1>
            <BallotForm
              ISIN={"134572311622 233223"}
              setFilledOutVote={setFilledOutVote}
              setVotePage={setVotePage}
              filledOutVote={
                filledOutVote
                  ? filledOutVote
                  : {
                      ISIN: "134572311622 233223",
                      company: "YourCompany AS",
                      bondsOwned: 200,
                      favor: "favor",
                      hasCustodian: "yes",
                      checked: true,
                      phoneNumber: 4545454545,
                      custodianName: "LALALALA",
                      accountNumber: 8989898989,
                    }
              }
            />
          </>
        );
      case "PoH":
        return (
          <>
            <p>
              PoH <span>{filledOutVote?.custodianName}</span>
            </p>

            <Link href={{ pathname: "/submitted", query: { from: "vote" } }}>
              <Button variant="contained" color="primary">
                Submit
              </Button>
            </Link>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setVotePage("Ballot")}
            >
              Back
            </Button>
          </>
        );
    }
  };

  return <div className={styles.ballotPage}>{changePage()}</div>;
};

export default BallotPage;
