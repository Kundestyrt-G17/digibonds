import React, { useState } from "react";
import style from "./LoginForm.module.css";
import Router from "next/router";

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

interface Props {
  setUserData: (userFetch: UserFetch) => void;
}

export default function LoginForm(props: Props) {
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  return (
    <div className={style.loginForm}>
      <h2 className={style.loginFormTitle}>Sign in</h2>
      <form
        onSubmit={handleSubmit(async (data) => {
          const email = data.email;
          const password = data.password;

          const response = await fetch("/api/authenticate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });

          if (response.ok) {
            return router.push("/");
          }
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
    </div>
  );
}
