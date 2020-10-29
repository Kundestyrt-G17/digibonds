import React from "react";
import { Button, InputAdornment, TextField } from "@material-ui/core";
import Meetings from "../components/Meeting/Meetings";
import AddIcon from "@material-ui/icons/Add";
import Link from "next/link";
import styles from "./meetings.module.css";
import SearchIcon from "@material-ui/icons/Search";
import useSWR from "swr";
const fetcher = (url) => fetch(url).then((res) => res.json());

const MeetingsRoute = () => {
  const { data, error } = useSWR("/api/meetings", fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <>
      <div className={styles.meetingsHeader}>
        <h1 style={{ width: "100%" }}>ACTIVE MEETINGS</h1>
        <TextField
          label="Search"
          variant="outlined"
          margin="normal"
          type="search"
          name="search"
          style={{ height: "50px", margin: "0" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Link href="/meetings/create">
          <Button
            variant="contained"
            color="primary"
            style={{ height: "50px" }}
            startIcon={<AddIcon />}
          >
            New Meeting
          </Button>
        </Link>
      </div>
      <Meetings meetings={data} />
    </>
  );
};

export default MeetingsRoute;
