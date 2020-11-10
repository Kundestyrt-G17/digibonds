import React from "react";
import Summary from "@/components/Summary/summary";
import { useRouter } from "next/router";
import useSWR from "swr";
import { IVote } from "@/schemas/vote";
import { IMeeting } from "@/schemas/meeting";
import { CircularProgress } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { withIronSession } from "next-iron-session";

const fetcher = (url) => fetch(url).then((res) => res.json());

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backButton: {
      marginRight: theme.spacing(1),
    },
  })
);

const AlreadyVotedSummary = ({ user }) => {
  const router = useRouter();
  const { meetingId, id } = router.query;
  const classes = useStyles();

  const { data: vote, error: voteError } = useSWR<IVote>(
    `/api/votes/${id}`,
    fetcher
  );

  const { data: meeting, error: meetingError } = useSWR<IMeeting>(
    `/api/meetings/${meetingId}`,
    fetcher
  );

  if (voteError) return <div>Failed to Load</div>;
  if (!vote) return <CircularProgress />;

  if (meetingError) return <div>Failed to Load</div>;
  if (!meeting) return <CircularProgress />;

  return (
    <div>
      <Button onClick={() => router.back()} className={classes.backButton}>
        <ArrowBackIosIcon />
        Back
      </Button>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2 style={{ fontSize: "36px", marginBottom: "30px" }}>Summary</h2>
        <Summary isin={meeting.isin} ballot={vote} alreadyVoted={true} />
      </div>
    </div>
  );
};

export default AlreadyVotedSummary;

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
