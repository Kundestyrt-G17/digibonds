import React from "react";
import { Button, TextField } from "@material-ui/core";
import Meetings from "../components/Meeting/Meetings";
import AddIcon from "@material-ui/icons/Add";
import Link from "next/link";
import styles from "./meetings.module.css";

const MeetingsRoute = () => {
  return (
    <>
      <div className={styles.meetingsHeader}>
        <h1 style={{ width: "100%" }}>ACTIVE MEETINGS</h1>
        <TextField
          label="Search"
          variant="outlined"
          margin="normal"
          name="search"
          style={{ height: "50px", margin: "0" }}
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
      <Meetings />
    </>
  );
};

export default MeetingsRoute;
