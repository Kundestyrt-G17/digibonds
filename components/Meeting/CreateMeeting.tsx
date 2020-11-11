import React, { useMemo, useState, useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import {
  Button,
  TextField,
  IconButton,
  CircularProgress,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Delete } from "@material-ui/icons";
import { DropzoneDialog } from "material-ui-dropzone";
import styles from "./CreateMeeting.module.css";
import AddIcon from "@material-ui/icons/Add";
import { useRouter } from "next/router";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

interface CompanyInterface {
  name: string;
}

interface FormInterface {
  meetingName: string;
  isin: string;
  deadline: Date;
  totalBonds: number;
  summons?: string;
  companies: CompanyInterface[];
}

const CreateMeeting = () => {
  const { data: companies, error } = useSWR("/api/companies", fetcher);
  const router = useRouter();

  const [fileUploadOpen, setFileUploadOpen] = useState(false);
  const [encodedSummons, setEncodedSummons] = useState("");
  const [summonsName, setSummonsName] = useState("");
  const [tooManyBonds, setTooManyBonds] = useState<boolean>(false);

  const { register, control, handleSubmit } = useForm();
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: "companies",
    }
  );
  if (error) return <div>Failed to load</div>;
  if (!companies) return <CircularProgress />;

  return (
    <div className={styles.createMeeting}>
      <div className={styles.createMeetingHeader}>
        <h1>New Meeting</h1>
      </div>
      <form
        className={styles.createMeetingForm}
        onSubmit={handleSubmit(async (data: FormInterface) => {
          data.summons = encodedSummons;
          const meetingName = data.meetingName;
          const isin = data.isin;
          const date = data.deadline;
          const totalBonds = data.totalBonds;
          const summons = data.summons;
          let sumBonds = 0;
          const votes = data?.companies.map((elem) => {
            //@ts-ignore
            sumBonds += Number(elem.bondsOwned);
            //@ts-ignore
            return { company: elem.company._id, bondsOwned: elem.bondsOwned };
          });

          setTooManyBonds(sumBonds > Number(totalBonds));

          if (sumBonds <= Number(totalBonds)) {
            const response = await fetch("/api/meetings", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                meetingName,
                isin,
                date,
                summons,
                totalBonds,
                votes,
              }),
            });
            if (response.ok) {
              return router.push("/");
            }
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

        <div>{encodedSummons.length > 0 && summonsName}</div>

        <DropzoneDialog
          open={fileUploadOpen}
          acceptedFiles={[".pdf"]}
          showPreviews={true}
          filesLimit={1}
          maxFileSize={5000000}
          onClose={() => setFileUploadOpen(false)}
          onSave={(files) => {
            setSummonsName(files[0].name);
            const reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.addEventListener(
              "load",
              () => {
                setEncodedSummons(reader.result as string);
                setFileUploadOpen(false);
              },
              false
            );
          }}
        />
        <div
          className={styles.createMeetingAddBondholder} //Add overflow here?
        >
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {fields.map((item, index) => (
              <li
                key={index}
                className={styles.bondholderRow}
                style={{ margin: "20px 0px" }}
              >
                <Controller
                  render={({ value, onChange }) => {
                    return (
                      <Autocomplete
                        options={companies}
                        autoSelect
                        autoComplete
                        value={value}
                        onChange={(e, data) => onChange(data)}
                        getOptionLabel={(company) => {
                          return company !== "" ? company.name : "";
                        }}
                        getOptionSelected={(user, value) =>
                          user.id === value.id
                        }
                        style={{ width: "250px", marginRight: "15px" }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Company name"
                            variant="outlined"
                            required
                            margin="normal"
                          />
                        )}
                      />
                    );
                  }}
                  control={control}
                  defaultValue={item.id}
                  onChange={([, data]) => data._id}
                  name={`companies[${index}].company`}
                />
                <Controller
                  as={
                    <TextField
                      style={{ width: "250px" }}
                      label="Bonds owned"
                      variant="outlined"
                      required
                      margin="normal"
                      type="number"
                    />
                  }
                  control={control}
                  defaultValue={0}
                  name={`companies[${index}].bondsOwned`}
                />
                <IconButton
                  onClick={() => remove(index)}
                  style={{ marginLeft: "20px" }}
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
            onClick={() => append({ id: "" })}
          >
            Add new bondholder
          </Button>
        </div>
        {tooManyBonds && (
          <p style={{ color: "#FF5E5E" }}>
            The sum of bonds owned surpasses the meetings total amount of bonds
          </p>
        )}
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
