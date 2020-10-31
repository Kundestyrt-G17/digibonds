import React from "react";

import Link from "next/link";

import { Button, TextField } from "@material-ui/core";

import styles from "./NoLongerOwnForm.module.css";

export default function NoLongerOwnForm() {
  return (
    <div className={styles.noLongerOwnForm}>
      <h3>Would you like to share who you have you sold your bonds to?</h3>
      <TextField label="Name" variant="outlined" name="name" />
      <div className={styles.noLongerOwnButton}>
        <Link href={{ pathname: "/submitted", query: { from: "noLongerOwn" } }}>
          <Button variant="outlined" color="primary">
            Would not like to share
          </Button>
        </Link>
        <Link href={{ pathname: "/submitted", query: { from: "noLongerOwn" } }}>
          <Button variant="contained" color="primary">
            Submit
          </Button>
        </Link>
      </div>
    </div>
  );
}
