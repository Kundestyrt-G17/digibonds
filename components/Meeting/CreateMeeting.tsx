import React, { useMemo, useState, useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Button, TextField, IconButton } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Delete } from "@material-ui/icons";
import { DropzoneDialog } from "material-ui-dropzone";
import styles from "./CreateMeeting.module.css";
import AddIcon from "@material-ui/icons/Add";
import { useRouter } from "next/router";
import useSWR from "swr";
const fetcher = (url) => fetch(url).then((res) => res.json());

interface BondholderInterface {
  name: string;
  email: string;
  amount: number;
}

interface FormInterface {
  meetingName: string;
  isin: string;
  deadline: Date;
  totalBonds: number;
  investors: BondholderInterface[];
  //files: Files[];
}

const CreateMeeting = () => {
  const { data, error } = useSWR("/api/users", fetcher);

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
      name: "investors",
    }
  );
  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const router = useRouter();
  const users = data.filter((user) => !user.broker);
  console.log(users);

  const getOpObj = (option) => {
    if (!option._id) option = users.find((op) => op._id === option);
    return option;
  };

  return (
    <div className={styles.createMeeting}>
      <div className={styles.createMeetingHeader}>
        <h1>New Meeting</h1>
      </div>
      <form
        className={styles.createMeetingForm}
        onSubmit={handleSubmit(async (data: FormInterface) => {
          console.log(data);
          //data.files = fileObjects;
          const meetingName = data.meetingName;
          const isin = data.isin;
          const date = data.deadline;
          const totalBonds = data.totalBonds;
          const investors = data.investors.map((elem) => {
            return elem.investor._id;
          });

          const response = await fetch("/api/meetings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              meetingName,
              isin,
              date,
              totalBonds,
              investors,
            }),
          });
          if (response.ok) {
            return router.push("/");
          }
        })}
      >
        <TextField
          className={styles.createMeetingTextfield}
          label="Company name"
          variant="outlined"
          inputRef={register}
          autoFocus
          required
          margin="normal"
          name="meetingName"
        />
        <TextField
          className={styles.createMeetingTextfield}
          label="ISIN"
          variant="outlined"
          inputRef={register}
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
        <TextField
          className={styles.createMeetingTextfield}
          label="Total bonds outstanding"
          variant="outlined"
          inputRef={register}
          required
          margin="normal"
          type="number"
          name="totalBonds"
        />

        <Button
          className={styles.createMeetingUploadbutton}
          variant="outlined"
          color="primary"
          onClick={() => setFileUploadOpen(!fileUploadOpen)}
        >
          Upload Summons
        </Button>

        <div>
          {fileObjects.length > 0 &&
            fileObjects.map((file) => {
              return <div>{file.name}</div>;
            })}
        </div>

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
        <div className={styles.createMeetingAddBondholder}>
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {fields.map((item, index) => (
              <li
                key={item.id}
                className={styles.bondholderRow}
                style={{ margin: "20px 0" }}
              >
                <Controller
                  render={({ value, onChange }) => {
                    return (
                      <Autocomplete
                        options={users}
                        autoselect
                        autocomplete
                        value={value}
                        onChange={(e, data) => onChange(data)}
                        getOptionLabel={(user) => user.email}
                        getOptionSelected={(user, value) =>
                          user.id === value.id
                        }
                        style={{ width: 300 }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="E-mail"
                            variant="outlined"
                          />
                        )}
                      />
                    );
                  }}
                  control={control}
                  defaultValue={item.id}
                  onChange={([, data]) => data._id}
                  name={`investors[${index}].investor`}
                />
                <IconButton
                  onClick={() => remove(index)}
                  style={{ marginLeft: "45px" }}
                >
                  <Delete />
                </IconButton>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.addBondholderButton}>
          <Button
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => prepend({ id: "" })}
          >
            Add new bondholder
          </Button>
        </div>
        <div className={styles.createMeetingButtons}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => router.push("/")}
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
