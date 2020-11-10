import React from "react";
import { useRouter } from "next/router";
import styles from "./submitted.module.css";
import { withIronSession } from "next-iron-session";

const Submitted = ({ user }) => {
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
