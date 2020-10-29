import React from "react";
import { User } from "../../utils/interfaces";
import { Button } from "@material-ui/core";
import Link from "next/link";
import styles from "./Header.module.css";
import { useRouter } from "next/router";

interface Props {
  user: User;
}

const Header = (props: Props) => {
  const router = useRouter();

  const logOut = async () =>
    await fetch("/api/authenticate", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }).then(() => router.push("/login"));

  return (
    <div className={styles.header}>
      <Link href="/">
        <span className={styles.title}>Meglo</span>
      </Link>
      {props.user && (
        <div className={styles.settings}>
          {props.user?.broker ? "Megler: " : ""}
          {props.user?.name}
          <Button variant="contained" color="primary" onClick={() => logOut()}>
            Logout
          </Button>
        </div>
      )}
    </div>
  );
};

export default Header;
