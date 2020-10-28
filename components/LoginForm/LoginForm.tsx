import React, { useState } from "react";
import style from "./LoginForm.module.css";
import Router from "next/router";

import { useForm } from "react-hook-form";
import { Button, TextField } from "@material-ui/core";
import { doPostFetch } from "../../hooks/fetchHooks";

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
  const { setUserData } = props;
  const { register, handleSubmit } = useForm();
  const [postAuthenticationError, setPostAuthenticationError] = useState<
    string
  >("");

  return (
    <div className={style.loginForm}>
      <h2 className={style.loginFormTitle}>Sign in</h2>
      <form
        onSubmit={handleSubmit(async (data) => {
          await doPostFetch<UserPost, UserFetch>("/login/authenticate", {
            username: data.username,
            password: data.password,
          })
            .then((response: any) => {
              setUserData(response);
              Router.push({
                pathname: "/",
              });
            })
            .catch((error: Error) => {
              setPostAuthenticationError(error.message);
            });
        })}
      >
        <TextField
          label="Username"
          variant="outlined"
          inputRef={register}
          fullWidth
          autoFocus
          margin="normal"
          name="username"
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
      {postAuthenticationError && (
        <p>{postAuthenticationError} Username and/or password may be wrong</p>
      )}
    </div>
  );
}
