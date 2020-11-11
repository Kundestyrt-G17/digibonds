import React, { useState } from "react";
import InvestorTable from "@/components/Meeting/InvestorTable";
import useSWR from "swr";
import { useRouter } from "next/router";
import styles from "./Meetings.module.css";
import { Button } from "@material-ui/core";
import { IMeeting } from "@/schemas/meeting";
import SearchFilter from "@/components/Meeting/SearchFilter";
import Statistics from "@/components/Meeting/Statistics";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

const fetcher = (url) => fetch(url).then((res) => res.json());

const Meeting = () => {
  const router = useRouter();
  const { data, error } = useSWR<IMeeting>(`/api${router.asPath}`, fetcher);
  const [search, setSearch] = useState("");
  const [checkboxStates, setCheckboxStates] = useState<{
    voted: boolean;
    poh: boolean;
  }>({
    voted: false,
    poh: false,
  });

  if (error) return <div>Failed to Load</div>;
  if (!data) return <div>Loading...</div>;

  const filterVotes = data.votes.filter((vote) => {
    if (checkboxStates.poh) {
      return vote.pohStatus === "Valid";
    }
    if (checkboxStates.voted) {
      return vote.favor !== "Not voted";
    }
    if (checkboxStates.voted && checkboxStates.poh) {
      return vote.favor !== "Not voted" && vote.pohStatus === "Valid";
    }
    return vote;
  });

  const searchVotes = filterVotes.filter((d) =>
    d.company.name.toLowerCase().includes(search.toLowerCase())
  );

  const date = new Date(data?.date);

  return (
    <div>
      <Button href={"/"}>
        <ArrowBackIosIcon />
        Back
      </Button>
      {error && (
        <p className={styles.errorMessage}>
          An error has occurred. Please contact the IT department.{" "}
          {error.message}
        </p>
      )}
      <div>
        <h1 style={{ fontSize: "24px" }}>Bondholder meeting for </h1>
        <div style={{ display: "flex", marginBottom: "36px" }}>
          <h2 style={{ fontSize: "60px", margin: "0" }}>{data?.meetingName}</h2>
          <h3
            style={{
              alignSelf: "flex-end",
              marginLeft: "36px",
              fontSize: "12px",
              color: "#737B81",
              fontFamily: "Roboto Condensed",
            }}
          >
            {`${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`}
          </h3>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <div>
          <h4 style={{ fontSize: "24px", margin: 0 }}>Votes</h4>
          <SearchFilter
            setSearch={setSearch}
            checked={checkboxStates}
            setCheckedStates={setCheckboxStates}
          />
          <InvestorTable
            votes={searchVotes}
            totalBonds={data.totalBonds}
            meeting={data}
          />
        </div>
        <Statistics votes={data.votes} totalBonds={data.totalBonds} />
      </div>
    </div>
  );
};

export default Meeting;
