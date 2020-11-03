import { Controller, useForm } from "react-hook-form";
import React, { ChangeEvent, useState } from "react";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@material-ui/core";
import { IVote } from "../../schemas/vote";
import { QuestionMarkToolTip } from "./QuestionMarkToolTip";
import styles from "./BallotForm.module.css";
import cx from "classnames";

interface BallotFormProps {
  ISIN: string;
  filledOutVote?: IVote;
  setFilledOutVote: (vote: IVote) => void;
  setActiveStep: (index: number) => void;
}

export default function BallotForm(props: BallotFormProps) {
  const { filledOutVote, setFilledOutVote, ISIN, setActiveStep } = props;
  const { handleSubmit, register, control, errors } = useForm({
    defaultValues: {
      ISIN: ISIN,
      company: filledOutVote?.company,
      bondsOwned: filledOutVote?.bondsOwned,
      accountNumber: filledOutVote?.accountNumber,
      phoneNumber: filledOutVote?.phoneNumber,
      favor: filledOutVote?.favor || "favor",
    },
  });

  const [checked, setChecked] = useState<boolean>(false);

  return (
    <form
      className={styles.ballotForm}
      onSubmit={handleSubmit((data: any) => {
        setFilledOutVote(data);
        setActiveStep(1);
      })}
    >
      <TextField
        label="ISIN"
        variant="outlined"
        disabled
        margin="normal"
        name="ISIN"
        inputRef={register}
        className={styles.ballotFormTextfield}
      />
      <TextField
        label="Company"
        name="company"
        variant="outlined"
        margin="normal"
        required
        inputRef={register}
        className={styles.ballotFormTextfield}
      />
      <div
        className={cx(
          styles.ballotFormElement,
          styles.ballotFormElementTooltip
        )}
      >
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
      <div
        className={cx(
          styles.ballotFormElement,
          styles.ballotFormElementTooltip,
          styles.ballotFormElementPadding
        )}
      >
        <TextField
          label="Day time phone number"
          variant="outlined"
          name="phonenumber"
          type="text"
          inputRef={register}
        />
        <QuestionMarkToolTip tooltipText="A number that you can be contacted on" />
      </div>
      <div
        className={cx(styles.ballotFormElement, styles.ballotFormElementRadios)}
      >
        <FormLabel component="legend">
          Are you in favor or disfavor of the proposed resolution?
        </FormLabel>

        <Controller
          rules={{ required: true }}
          name={"favor"}
          control={control}
          render={({ value, onChange }) => {
            return (
              <RadioGroup
                aria-label="vote"
                name={"favor"}
                value={value}
                onChange={(e) => onChange(e)}
              >
                <FormControlLabel
                  value="favor"
                  control={<Radio color="primary" />}
                  label="I am in favor"
                />
                <FormControlLabel
                  control={<Radio color="primary" />}
                  value="disfavor"
                  label="I am in disfavor"
                />
              </RadioGroup>
            );
          }}
        />
      </div>
      <FormControlLabel
        className={styles.ballotFormElement}
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
      <span className={cx(styles.ballotFormElement, styles.ballotFormButton)}>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={!checked}
        >
          Continue
        </Button>
      </span>
    </form>
  );

  function handleChecked(e: ChangeEvent<HTMLInputElement>) {
    setChecked(e.target.checked);
  }
}
