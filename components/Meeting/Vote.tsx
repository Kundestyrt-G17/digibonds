import React, { ChangeEvent, useEffect, useState } from "react";
import useSWR from "swr";
import {
  Button,
  CircularProgress,
  FormControl,
  InputBase,
  InputLabel,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  withStyles,
} from "@material-ui/core";
import { useRouter } from "next/router";
import { IVote } from "@/schemas/vote";
import { Document, Page, pdfjs } from "react-pdf";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { PoHStatusType } from "@/utils/types";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const fetcher = (url) => fetch(url).then((res) => res.json());

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    display: "flex",
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

export default function Vote() {
  const router = useRouter();

  const { data, error } = useSWR<IVote>(`/api${router.asPath}`, fetcher);
  const [numPages, setNumPages] = useState(null);
  const [pohStatus, setPohStatus] = useState<PoHStatusType>(data?.pohStatus);

  useEffect(() => {
    setPohStatus(data?.pohStatus);
  }, [data]);

  if (error) return <div>Failed to Load</div>;
  if (!data) return <CircularProgress />;

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const status: PoHStatusType = e.target.value;
    setPohStatus(status);
  }

  const pageNumber = 1;

  async function save() {
    console.log(data);
    const response = await fetch(`/api${router.asPath}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        pohStatus,
        data._id,
        data.proofOfHolding,
        data.bondsOwned,
        data.favor,
        data.company._id
      ),
    });
    if (response.ok) {
      router.push("/");
    }
  }

  return (
    <div>
      <h2>Bondholder meeting for </h2>
      <h3>Norwegian</h3>
      <p>date</p>
      <h4>{data?.company.name}</h4>
      <div style={{ display: "flex" }}>
        <Document
          file={data.proofOfHolding}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page height={450} pageNumber={pageNumber} />
        </Document>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p>People who can vote for {data.company.name} and their broker</p>
          <ul>
            {data.company.bondHolders?.map((bondHolder) => (
              <li key={bondHolder._id}>
                {bondHolder.name}: {bondHolder.email} -{" "}
                {bondHolder.broker?.name}: {bondHolder.broker?.email}
              </li>
            ))}
          </ul>
          <p>Amount of bonds owned {data.bondsOwned} NOK</p>
          <FormControl>
            <InputLabel> Status from Nordic Trustee</InputLabel>
            <Select
              value={pohStatus}
              onChange={handleChange}
              input={<BootstrapInput />}
            >
              <MenuItem value={"Approved"}>
                <ListItemIcon>
                  <FiberManualRecordIcon
                    style={{ fill: "green", alignSelf: "center" }}
                    fontSize="small"
                  />
                </ListItemIcon>
                <ListItemText primary="Approved" />
              </MenuItem>
              <MenuItem value={"Pending"}>
                <ListItemIcon>
                  <FiberManualRecordIcon
                    style={{ fill: "orange", alignSelf: "center" }}
                    fontSize="small"
                  />
                </ListItemIcon>
                <ListItemText primary="Pending" />
              </MenuItem>
              <MenuItem value={"Rejected"}>
                <ListItemIcon>
                  <FiberManualRecordIcon
                    style={{ fill: "red", alignSelf: "center" }}
                    fontSize="small"
                  />
                </ListItemIcon>
                <ListItemText primary="Rejected" />
              </MenuItem>
              <MenuItem value={"-"} style={{ justifySelf: "center" }}>
                {" "}
                -{" "}
              </MenuItem>
            </Select>
          </FormControl>
          <Button
            style={{ width: "30%", margin: "10px", alignSelf: "center" }}
            color="primary"
            variant="outlined"
          >
            Download Vote
          </Button>
          <Button
            style={{ width: "30%", margin: "10px", alignSelf: "center" }}
            color="primary"
            variant="outlined"
          >
            Send Email
          </Button>
        </div>
      </div>
      <div
        style={{
          justifySelf: "center",
          width: "50%",
          display: "flex",
          justifyContent: "space-evenly",
          marginTop: "20px",
        }}
      >
        <Button color="primary" variant="outlined">
          Cancel
        </Button>
        <Button color="primary" variant="contained" onClick={save}>
          Save
        </Button>
      </div>
    </div>
  );
}
