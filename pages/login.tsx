import React from "react";
import styles from "./index.module.css";

import LoginForm from "../components/LoginForm/LoginForm";

const Login = () => (
  <div className={styles.login}>
    <LoginForm />
  </div>
);

export default Login;
