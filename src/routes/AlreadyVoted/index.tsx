import React, { useState } from 'react';
import { RadioGroup, FormControl, FormControlLabel, Radio, Checkbox, CheckboxProps, Button } from '@material-ui/core';
import './index.css';
import { useHistory } from 'react-router';

//Bruk useForm i stedet, sjekk loginform i components

const AlreadyVoted = () => {
    const [value, setValue] = useState("infavor");
    const [isChecked, setIsChecked] = useState(false);

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        (e.currentTarget.value === value)? setValue(""): setValue(e.currentTarget.value)
    }

    const history = useHistory();
    const handleVoteNow= () => {
        history.push('/vote');
    }

    console.log(isChecked);
    //console.log(value);
    return(
        <div className="already-voted-page">
            <h2 className="already-voted-page_title">THANK YOU FOR VOTING</h2>
            <div className="already-voted-page_body">
                <div className="already-voted-page_paragraph">
                    <h3>Would you like to let TenBond know what you voted?</h3>
                    <FormControl component='fieldset'>
                        <RadioGroup aria-label="vote" name="vote1" value={value}>
                            <FormControlLabel value="infavor" control={<Radio color="primary" onChange={handleChange}/>} label="I voted in favor of the proposed resolution" />
                            <FormControlLabel value="disfavor" control={<Radio color="primary" onChange={handleChange}/>} label="I voted in disfavor of the proposed resolution" />
                            <FormControlLabel value="disclose" control={<Radio color="primary" onChange={handleChange}/>} label="I do not want to disclose" />
                        </RadioGroup>
                    </FormControl>
                </div>
                <FormControlLabel className="already-voted-page_check" control={
                        <Checkbox checked={isChecked} onChange={() => setIsChecked(!isChecked)} color="primary"/>}
                        label="The company allows their responsible broker to get insight in voting choice" />
                <div className="already-voted-page_button">
                    <Button variant="contained" color="primary" onClick={handleVoteNow}>
                        Let us know
                    </Button>
                </div>
            </div>
        </div>

    );
};

export default AlreadyVoted;