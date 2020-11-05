import React from "react";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import { ICompany } from "@/schemas/company";

interface CompanyModalContentProps {
  title: string;
  company?: ICompany;
  setShowing: (boolean) => void;
  close: () => void;
}

export default function CompanyModalContent(props: CompanyModalContentProps) {
  const { close, title, company, setShowing } = props;

  const { register, handleSubmit } = useForm({
    defaultValues: {
      companyName: company?.name,
    },
  });

  return (
    <>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <TextField
          inputRef={register}
          name="companyName"
          label="Company name"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit(onSubmit)}>Add</Button>
        <Button onClick={() => setShowing(false)}>Cancel</Button>
      </DialogActions>
      )
    </>
  );

  async function onSubmit(data) {
    const name = data.companyName;
    if (company) {
      const id = company._id;
      const response = await fetch("/api/companies", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          name,
        }),
      });
      if (response.ok) {
        close();
      }
    } else {
      const response = await fetch("/api/companies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
        }),
      });
      if (response.ok) {
        close();
      }
    }
  }
}
