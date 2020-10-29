import React, { useState } from "react";
import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import PublishIcon from "@material-ui/icons/Publish";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import styles from "./uploadPoH.module.css";
import { useRouter } from "next/router";
import { DropzoneDialog } from "material-ui-dropzone";
import CheckIcon from "@material-ui/icons/Check";

const UploadPoH = (props: { hasCustodian: string }) => {
  const [dense, setDense] = React.useState(false);
  const [fileUploadOpen, setFileUploadOpen] = useState(false);
  const [fileObjects, setFileObjects] = useState<File[]>([]);
  const [completed, setCompleted] = useState(false);
  const router = useRouter();
  const { hasCustodian } = props;

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
            {hasCustodian === "yes" && (
              <List>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Custodian Name" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Custodian Account Number" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Custodian Contact Number" />
                </ListItem>
              </List>
            )}
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
          {!completed ? "Upload Proof of Holding" : "Upload successfull"}
        </Button>
      </span>
      <div>
        {fileObjects.length > 0 &&
          fileObjects.map(file => {
            return <div>{file.name}</div>;
          })}
      </div>

      <DropzoneDialog
        open={fileUploadOpen}
        acceptedFiles={[".pdf"]}
        showPreviews={true}
        maxFileSize={5000000}
        onClose={() => setFileUploadOpen(false)}
        onSave={files => {
          setFileObjects(files);
          setFileUploadOpen(false);
          setCompleted(true);
        }}
      />
      <div className={styles.uploadPoHButton}>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={() =>
            router.push({
              pathname: "/submitted",
              query: { from: "vote" }
            })
          }
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default UploadPoH;