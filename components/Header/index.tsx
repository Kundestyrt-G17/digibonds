import React from "react";
import { UserFetch } from "../LoginForm/LoginForm";
import { Button } from "@material-ui/core";
import Link from "next/link";
import styles from "./Header.module.css";

interface Props {
  userData: UserFetch | undefined;
  setUserData: (userFetch: UserFetch | undefined) => void;
}

const Header = (props: Props) => {
  return (
    <div className={styles.header}>
      <Link href="/">
        <span className={styles.title}>Meglo</span>
      </Link>
      <div>
        {props.userData && (
          <span>
            <h3>{props.userData?.user.username}</h3>
            <h5>{props.userData?.user.isBroker ? "megler" : ""}</h5>
            <Button onClick={() => props.setUserData(undefined)}>
              <Link href="/">LogOut</Link>
            </Button>
          </span>
        )}
      </div>
    </div>
  );
};

export default Header;
