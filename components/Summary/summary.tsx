import React, { useState } from "react";
import styles from "./summary.module.css";
import { Button, Checkbox, FormControlLabel } from "@material-ui/core";
import { useRouter } from "next/router";
import clsx from "clsx";


interface SummaryProps {
  isin: string | string[];
  company: string;
  bondsOwned: number;
  dayTime?: number | string;
  vote: string;
  uploadPoH: string;
}

const Summary = (props: SummaryProps) => {
  const { isin, company, bondsOwned, dayTime, vote, uploadPoH } = props;
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter();

  let id = 0;
  const createData = (field, value) => {
    id++;
    return { id, field, value };
  };

  let rows = [
    createData("ISIN", isin),
    createData("Company", company),
    createData("Amount of bonds owned", bondsOwned),
    createData("Day time (phone number)", dayTime),
    createData("You voted", vote)
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
        {rows.map(row => (
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
                Preview
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
          onClick={() =>
            router.push({
              pathname: "/submitted",
              query: { from: "vote" }
            })
          }
        >
          Go to signing
        </Button>
      </div>
    </div>
  );
};

export default Summary;
