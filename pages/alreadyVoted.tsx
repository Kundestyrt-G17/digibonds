import React, { useState } from "react";
import {
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  withStyles,
} from "@material-ui/core";
import styles from "./alreadyVoted.module.css";
import useSWR from "swr";
import { useRouter } from "next/router";
import { VoteFavorType } from "@/utils/types";
import { withIronSession } from "next-iron-session";

const fetcher = (url) => fetch(url).then((res) => res.json());

const GlobalCss = withStyles({
  "@global": {
    ".MuiFormControl-root": {
      paddingLeft: "30px",
    },
  },
})(() => null);

const AlreadyVoted = ({ user }) => {
  const [value, setValue] = useState<VoteFavorType | string>("");
  const [isChecked, setIsChecked] = useState(false);

  const router = useRouter();
  const { voteId } = router.query;

  const { data: vote, error: voteError } = useSWR(
    `/api/votes/${voteId}`,
    fetcher
  );

  if (voteError) return <div>failed to load</div>;
  if (!vote) return <CircularProgress />;

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    // @ts-ignore
    setValue(e.currentTarget.value);
  };

  async function handleSubmit() {
    const favor: VoteFavorType | string = isChecked ? value : "Unknown";
    const response = await fetch(`/api/votes/${vote._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...vote, favor }),
    });
    if (response.ok) {
      router.push({ pathname: "/submitted", query: { from: "alreadyVoted" } });
    }
  }

  return (
    <div className={styles.alreadyVotedPage}>
      <h2 className={styles.alreadyVotedPageTitle}>THANK YOU FOR VOTING</h2>
      <div className={styles.alreadyVotedPageBody}>
        <div className={styles.alreadyVotedPageParagraph}>
          <h3>Would you like to let DigiVote know what you voted?</h3>
          <GlobalCss />
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="vote"
              name="vote1"
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel
                value="In favor"
                control={<Radio color="primary" />}
                label="I voted in favor of the proposed resolution"
              />
              <FormControlLabel
                value="In disfavor"
                control={<Radio color="primary" />}
                label="I voted in disfavor of the proposed resolution"
              />
            </RadioGroup>
          </FormControl>
        </div>
        <FormControlLabel
          className={styles.alreadyVotedPageCheck}
          control={
            <Checkbox
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
              color="primary"
            />
          }
          label="The company allows their responsible broker to get insight in voting choice"
        />
        <div className={styles.alreadyVotedPageButton}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={value === ""}
          >
            Let us know
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AlreadyVoted;

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
