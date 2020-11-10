import React, { useEffect } from "react";
import { Button } from "@material-ui/core";
import Link from "next/link";
import styles from "./Header.module.css";
import { useRouter } from "next/router";
import { withIronSession } from "next-iron-session";

const Header = ({ user }) => {
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user]);

  console.log(user);

  const logOut = async () =>
    await fetch("/api/authenticate", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }).then(() => router.push("/login"));

  return (
    <div className={styles.header}>
      <Link href="/">
        <h1 className={styles.title}>DigiVote</h1>
      </Link>
      {user && (
        <div className={styles.settings}>
          {user?.isBroker ? <Link href="/admin">Admin </Link> : ""}
          {user?.isBroker ? "Megler: " : ""}
          {user?.name}
          <Button variant="contained" color="primary" onClick={() => logOut()}>
            Logout
          </Button>
        </div>
      )}
    </div>
  );
};

export default Header;

export const getServerSideProps = withIronSession(
  async ({ req, res }) => {
    const user = req.session.get("user");

    console.log(user);
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
    password: "asdfasdfadsfadsf",
  }
);
