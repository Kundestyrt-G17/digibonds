import React, { useState } from "react";
import styles from "./summary.module.css";
import { Button, Checkbox, FormControlLabel } from "@material-ui/core";
import { useRouter } from "next/router";
import { IVote } from "@/schemas/vote";
import clsx from "clsx";

interface SummaryProps {
  isin: string;
  ballot: IVote;
  submitVote: (ballot: IVote) => void;
}

const Summary = (props: SummaryProps) => {
  const { isin, ballot, submitVote } = props;
  const [isChecked, setIsChecked] = useState(false);

  let id = 0;
  const createData = (field, value) => {
    id++;
    return { id, field, value };
  };

  let rows = [
    createData("ISIN", isin),
    createData("Company", ballot.company),
    createData("Amount of bonds owned", ballot.bondsOwned),
    createData("You voted", ballot.favor),
  ];
  return (
    <div className={styles.summaryContainer}>
      <table className={styles.summaryTable}>
        <thead className={styles.summaryColumn}>
          <th
            className={clsx(
              styles.summaryTableHeader,
              styles.summaryPaddingCol1
            )}
          >
            Field
          </th>
          <th
            className={clsx(
              styles.summaryTableHeader,
              styles.summaryPaddingCol2
            )}
          >
            Value
          </th>
        </thead>
        {rows.map((row) => (
          <tr className={styles.summaryRow} key={row.id}>
            <td className={styles.summaryPaddingCol1}>{row.field}</td>
            <td className={styles.summaryPaddingCol2}>{row.value}</td>
          </tr>
        ))}

        <tr className={styles.summaryRow}>
          <td className={styles.summaryPaddingCol1}>Upload proof of holding</td>
          <td>
            <Button
              variant="outlined"
              color="primary"
              component="span"
              size="small"
            >
              {ballot.proofOfHolding.slice(0, 5)}
            </Button>
          </td>
        </tr>
      </table>
      <FormControlLabel
        className={styles.summaryCheckbox}
        control={
          <Checkbox
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
            color="primary"
          />
        }
        label="I confirm that the above information is correct"
      />
      <div className={styles.summaryButton}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!isChecked}
          onClick={() => submitVote(ballot)}
        >
          Vote!
        </Button>
      </div>
    </div>
  );
};

export default Summary;
