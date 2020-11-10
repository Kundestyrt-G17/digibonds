import React, { ChangeEvent, useState } from "react";
import {
  Button,
  Checkbox,
  ClickAwayListener,
  createStyles,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  IconButton,
  InputBase,
  Paper,
  Theme,
} from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: "24px 0px",
      padding: "2px 4px",
      display: "flex",
      alignItems: "center",
      width: 400,
    },
    input: {
      flex: 1,
      marginLeft: "4px",
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  })
);

interface SearchFilterProps {
  setSearch: (e) => void;
  checked: { voted: boolean; poh: boolean };
  setCheckedStates: ({ voted, poh }) => void;
}

export default function SearchFilter(props: SearchFilterProps) {
  const { setSearch, checked, setCheckedStates } = props;

  const [showFilterMenu, setShowFilterMenu] = useState<boolean>();
  const [tempChecked, setTempChecked] = useState<{
    voted: boolean;
    poh: boolean;
  }>({ voted: checked.voted, poh: checked.poh });

  const classes = useStyles();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    console.log(tempChecked);
    setTempChecked({
      ...tempChecked,
      [event.target.name]: event.target.checked,
    });
  }

  // @ts-ignore
  return (
    <div style={{ position: "relative" }}>
      <Paper component="form" className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder="Search for company"
          inputProps={{ "aria-label": "search" }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <IconButton
          type="submit"
          className={classes.iconButton}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
        <Divider className={classes.divider} orientation="vertical" />
        <Button
          className={classes.iconButton}
          onClick={() => setShowFilterMenu(true)}
          startIcon={
            <FilterListIcon
              style={
                checked.voted || checked.poh
                  ? { fill: "blue" }
                  : { fill: "grey" }
              }
            />
          }
        >
          Filter result
        </Button>
      </Paper>
      {showFilterMenu && (
        <ClickAwayListener
          onClickAway={() => {
            setShowFilterMenu(false);
            setTempChecked(checked);
          }}
        >
          <Paper
            style={{
              backgroundColor: "#F1F4FF",
              zIndex: 10,
              position: "absolute",
              top: "-102px",
              left: "270px",
              padding: "10px",
            }}
          >
            <FormControl component="fieldset">
              <FormLabel component="legend">Filter options</FormLabel>
              <FormGroup color="primary">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={tempChecked.voted}
                      onChange={handleChange}
                      name="voted"
                    />
                  }
                  label="Voted"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={tempChecked.poh}
                      onChange={handleChange}
                      name="poh"
                    />
                  }
                  label="Valid Proof of holding"
                />
                <Button
                  onClick={() => {
                    setShowFilterMenu(false);
                    setCheckedStates(tempChecked);
                  }}
                >
                  Apply options
                </Button>
              </FormGroup>
            </FormControl>
          </Paper>
        </ClickAwayListener>
      )}
    </div>
  );
}
