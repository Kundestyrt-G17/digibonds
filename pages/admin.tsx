import React, { useState } from "react";
import Companies from "@/components/Admin/Companies";
import Brokers from "@/components/Admin/Brokers";
import cx from "classnames";
import useSWR from "swr";

import styles from "./admin.module.css";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function admin() {
  const [showingCompanies, setShowingCompanies] = useState<boolean>(true);

  const { data, error, mutate } = useSWR("/api/users", fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const brokers = data.filter((user) => {
    return user.isBroker;
  });

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          boxShadow: "0px 1px 0px 0px #000000",
        }}
      >
        <h1>Admin</h1>
        <div className={styles.tabs}>
          {console.log(showingCompanies)}
          <button
            className={cx(
              styles.tabButton,
              showingCompanies ? styles.active : ""
            )}
            onClick={() => setShowingCompanies(true)}
          >
            Companies
          </button>
          <button
            className={cx(
              styles.tabButton,
              !showingCompanies ? styles.active : ""
            )}
            onClick={() => setShowingCompanies(false)}
          >
            Brokers
          </button>
        </div>
      </div>
      {showingCompanies ? (
        <Companies brokers={brokers} />
      ) : (
        <Brokers brokers={brokers} mutate={mutate} />
      )}
    </div>
  );
}
