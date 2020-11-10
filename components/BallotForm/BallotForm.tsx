import { Controller, useForm } from "react-hook-form";
import React, { ChangeEvent, useState } from "react";
import {
  Button,
  Checkbox,
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
  ballot: IVote;
  setBallot: (vote: IVote) => void;
  setActiveStep: (index: number) => void;
}

export default function BallotForm(props: BallotFormProps) {
  const { ballot, setBallot, ISIN, setActiveStep } = props;
  const [checked, setChecked] = useState<boolean>(false);
  const { handleSubmit, register, control, errors } = useForm({
    defaultValues: {
      ISIN: ISIN,
      company: ballot?.company,
      bondsOwned: ballot?.bondsOwned,
      favor: ballot?.favor,
    },
  });

  return (
    <form
      className={styles.ballotForm}
      onSubmit={handleSubmit((data: any) => {
        setBallot({ ...ballot, ...data });
        setActiveStep(1);
      })}
    >
      <TextField
        label="ISIN"
        variant="outlined"
        name="ISIN"
        disabled
        margin="normal"
        value={ISIN}
        className={styles.ballotFormTextfield}
      />
      <TextField
        label="Company"
        variant="outlined"
        name="company"
        disabled
        margin="normal"
        value={ballot.company.name}
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
          value={ballot.bondsOwned}
          inputRef={register({ pattern: /([0-9])/ })}
          error={errors.bondsOwned ? true : false}
        />
        <QuestionMarkToolTip tooltipText="This value is autofilled with the amount of bonds we have registred that you own. You can change it if you own a different amount." />
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
                  value="Favor"
                  control={<Radio color="primary" />}
                  label="I am in favor"
                />
                <FormControlLabel
                  control={<Radio color="primary" />}
                  value="Disfavor"
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
            name="approve"
            color="primary"
            onChange={(e) => setChecked(e.target.checked)}
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
}
