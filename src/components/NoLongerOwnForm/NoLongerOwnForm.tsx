import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, TextField } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { submittedPageType } from '../../utils/types';
import './NoLongerOwnForm.css';

interface Props {
  setSubmitted: (submitted: submittedPageType) => void;
}

export default function NoLongerOwnForm(props: Props) {
  const { register, handleSubmit } = useForm();
  const history = useHistory();
  const { setSubmitted } = props;

  useEffect(() => {
    setSubmitted('sold');
  });

  return (
    <div className="no-longer-own-form">
      <h2>Who have you sold the bonds to?</h2>
      <form
        onSubmit={handleSubmit((data) => {
          history.push('/submitted');
        })}
      >
        <TextField
          label="Name"
          variant="outlined"
          inputRef={register}
          name="name"
        />
        <div className="no-longer-own_button">
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
