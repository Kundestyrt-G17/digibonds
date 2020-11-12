import React, { useState, useEffect } from "react";
import styles from "./redirect.module.css";
import BallotForm from "../components/BallotForm/BallotForm";
import { IVote } from "../schemas/vote";
import {
  Stepper,
  Step,
  StepLabel,
  Typography,
  Button,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { useRouter } from "next/router";
import UploadPoH from "../components/UploadPoH/uploadPoH";
import Summary from "../components/Summary/summary";
import Signature from "../components/Signature/Signature";
import useSWR from "swr";
import { withIronSession } from "next-iron-session";
import Loading from "@/components/Loading";

const fetcher = (url) => fetch(url).then((res) => res.json());

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    backButton: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  })
);

function getSteps() {
  return ["Fill out ballot", "Upload Proof of Holding", "Summary", "Sign"];
}

const BallotPage = ({ user }) => {
  const router = useRouter();
  const { meetingId, voteId } = router.query;
  const [activeStep, setActiveStep] = useState(0);

  const { data: meeting, error: meetingError } = useSWR(
    `/api/meetings/${meetingId}`,
    fetcher
  );
  const { data: vote, error: voteError } = useSWR(
    `/api/votes/${voteId}`,
    fetcher
  );

  const [ballot, setBallot] = useState<IVote>(vote);
  const classes = useStyles();
  const steps = getSteps();

  useEffect(() => {
    setBallot(vote);
  }, [vote]);

  if (meetingError || voteError) return <div>failed to load</div>;
  if (!meeting || !vote) return <Loading />;

  const handleBack = (step: number) => {
    step === 0
      ? router.back()
      : setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const submitVote = async (ballot: IVote) => {
    const response = await fetch(`/api/votes/${ballot._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ballot),
    });
    if (response.ok) {
      router.push({ pathname: "/submitted", query: { from: "vote" } });
    }
  };

  function getStepContent(stepIndex: number) {
    switch (stepIndex) {
      case 0:
        return (
          <div className={styles.ballotPage}>
            <h1>{getSteps()[0]}</h1>
            {ballot && (
              <BallotForm
                ISIN={meeting.isin}
                ballot={ballot}
                setBallot={setBallot}
                setActiveStep={setActiveStep}
              />
            )}
          </div>
        );
      case 1:
        return (
          <>
            <h1 style={{ textAlign: "center" }}>{getSteps()[1]}</h1>
            <UploadPoH
              setActiveStep={setActiveStep}
              setBallot={setBallot}
              ballot={ballot}
            />
          </>
        );
      case 2:
        return (
          <>
            <h1 style={{ textAlign: "center" }}>{getSteps()[2]}</h1>
            <Summary
              setActiveStep={setActiveStep}
              isin={meeting.isin}
              ballot={ballot}
              submitVote={submitVote}
              alreadyVoted={false}
            />
          </>
        );

      case 3:
        return (
          <>
            <h1 style={{ textAlign: "center" }}>{getSteps()[3]}</h1>
            <Signature
              isin={meeting.isin}
              ballot={ballot}
              submitVote={submitVote}
            />
          </>
        );


      default:
        return "Unknown stepIndex";
    }
  }

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed
            </Typography>
          </div>
        ) : (
          <div>
            <Button
              onClick={() => handleBack(activeStep)}
              className={classes.backButton}
            >
              <ArrowBackIosIcon />
              Back
            </Button>
            <Typography className={classes.instructions}>
              {getStepContent(activeStep)}
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
};

export default BallotPage;

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
