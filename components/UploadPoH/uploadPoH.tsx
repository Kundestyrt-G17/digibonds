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

const UploadPoH = (props: { setActiveStep: (index: number) => void }) => {
  const [dense, setDense] = React.useState(false);
  const [pohName, setPohName] = useState("");
  const [poh, setPoh] = useState("");
  const [fileUploadOpen, setFileUploadOpen] = useState(false);
  const [completed, setCompleted] = useState(false);
  const { setActiveStep } = props;

  return (
    <div className={styles.uploadPoHPage}>
      <div className={styles.uploadPoHRow}>
        <div className={styles.uploadPoHList}>
          <h3>A valid proof of holding must include:</h3>
          <div>
            <List dense={dense}>
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

      <div>{poh.length > 0 && pohName}</div>

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
              setPoh(reader.result as string);
              setCompleted(true);
              setFileUploadOpen(false);
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
