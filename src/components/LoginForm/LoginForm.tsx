import React from 'react';
import './LoginForm.css';

import { useForm } from 'react-hook-form';
import { Button, TextField } from '@material-ui/core';

export default function LoginForm() {
  const { register, handleSubmit } = useForm();

  return (
    <div className="login-form">
      <h2 className="login-form_title">Sign in</h2>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
          //TODO: API stuff and authentication
        })}
      >
        <TextField
          label="Email Address"
          variant="outlined"
          inputRef={register}
          fullWidth
          autoFocus
          margin="normal"
          autoComplete="email"
          type="email"
          name="email"
        />
        <TextField
          label="Password"
          variant="outlined"
          inputRef={register}
          fullWidth
          autoFocus
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
    </div>
  );
}
