import React from 'react';
import './index.css';
import { Button } from '@material-ui/core';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import { useHistory } from 'react-router';
import voteImage from '/Voting.png';

const WelcomePage = () => {
  const history = useHistory();
  function handleVoteNow() {
    history.push('/vote');
  }
  function handleNoLongerOwn() {
    history.push('/noLongerOwn');
  }

  return (
    <div className="welcome-page">
      <h1 className="welcome-page_title">NORWEGIAN BONDHOLDERS' MEETING</h1>
      <h1 className="welcome-page_title">ISIN: 134572311622 233223</h1>
      <div className="welcome-page_matter">
        <div className="welcome-page_body">
          <div className="welcome-page_paragraph">
            <h2>SUMMONS TO BONDHOLDERS' MEETING</h2>
            <h3>1 INTRODUCTION</h3>
            Nordic Trustee AS acts as bond trustee (the "Bond Trustee") for the
            holders of bonds (the "Bonds") in the above-mentioned bond issues
            (each a "Bond Issue" and together the "Bond Issues") issued by
            Norwegian Air Shuttle ASA (the "Issuer" or the "Company").
            <br />
            Unless otherwise stated herein, all capitalised terms used herein
            shall have the meaning ascribed to them in (i) the bond terms for
            NAS07 dated 9 December 2015 (as later amended and restated), (ii)
            the bond terms for NAS09 dated 7 February 2017 (as later amended and
            restated), (iii) the bond terms for NAS09 dated 16 November 2017 and
            (iv) the bond terms for the CB dated 13 November 2019, each of which
            are entered into between the Bond Trustee and the Issuer (the "Bond
            Terms"). References to clauses and paragraphs are references to
            clauses and paragraphs of the relevant Bond Terms...
          </div>

          <Button
            startIcon={<PictureAsPdfIcon />}
            className="welcome-page_summons"
            href=".pdf"
          >
            Download summons
          </Button>
          <div className="welcome-page_buttons">
            <Button variant="contained" color="primary" onClick={handleVoteNow}>
              Vote now
            </Button>
            <Button variant="outlined" color="primary" onClick={handleVoteNow}>
              Already voted
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleNoLongerOwn}
            >
              No longer own my bonds
            </Button>
          </div>
        </div>
        <div className="welcome-page_image">
          <img src="/Voting.png" width="330px" />
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
