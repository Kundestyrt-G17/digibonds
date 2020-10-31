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

  return (
    <div className={style.loginForm}>
      <h2 className={style.loginFormTitle}>Sign in</h2>
      <form
        onSubmit={handleSubmit(async (data) => {
          setError("");
          const email = data.email;
          const password = data.password;

          const response = await fetch("/api/authenticate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });

          if (response.ok) {
            return router.push("/");
          } else {
            setError("Wrong username or password");
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
      <h4 style={{ color: "red" }}>{error}</h4>
    </div>
  );
}
