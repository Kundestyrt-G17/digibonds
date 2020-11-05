import React, { useRef } from "react";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

export default function ExportAsCSV() {
    const anchorRef = useRef<HTMLDivElement>(null);
  
    const handleClick = () => {
      console.info(`You just clicked the button!`);
    };

    const handleToggle = () => {
        console.info(`You just clicked the arrow. It does nothing yeaaaaah!`);
    };
  
    return (
      <Grid container direction="column" alignItems="center">
        <Grid item xs={12}>
          <ButtonGroup variant="contained" color="primary" ref={anchorRef} aria-label="split button">
            <Button onClick={handleClick}>Export Results</Button>
            <Button
              color="primary"
              size="small"
              aria-controls={open ? 'split-button-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-label="Export Results"
              aria-haspopup="menu"
              onClick={handleToggle}
            >
              <ArrowDropDownIcon />
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    );
};
  