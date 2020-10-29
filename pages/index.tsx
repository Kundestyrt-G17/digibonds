import React, { useEffect } from "react";
import styles from "./index.module.css";
import { withIronSession } from "next-iron-session";
import { useRouter } from "next/router";
import Meetings from "../components/Meeting/Meetings";
import MeetingsBondholder from "../components/Meeting/MeetingsBondholder";
import { Button, InputAdornment, TextField } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";
import Link from "next/link";
import useSWR from "swr";
const fetcher = (url) => fetch(url).then((res) => res.json());

const Index = ({ user }) => {
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  });
  if (!user) return <div>Loading</div>;
  console.log(user);

  const { data, error } = useSWR("/api/meetings", fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <>
      <div className={styles.meetingsHeader}>
        <h1 style={{ width: "100%" }}>ACTIVE MEETINGS</h1>
        {user?.broker && (
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
        )}
        {user?.broker && (
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
        )}
      </div>
      <div className={styles.welcomePage}>
        {user?.broker ? (
          <Meetings meetings={data} />
        ) : (
          <MeetingsBondholder meetings={data} user={user} />
        )}
      </div>
    </>
  );
};

export default Index;

export const getServerSideProps = withIronSession(
  async ({ req, res }) => {
    const user = req.session.get("user");

    if (!user) {
      return { props: {} };
    }

    return {
      props: { user },
    };
  },
  {
    cookieName: "AUTH_COOKIE",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production" ? true : false,
    },
    password: process.env.APPLICATION_SECRET,
  }
);
