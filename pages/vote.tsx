import React from "react";
import { Button } from "@material-ui/core";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./vote.module.css";
import useSWR from "swr";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";

const fetcher = (url) => fetch(url).then((res) => res.json());

const VotesRoute = () => {
  const router = useRouter();

  const { meetingId, voteId } = router.query;

  const { data: meeting = false, error: meetingError } = useSWR(
    `/api/meetings/${meetingId}`,
    fetcher
  );
  const { data: vote = false, error: voteError } = useSWR(
    `/api/votes/${voteId}`,
    fetcher
  );

  if (meetingError || voteError) return <div>failed to load</div>;
  if (!meeting || !vote) return <div>loading...</div>;

  //   const signicatRedirect = () => {
  //     window.location.href =
  //       "https://login-test.signicat.io/connect/authorize?response_type=code&scope=openid+profile&client_id=ta3c5289814a3422b961cd596e4980e4c&redirect_uri=http://localhost:5000/redirect&state=123";
  //   };
  //

  return (
    <>
      <div className={styles.welcomePage}>
        <h1>{meeting.meetingName}</h1>
        <h3>{meeting.isin}</h3>
        <hr />
        <div style={{ textAlign: "justify" }}>
          <h3>SUMMONS TO BONDHOLDERS' MEETING</h3>
          Nordic Trustee AS acts as bond trustee (the "Bond Trustee") for the
          holders of bonds (the "Bonds") in the above-mentioned bond issues
          (each a "Bond Issue" and together the "Bond Issues") issued by
          Norwegian Air Shuttle ASA (the "Issuer" or the "Company").
          <br />
          Unless otherwise stated herein, all capitalised terms used herein
          shall have the meaning ascribed to them in (i) the bond terms for
          NAS07 dated 9 December 2015 (as later amended and restated), (ii) the
          bond terms for NAS09 dated 7 February 2017 (as later amended and
          restated), (iii) the bond terms for NAS09 dated 16 November 2017 and
          (iv) the bond terms for the CB dated 13 November 2019, each of which
          are entered into between the Bond Trustee and the Issuer (the "Bond
          Terms"). References to clauses and paragraphs are references to
          clauses and paragraphs of the relevant Bond Terms.
        </div>
        <Button
          startIcon={<PictureAsPdfIcon />}
          style={{ display: "flex", alignSelf: "center", margin: "20px" }}
          href=".pdf"
        >
          <a download={`${meeting.isin}.pdf`} href={meeting.summons}>
            Download summons
          </a>
        </Button>
        <img
          style={{ display: "flex", alignSelf: "center", margin: "50px auto" }}
          src="/voting.png"
          width="330px"
          alt="vote_img"
        />
        <div className={styles.welcomePageButtons}>
          <Link
            href={{
              pathname: "/alreadyVoted",
              query: { meetingId, voteId },
            }}
          >
            <Button variant="outlined" color="primary">
              Already voted
            </Button>
          </Link>
          <Link
            href={{
              pathname: "/noLongerOwned",
              query: { meetingId, voteId },
            }}
          >
            <Button variant="outlined" color="primary">
              No longer own my bonds
            </Button>
          </Link>
          <Link
            href={{
              pathname: "/redirect",
              query: { meetingId, voteId },
            }}
          >
            <Button variant="contained" color="primary">
              Vote now
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default VotesRoute;
