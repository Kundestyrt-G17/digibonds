import React from "react";
import NoLongerOwnForm from "../components/NoLongerOwnForm/NoLongerOwnForm";
import styles from "./noLongerOwn.module.css";

const NoLongerOwn = () => {
  return (
    <div className={styles.noLongerOwnPage}>
      <h1>I have sold my bonds</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur
        adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      </p>
      <NoLongerOwnForm />
    </div>
  );
};

export default NoLongerOwn;
