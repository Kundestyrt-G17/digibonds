import React from "react";
import { Button } from "@material-ui/core";
import { IVote } from "../../schemas/vote";
import GetAppIcon from "@material-ui/icons/GetApp";

const {
  Parser,
  transforms: { flatten },
} = require("json2csv");

interface ExportResultProps {
  votes: IVote[];
  exportName: string;
}

export default function ExportAsCSV(props: ExportResultProps) {
  const votes = [...props.votes];
  const fields = ["company.name", "bondsOwned", "pohStatus", "favor"];
  const options = { fields };
  const csvParser = new Parser(options);
  let csv = null;

  const handleClick = () => {
    try {
      csv = csvParser.parse(votes);
      const element = document.createElement("a");
      const downloadFile = new Blob([csv], { type: "text/csv;charset=UTF-8" });
      element.href = URL.createObjectURL(downloadFile);
      element.download = `Results ${props.exportName}.csv`;
      document.body.appendChild(element);
      element.click();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Button
      onClick={handleClick}
      variant="contained"
      color="primary"
      style={{
        maxHeight: "36px",
        minHeight: "36px",
        backgroundColor: "#57B18B",
      }}
      startIcon={<GetAppIcon />}
    >
      Export Results
    </Button>
  );
}
