import React, { useState } from "react";
import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import PublishIcon from "@material-ui/icons/Publish";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import styles from "./uploadPoH.module.css";
import { DropzoneDialog } from "material-ui-dropzone";
import CheckIcon from "@material-ui/icons/Check";
import { IVote } from "@/schemas/vote";

interface UploadPoHProps {
  setActiveStep: (index: number) => void;
  setBallot: (vote: IVote) => void;
  ballot: IVote;
}

const UploadPoH = (props: UploadPoHProps) => {
  const [pohName, setPohName] = useState("");
  const [fileUploadOpen, setFileUploadOpen] = useState(false);
  const [completed, setCompleted] = useState(false);
  const { setActiveStep } = props;

  return (
    <div className={styles.uploadPoHPage}>
      <div className={styles.uploadPoHRow}>
        <div className={styles.uploadPoHList}>
          <h3>A valid proof of holding must include:</h3>
          <div>
            <List dense={false}>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="ISIN code" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Amount of Bonds Owned" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Signature Date" />
              </ListItem>
            </List>
          </div>
        </div>
        <div className={styles.uploadPoHHeader}>
          <h3>Example Certificate of Holding</h3>
          <div className={styles.uploadPoHCol}>
            <img src="/poh.png" width="330px" alt="poh_img" />
          </div>
        </div>
      </div>
      <span>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setFileUploadOpen(!fileUploadOpen)}
          startIcon={!completed ? <PublishIcon /> : <CheckIcon />}
        >
          {!completed ? "Upload Proof of Holding" : "Upload successful"}
        </Button>
      </span>

      <div>{props.ballot.proofOfHolding && pohName}</div>

      <DropzoneDialog
        open={fileUploadOpen}
        acceptedFiles={[".pdf"]}
        showPreviews={true}
        maxFileSize={5000000}
        onClose={() => setFileUploadOpen(false)}
        onSave={(files) => {
          setPohName(files[0].name);
          setFileUploadOpen(false);
          const reader = new FileReader();
          setCompleted(true);
          reader.readAsDataURL(files[0]);
          reader.addEventListener(
            "load",
            () => {
              setCompleted(true);
              setFileUploadOpen(false);
              //@ts-ignore
              props.setBallot({
                ...props.ballot,
                proofOfHolding: reader.result as string,
              });
            },
            false
          );
        }}
      />
      <div className={styles.uploadPoHButton}>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={!completed}
          onClick={() => {
            setActiveStep(2);
          }}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default UploadPoH;
