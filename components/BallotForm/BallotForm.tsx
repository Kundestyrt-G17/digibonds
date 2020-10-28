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
import { VotePageType } from "../../utils/types";
import { Vote } from "../../utils/interfaces";
import { QuestionMarkToolTip } from "./QuestionMarkToolTip";
import styles from "./BallotForm.module.css";
import cx from "classnames";

interface BallotFormProps {
  ISIN: string;
  filledOutVote?: Vote;
  setFilledOutVote: (vote: Vote) => void;
  setActiveStep: (index: number) => void;
}

export default function BallotForm(props: BallotFormProps) {
  const { filledOutVote, setFilledOutVote, ISIN, setActiveStep } = props;
  const { handleSubmit, register, control, errors } = useForm({
    defaultValues: {
      ISIN: ISIN,
      company: filledOutVote?.company,
      custodianName: filledOutVote?.custodianName,
      bondsOwned: filledOutVote?.bondsOwned,
      accountNumber: filledOutVote?.accountNumber,
      phoneNumber: filledOutVote?.phoneNumber,
      favor: filledOutVote?.favor || "favor",
      hasCustodian: filledOutVote?.hasCustodian || "",
    },
  });

  const [checked, setChecked] = useState<boolean>(false);
  const [hasCustodian, setHasCustodian] = useState<string>(
    filledOutVote?.hasCustodian ? filledOutVote.hasCustodian : ""
  );

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

      <FormControl margin="normal" className={styles.ballotFormCustodianRadios}>
        <FormLabel component="legend">Do you have a custodian?</FormLabel>
        <Controller
          rules={{ required: true }}
          control={control}
          name={"hasCustodian"}
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
                <FormControlLabel value="yes" control={<Radio color="primary"/>} label="Yes" />
                <FormControlLabel value="no" control={<Radio color="primary"/>} label="No" />
              </RadioGroup>
            );
          }}
        />
      </FormControl>

      {hasCustodian !== "" ? (
        <>
          {hasCustodian === "yes" && (
            <>
              <div
                className={cx(
                  styles.ballotFormElement,
                  styles.ballotFormElementTooltip
                )}
              >
                <TextField
                  name="custodianName"
                  label="Name of custodian"
                  variant="outlined"
                  type="text"
                  required
                  inputRef={register}
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
                  label="Account number of custodian"
                  variant="outlined"
                  name="accountNumber"
                  type="number"
                  required
                  inputRef={register}
                />
                <QuestionMarkToolTip tooltipText="Dette er hjelpe text" />
              </div>
            </>
          )}
          <div className={cx(styles.ballotFormElement, styles.ballotFormElementRadios)}>
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
          <span
            className={cx(styles.ballotFormElement, styles.ballotFormButton)}
          >
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
        ""
      )}
    </form>
  );

  function handleChecked(e: ChangeEvent<HTMLInputElement>) {
    setChecked(e.target.checked);
  }
}
