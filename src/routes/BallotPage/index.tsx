import React, { ChangeEvent, useState } from 'react';
import {
  Button,
  Checkbox,
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
import { Controller, useForm } from 'react-hook-form';

interface Vote {
  ISIN: string;
  company: string;
  custodianName?: string;
  bondsOwned: number;
  accountNumber?: number;
  phoneNumber?: number;
  favor: string;
  checked?: boolean;
  hasCustodian: string;
}

type VotePageType = 'Ballot' | 'PoH' | 'Summary';

const BallotPage = () => {
  const [filledOutVote, setFilledOutVote] = useState<Vote>();
  const [votePage, setVotePage] = useState<VotePageType>('Ballot');

  const changePage = () => {
    switch (votePage) {
      case 'Ballot':
        return (
          <>
            <h1>Fill out ballot </h1>
            <BallotForm
              ISIN={'203578'}
              setFilledOutVote={setFilledOutVote}
              setVotePage={setVotePage}
              filledOutVote={{
                ISIN: '203578',
                company: 'Norwegian',
                bondsOwned: 200,
                favor: 'favor',
                hasCustodian: 'yes',
                checked: true,
                phoneNumber: 4545454545,
                custodianName: 'LALALALA',
                accountNumber: 8989898989,
              }}
            />
          </>
        );
      case 'PoH':
        return (
          <p>
            PoH <span>{filledOutVote?.custodianName}</span>
          </p>
        );
    }
  };

  return <div className="ballot-page">{changePage()}</div>;
};

export default BallotPage;

interface BallotFormProps {
  ISIN: string;
  filledOutVote?: Vote;
  setFilledOutVote: (vote: Vote) => void;
  setVotePage: (page: VotePageType) => void;
}

function BallotForm(props: BallotFormProps) {
  const { filledOutVote, setFilledOutVote, ISIN, setVotePage } = props;
  const { handleSubmit, register, control, errors } = useForm({
    defaultValues: {
      ISIN: ISIN,
      company: filledOutVote?.company,
      custodian: filledOutVote?.custodianName,
      bondsOwned: filledOutVote?.bondsOwned,
      accountNumber: filledOutVote?.accountNumber,
      phoneNumber: filledOutVote?.phoneNumber,
      favor: filledOutVote?.favor,
      hasCustodian: filledOutVote?.hasCustodian,
    },
  });

  const [checked, setChecked] = useState<boolean>(false);
  const [hasCustodian, setHasCustodian] = useState<string>(
    filledOutVote?.hasCustodian ? filledOutVote.hasCustodian : ''
  );

  return (
    <form
      className="ballot-form"
      onSubmit={handleSubmit((data: any) => {
        setFilledOutVote(data);
        setVotePage('PoH');
      })}
    >
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
          type="number"
          required
          inputRef={register({ pattern: /([0-9])/ })}
          error={errors.bondsOwned ? true : false}
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

      <div className="ballot-form__custodian-radios">
        <FormLabel component="legend">Do you have a custodian?</FormLabel>
        <Controller
          rules={{ required: true }}
          control={control}
          name={'hasCustodian'}
          render={({ value, onChange }) => {
            return (
              <RadioGroup
                value={value}
                aria-label="do you have a custodian?"
                name="hasCustodian"
                onChange={(e) => {
                  onChange(e);
                  setHasCustodian(e.target.value);
                }}
                row
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            );
          }}
        />
      </div>

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
          <div className="ballot-form__element">
            <Controller
              rules={{ required: true }}
              name={'favor'}
              control={control}
              render={({ value, onChange }) => {
                return (
                  <RadioGroup
                    aria-label="vote"
                    name={'favor'}
                    value={value}
                    onChange={(e) => onChange(e)}
                  >
                    <FormControlLabel
                      value="favor"
                      control={<Radio color="primary" />}
                      label="I am in favor of the proposed resolution"
                    />
                    <FormControlLabel
                      control={<Radio color="primary" />}
                      value="disfavor"
                      label="I am in disfavor of the proposed resolution"
                    />
                  </RadioGroup>
                );
              }}
            />
          </div>
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
