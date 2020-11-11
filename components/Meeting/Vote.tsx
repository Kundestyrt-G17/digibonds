import React, { ChangeEvent, useEffect, useState } from "react";
import useSWR from "swr";
import {
  Button,
  FormControl,
  InputBase,
  InputLabel,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  withStyles,
} from "@material-ui/core";
import { useRouter } from "next/router";
import { IVote } from "@/schemas/vote";
import { Document, Page, pdfjs } from "react-pdf";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { PoHStatusType } from "@/utils/types";
import { IMeeting } from "@/schemas/meeting";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import Loading from "@/components/Loading";

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
  const { meetingId } = router.query;

  const { data: vote, error: voteError } = useSWR<IVote>(
    `/api${router.asPath}`,
    fetcher
  );
  const { data: meeting, error: meetingError } = useSWR<IMeeting>(
    `/api/meetings/${meetingId}`,
    fetcher
  );
  const [numPages, setNumPages] = useState(null);
  const [pohStatus, setPohStatus] = useState<PoHStatusType>(vote?.pohStatus);
  const [bondsOwned, setBondsOwned] = useState<number>(vote?.bondsOwned);

  useEffect(() => {
    setBondsOwned(vote?.bondsOwned);
    setPohStatus(vote?.pohStatus);
  }, [vote]);

  if (voteError) return <div>Failed to Load</div>;
  if (!vote) return <Loading />;

  if (meetingError) return <div>Failed to Load</div>;
  if (!meeting) return <Loading />;

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    // @ts-ignore
    const status: PoHStatusType = e.target.value;
    setPohStatus(status);
  }

  const pageNumber = 1;

  async function save() {
    const response = await fetch(`/api${router.asPath}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...vote, pohStatus, bondsOwned }),
    });
    if (response.ok) {
      router.back();
    }
  }

  const date = new Date(meeting.date);

  return (
    <div>
      <h2 style={{ fontSize: "14px", color: "#737B81", margin: "0" }}>
        Bondholder meeting for{" "}
      </h2>
      <div style={{ display: "flex" }}>
        <h3 style={{ fontSize: "36px", margin: 0 }}>{meeting.meetingName}</h3>
        <p style={{ marginLeft: "50px" }}>{date.toLocaleDateString("no-NO")}</p>
      </div>
      <h4 style={{ fontSize: "60px", margin: "0px" }}>{vote?.company.name}</h4>
      <div style={{ display: "flex" }}>
        <Document
          file={vote.proofOfHolding}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page height={450} pageNumber={pageNumber} />
        </Document>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "10px",
          }}
        >
          <p>People who can vote for {vote.company.name} and their broker</p>
          <ul>
            {vote.company.bondHolders?.map((bondHolder) => (
              <li key={bondHolder._id}>
                {bondHolder.name}: {bondHolder.email} -{" "}
                {bondHolder.broker?.name}: {bondHolder.broker?.email}
              </li>
            ))}
          </ul>
          <TextField
            margin="normal"
            label={`Amount of bonds owned for ${vote?.company.name}`}
            value={bondsOwned}
            type="number"
            variant="outlined"
            onChange={(e) => setBondsOwned(Number(e.target.value))}
            disabled={vote.favor !== "Not voted"}
          />
          <FormControl margin="normal">
            <InputLabel> Status from Nordic Trustee</InputLabel>
            <Select
              value={pohStatus || vote?.pohStatus}
              onChange={handleChange}
              input={<BootstrapInput />}
            >
              <MenuItem value={"Valid"}>
                <ListItemIcon>
                  <FiberManualRecordIcon
                    style={{ fill: "#77CA9D", alignSelf: "center" }}
                    fontSize="small"
                  />
                </ListItemIcon>
                <ListItemText primary="Valid" />
              </MenuItem>
              <MenuItem value={"Awaiting validation"}>
                <ListItemIcon>
                  <FiberManualRecordIcon
                    style={{ fill: "#FFD07A", alignSelf: "center" }}
                    fontSize="small"
                  />
                </ListItemIcon>
                <ListItemText primary="Awaiting validation" />
              </MenuItem>
              <MenuItem value={"Invalid"}>
                <ListItemIcon>
                  <FiberManualRecordIcon
                    style={{ fill: "#FF5E5E", alignSelf: "center" }}
                    fontSize="small"
                  />
                </ListItemIcon>
                <ListItemText primary="Invalid" />
              </MenuItem>
              <MenuItem value={"-"} style={{ justifySelf: "center" }}>
                {" "}
                -{" "}
              </MenuItem>
            </Select>
          </FormControl>
          <Button
            style={{ width: "60%", margin: "10px", alignSelf: "center" }}
            color="primary"
            startIcon={<PictureAsPdfIcon />}
            href=".pdf"
          >
            <a download={`${vote.company.name}.pdf`} href={vote.proofOfHolding}>
              Download Proof of Holding
            </a>
          </Button>
          <Button
            style={{ width: "40%", margin: "10px", alignSelf: "center" }}
            color="primary"
            variant="outlined"
          >
            Send To Trustee
          </Button>
        </div>
      </div>
      <div
        style={{
          justifySelf: "center",
          display: "flex",
          justifyContent: "space-evenly",
          marginTop: "20px",
        }}
      >
        <Button
          color="primary"
          variant="outlined"
          onClick={() => router.push(`/meetings/${meetingId}`)}
        >
          Cancel
        </Button>
        <Button color="primary" variant="contained" onClick={save}>
          Save
        </Button>
      </div>
    </div>
  );
}
