import React from "react";
import styles from "./index.module.css";

import LoginForm, { UserFetch } from "../components/LoginForm/LoginForm";

interface Props {
  setUserData: (userFetch: UserFetch) => void;
}

const Login = (props: Props) => (
  <div className={styles.login}>
    <LoginForm setUserData={props.setUserData} />
  </div>
);

export default Login;
