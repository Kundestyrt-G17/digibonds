import React, { useState } from "react";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  withStyles,
} from "@material-ui/core";
import Link from "next/link";
import styles from "./alreadyVoted.module.css";

const GlobalCss = withStyles({
  "@global": {
    ".MuiFormControl-root": {
      paddingLeft: "30px",
    },
  },
})(() => null);

const AlreadyVoted = () => {
  const [value, setValue] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

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
                value="infavor"
                control={<Radio color="primary" />}
                label="I voted in favor of the proposed resolution"
              />
              <FormControlLabel
                value="disfavor"
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
          <Link
            href={{ pathname: "/submitted", query: { from: "alreadyVoted" } }}
          >
            <Button
              variant="contained"
              color="primary"
              disabled={!isChecked || value === ""}
            >
              Let us know
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AlreadyVoted;
