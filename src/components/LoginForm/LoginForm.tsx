import React, { useState } from 'react';
import './LoginForm.css';

import { useForm } from 'react-hook-form';
import { Button, TextField } from '@material-ui/core';
import { doPostFetch } from '../../hooks/fetchHooks';
import { useHistory } from 'react-router-dom';

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
  const history = useHistory();
  const [postAuthenticationError, setPostAuthenticationError] = useState<
    string
  >('');

  return (
    <div className="login-form">
      <h2 className="login-form_title">Sign in</h2>
      <form
        onSubmit={handleSubmit(async (data) => {
          await doPostFetch<UserPost, UserFetch>('/login/authenticate', {
            username: data.username,
            password: data.password,
          })
            .then((response) => {
              setUserData(response);
              history.push('/welcomepage');
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
          className="login-form_button"
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
