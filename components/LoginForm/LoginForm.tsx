import React, { useState } from "react";
import style from "./LoginForm.module.css";

import { useForm } from "react-hook-form";
import { Button, TextField } from "@material-ui/core";
import { useRouter } from "next/router";

export interface UserPost {
  username: string;
  password: string;
}

export interface UserFetch {
  jwt: string;
  user: {
    id: number;
    username: string;
    isBroker: boolean;
  };
}

export default function LoginForm() {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const signicatRedirect = () => {
    window.location.href =
     "https://login-test.signicat.io/connect/authorize?response_type=code&scope=openid+profile&client_id=ta3c5289814a3422b961cd596e4980e4c&redirect_uri=http://localhost:5000&state=123";
  };

  return (
    <div className={style.loginForm}>
      <h2 className={style.loginFormTitle}>Sign in</h2>
      <form
        onSubmit={handleSubmit(async (data) => {
          setError("");
          const email = data.email;
          const password = data.password;
          let isBroker;

          await fetch("/api/authenticate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          }).then(function(response){
              if (!response.ok) {
                  setError("Wrong username or password");
                  // return router.push("/");
              } else {
                  // return router.push("/");
                  return response.json();
              }
          }).then((data => {
              if (!error){
                  if (!data) {
                      // BankID login disabled for demonstration
                      // signicatRedirect();
                      router.push("/");
                  } else {
                      router.push("/");
                  }
              }

          }));
        })}
      >
        <TextField
          label="Email"
          variant="outlined"
          inputRef={register}
          fullWidth
          autoFocus
          margin="normal"
          name="email"
        />
        <TextField
          label="Password"
          variant="outlined"
          inputRef={register}
          fullWidth
          margin="normal"
          type="password"
          name="password"
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          color="primary"
          className={style.loginFormButton}
        >
          Sign In
        </Button>
      </form>
      <h4 style={{ color: "red" }}>{error}</h4>
    </div>
  );
}
