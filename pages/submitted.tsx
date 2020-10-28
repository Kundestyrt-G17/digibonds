import React from "react";
import { useRouter } from "next/router";
import styles from "./submitted.module.css";

const Submitted = () => {
  const router = useRouter();
  function renderCorrectPage() {
    switch (router.query.from) {
      case "vote":
        return <p>Thanks for voting</p>;
      case "noLongerOwn":
        return <p>Thanks for letting us know that you sold your bonds</p>;
      case "alreadyVoted":
        return <p>Thanks for letting us know who you voted for</p>;
      case "":
        return;
    }
  }

  return (
    <div className={styles.submittedPage}>
      <h1>Thank you!</h1>
      {renderCorrectPage()}
      <img
        style={{ display: "flex", alignSelf: "center", margin: "50px auto" }}
        src="/submitted.png"
        width="330px"
        alt="vote_img"
      />
    </div>
  );
};

export default Submitted;
