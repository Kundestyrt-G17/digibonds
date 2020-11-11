import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import Link from "next/link";
import styles from "./Header.module.css";
import { useRouter } from "next/router";
import { IUser } from "../../schemas/user";
import cx from "classnames";

interface Props {
  user: IUser;
}

const Header = (props: Props) => {
  const router = useRouter();
  const { user } = props;

  const activeAdmin = router.asPath.includes("admin");

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
          {user?.isBroker ? (
            <Link href="/admin">
              <a className={cx(styles.admin, activeAdmin ? styles.active : "")}>
                Admin
              </a>
            </Link>
          ) : (
            ""
          )}
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
