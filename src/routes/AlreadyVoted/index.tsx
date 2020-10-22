import React, { useState, useEffect } from 'react';
import {
  RadioGroup,
  FormControl,
  FormControlLabel,
  Radio,
  Checkbox,
  CheckboxProps,
  Button,
  withStyles,
  WithStyles,
} from '@material-ui/core';
import './index.css';
import { useHistory } from 'react-router';
import { submittedPageType } from '../../utils/types';

const GlobalCss = withStyles({
  '@global': {
    '.MuiFormControl-root': {
      paddingLeft: '30px',
    },
  },
})(() => null);

interface Props {
  setSubmitted: (submitted: submittedPageType) => void;
}

const AlreadyVoted = (props: Props) => {
  const { setSubmitted } = props;
  const [value, setValue] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  const history = useHistory();
  const handleVoteNow = () => {
    history.push('/submitted');
  };
  useEffect(() => {
    setSubmitted('told');
  });

  return (
    <div className="already-voted-page">
      <h2 className="already-voted-page_title">THANK YOU FOR VOTING</h2>
      <div className="already-voted-page_body">
        <div className="already-voted-page_paragraph">
          <h3>Would you like to let TenBond know what you voted?</h3>
          <GlobalCss />
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="vote"
              name="vote1"
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel
                value="infavor"
                control={<Radio color="primary" />}
                label="I voted in favor of the proposed resolution"
              />
              <FormControlLabel
                value="disfavor"
                control={<Radio color="primary" />}
                label="I voted in disfavor of the proposed resolution"
              />
            </RadioGroup>
          </FormControl>
        </div>
        <FormControlLabel
          className="already-voted-page_check"
          control={
            <Checkbox
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
              color="primary"
            />
          }
          label="The company allows their responsible broker to get insight in voting choice"
        />
        <div className="already-voted-page_button">
          <Button variant="contained" color="primary" onClick={handleVoteNow} disabled={!isChecked || value===''}>
            Let us know
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AlreadyVoted;
