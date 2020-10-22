import React, { ChangeEvent, FormEvent, useState } from 'react';
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  SvgIcon,
  TextField,
  Tooltip,
} from '@material-ui/core';
import './index.css';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

interface Vote {
  ISIN: string;
  company: string;
  custodian?: string;
  bondsOwned: number;
  accountNumber?: number;
  phoneNumber?: number;
  favor: string;
  checked?: boolean;
  hasCustodian: string;
}

const BallotPage = () => {
  const [filledOutVote, setFilledOutVote] = useState<Vote>();

  return (
    <div className="ballot-page">
      <h1>Fill out ballot </h1>
      <BallotForm
        setFilledOutVote={setFilledOutVote}
        filledOutVote={{
          ISIN: '203578',
          company: 'Norwegian',
          bondsOwned: 200,
          favor: 'yes',
          hasCustodian: 'no',
          checked: true,
        }}
      />
    </div>
  );
};

export default BallotPage;

interface BallotFormProps {
  filledOutVote?: Vote;
  setFilledOutVote: (vote: Vote) => void;
}

function BallotForm(props: BallotFormProps) {
  const { filledOutVote, setFilledOutVote } = props;
  const { handleSubmit, register } = useForm({
    defaultValues: {
      ISIN: filledOutVote?.ISIN,
      company: filledOutVote?.company,
      custodian: filledOutVote?.custodian,
      bondsOwned: filledOutVote?.bondsOwned,
      accountNumber: filledOutVote?.accountNumber,
      phoneNumber: filledOutVote?.phoneNumber,
      favor: filledOutVote?.favor,
      checked: filledOutVote?.checked,
      hasCustodian: filledOutVote?.hasCustodian,
    },
  });

  const [checked, setChecked] = useState<boolean>(false);
  const [hasCustodian, setHasCustodian] = useState<string>('');
  const history = useHistory();

  return (
    <form
      className="ballot-form"
      onSubmit={handleSubmit((data: any) => {
        setFilledOutVote(data);
        history.push('/');
      })}
    >
      {console.log()}
      <TextField
        label="ISIN"
        variant="outlined"
        disabled
        margin="normal"
        name="ISIN"
        inputRef={register}
        className={'ballot-form__textfield'}
      />
      <TextField
        label="Company"
        name="company"
        variant="outlined"
        margin="normal"
        required
        inputRef={register}
        className={'ballot-form__textfield'}
      />
      <div className="ballot-form__element ballot-form__element--tooltip">
        <TextField
          name="bondsOwned"
          label="Amount of bonds owned"
          variant="outlined"
          type="text"
          required
          inputRef={register}
        />
        <QuestionMarkToolTip tooltipText="Dette er hjelpe text" />
      </div>
      <div className="ballot-form__element ballot-form__element--tooltip ">
        <TextField
          label="Day time phone number"
          variant="outlined"
          name="phonenumber"
          type="text"
          inputRef={register}
        />
        <QuestionMarkToolTip tooltipText="A number that you can be contacted on" />
      </div>

      <FormControl
        margin="normal"
        component="fieldset"
        className="ballot-form__custodian-radios"
      >
        <FormLabel component="legend">Do you have a custodian?</FormLabel>
        <RadioGroup
          aria-label="do you have a custodian?"
          name="hasCustodian"
          onChange={handleChange}
          innerRef={register}
          row
        >
          <FormControlLabel
            value="yes"
            innerRef={register}
            control={<Radio />}
            label="Yes"
          />
          <FormControlLabel
            value="no"
            inputRef={register}
            control={<Radio />}
            label="No"
          />
        </RadioGroup>
      </FormControl>

      {hasCustodian !== '' ? (
        <>
          {hasCustodian === 'yes' && (
            <>
              <div className="ballot-form__element ballot-form__element--tooltip">
                <TextField
                  name="custodian"
                  label="Name of custodian"
                  variant="outlined"
                  type="text"
                  required
                  inputRef={register}
                />
                <QuestionMarkToolTip tooltipText="Dette er hjelpe text" />
              </div>
              <div className="ballot-form__element ballot-form__element--tooltip">
                <TextField
                  label="Account number of custodian"
                  variant="outlined"
                  name="accountNumber"
                  type="text"
                  required
                  inputRef={register}
                />
                <QuestionMarkToolTip tooltipText="Dette er hjelpe text" />
              </div>
            </>
          )}
          <RadioGroup aria-label="vote" className="ballot-form__element">
            <FormControlLabel
              inputRef={register}
              name="favor"
              value="favor"
              control={<Radio color="primary" />}
              label="I am in favor of the proposed resolution"
            />
            <FormControlLabel
              inputRef={register}
              control={<Radio color="primary" />}
              name="favor"
              value="disfavor"
              label="I am in disfavor of the proposed resolution"
            />
          </RadioGroup>
          <FormControlLabel
            className="ballot-form__element"
            control={
              <Checkbox
                name="give-vote"
                color="primary"
                inputRef={register}
                onChange={handleChecked}
              />
            }
            label="The company allows their responsible broker to get insight in their vote."
          />
          <span className="ballot-form__element ballot-form__button">
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={!checked}
            >
              Continue
            </Button>
          </span>
        </>
      ) : (
        ''
      )}
    </form>
  );

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setHasCustodian(e.target.value);
  }

  function handleChecked(e: ChangeEvent<HTMLInputElement>) {
    setChecked(e.target.checked);
  }
}

interface QuestionMarkToolTipProps {
  tooltipText: string;
}

function QuestionMarkToolTip(props: QuestionMarkToolTipProps) {
  const { tooltipText } = props;
  return (
    <Tooltip title={tooltipText} placement="right">
      <SvgIcon color="primary">
        <HelpOutlineIcon />
      </SvgIcon>
    </Tooltip>
  );
}
