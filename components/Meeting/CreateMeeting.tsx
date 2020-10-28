import React, { useMemo, useState, useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Button, TextField, IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { DropzoneDialog } from "material-ui-dropzone";
import styles from "./CreateMeeting.module.css";
import AddIcon from "@material-ui/icons/Add";
import { useRouter } from "next/router";

interface BondholderInterface {
  name: string;
  email: string;
  amount: number;
}

interface FormInterface {
  isin: string;
  deadline: string;
  bondholders: BondholderInterface[];
  files: Files[];
}

const CreateMeeting = () => {
  const [fileUploadOpen, setFileUploadOpen] = useState(false);
  const [fileObjects, setFileObjects] = useState<File[]>([]);
  const {
    register,
    control,
    handleSubmit,
    reset,
    trigger,
    setError,
  } = useForm();
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: "investor",
    }
  );

  useEffect(() => {
    if (fields.length < 1) {
      prepend({ name: "", email: "", amount: 0 });
    }
  });

  const router = useRouter();

  return (
    <div className={styles.createMeeting}>
      <div className={styles.createMeetingHeader}>
        <h1>New Meeting</h1>
      </div>
      <form
        className={styles.createMeetingForm}
        onSubmit={handleSubmit((data: FormInterface) => {
          data.files = fileObjects;
          console.log(data);
        })}
      >
        <TextField
          className={styles.createMeetingTextfield}
          label="ISIN"
          variant="outlined"
          inputRef={register}
          autoFocus
          required
          margin="normal"
          name="isin"
        />
        <TextField
          className={styles.createMeetingTextfield}
          label="Deadline Date"
          variant="outlined"
          inputRef={register}
          required
          margin="normal"
          type="date"
          defaultValue="2020-12-24" //TODO: Possible value is today + 7 days? Need 3rd party date-library
          name="deadline"
        />

        <Button
          className={styles.createMeetingUploadbutton}
          variant="outlined"
          color="primary"
          onClick={() => setFileUploadOpen(!fileUploadOpen)}
        >
          Upload Summons
        </Button>
        <DropzoneDialog
          open={fileUploadOpen}
          acceptedFiles={[".pdf"]}
          showPreviews={true}
          maxFileSize={5000000}
          onClose={() => setFileUploadOpen(false)}
          onSave={(files) => {
            setFileObjects(files);
            setFileUploadOpen(false);
          }}
        />
        <div className={styles.createMeetingAddButton}>
          <Button
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => prepend({ name: "", email: "", amount: 0 })}
          >
            Add new bondholder
          </Button>
        </div>
        <div className={styles.createMeetingFixedHeader}>
          <h3>Bondholder's name</h3>
          <h3>E-mail</h3>
          <h3 className={styles.amountHeader}>Amount of bonds</h3>
        </div>
        <div className={styles.createMeetingScroll}>
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {fields.map((item, index) => (
              <li key={item.id}>
                <Controller
                  as={<TextField />}
                  required
                  name={`investor[${index}].name`}
                  inputRef={register()}
                  control={control}
                  placeholder="Name"
                  style={{ margin: 15 }}
                  defaultValue={item.name} // make sure to set up defaultValue
                />
                <Controller
                  as={<TextField />}
                  required
                  name={`investor[${index}].email`}
                  inputRef={register()}
                  control={control}
                  placeholder="E-mail"
                  style={{ margin: 15 }}
                  defaultValue={item.email} // make sure to set up defaultValue
                />
                <Controller
                  as={<TextField />}
                  required
                  name={`investor[${index}].amount`}
                  inputRef={register()}
                  type="number"
                  control={control}
                  style={{ margin: 15 }}
                  defaultValue={item.amount} // make sure to set up defaultValue
                />
                <IconButton onClick={() => remove(index)}>
                  <Delete />
                </IconButton>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.createMeetingButtons}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => router.push("/meetings")} //TODO: Add route to appropriate page
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            SUBMIT
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateMeeting;
