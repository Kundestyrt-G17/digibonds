import React from 'react';
import { Button, Checkbox, FormControlLabel, Radio, RadioGroup, SvgIcon, TextField, Tooltip } from '@material-ui/core';
import './index.css';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { useForm } from 'react-hook-form';

const BallotPage = () =>
  <div className="ballot-page">
    <BallotForm/>
  </div>;

export default BallotPage;

function BallotForm() {
  const { register, handleSubmit, getValues } = useForm();

  const value = getValues("give-vote");

  return (
    <form className="vote-form" onSubmit={handleSubmit((data) => {
      console.log(data);
    })}>
      <TextField label="ISIN" variant="outlined" defaultValue="123456 hjhj334" disabled margin="normal" name="ISIN" inputRef={register}
      />
      <TextField label="Company"  name="company" variant="outlined" defaultValue="Company" margin="normal" required inputRef={register}
      />
      <div className="">
        <TextField
          name="Custodian"
          label="Custodian"
          variant="outlined"
          type="text"
          inputRef={register}
        />
        <QuestionMarkToolTip tooltipText="Dette er hjelpe text"/>
      </div>
      <div className="">
        <TextField
          name="bondsOwned"
          label="Amount of bonds owned"
          variant="outlined"
          type="text"
          required
          inputRef={register}
        />
        <QuestionMarkToolTip tooltipText="Dette er hjelpe text"/>
      </div>
      <div className="">
        <TextField
          label="Account number of custodian"
          variant="outlined"
          name="accountNumber"
          type="text"
          required
          inputRef={register}
        />
        <QuestionMarkToolTip tooltipText="Dette er hjelpe text"/>
      </div>
      <div className="">
        <TextField
          label="Day time phone number"
          variant="outlined"
          name="phonenumber"
          type="text"
          inputRef={register}
        />
        <QuestionMarkToolTip tooltipText="A number that you can be contacted on"/>
      </div>
      <RadioGroup aria-label="vote" >
        <FormControlLabel inputRef={register} name="favor" control={<Radio color="primary" />}
                          label="I am in favor of the proposed resolution"/>
        <FormControlLabel inputRef={register} control={<Radio color="primary" />} name="favor"
                          label="I am in disfavor of the proposed resolution"/>
      </RadioGroup>
      <FormControlLabel
        control={
          <Checkbox
            name="give-vote"
            color="primary"
            inputRef={register}
          />
        }
        label="The company allows their responsible broker to get insight in their vote."
      />
      {console.log(value)}
      <Button variant="contained" color="primary" type="submit" disabled={getValues("give-vote")} > Continue </Button>
    </form>
  );
}


interface QuestionMarkToolTipProps {
  tooltipText: string;
}

function QuestionMarkToolTip(props: QuestionMarkToolTipProps) {
  const { tooltipText } = props;
  return (
    <Tooltip title={tooltipText} placement="right">
      <SvgIcon color="primary">
        <HelpOutlineIcon/>
      </SvgIcon>
    </Tooltip>);
}
