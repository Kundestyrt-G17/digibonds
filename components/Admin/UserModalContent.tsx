import React from "react";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import { UserInterface } from "./Brokers";
import { CompanyInterface } from "@/components/Admin/Companies";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { IUser } from "@/schemas/user";
import { ICompany } from "@/schemas/company";

interface ModalProps {
  title: string;
  user?: UserInterface;
  brokers?: IUser[];
  close: () => void;
  isBroker: boolean;
  company?: ICompany;
}

export default function UserModalContent(props: ModalProps) {
  const { title, user, brokers, close, isBroker, company } = props;

  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
      brokerSelect: user?.broker,
    },
  });

  return (
    <>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <TextField inputRef={register} name="name" label="Full name" required />
        <TextField
          inputRef={register}
          type="email"
          name="email"
          label="Email"
          required
        />
        <TextField
          inputRef={register}
          name="phone"
          label="Phone number"
          required
        />
        {!isBroker && (
          <Controller
            render={({ value, onChange }) => {
              return (
                <Autocomplete
                  options={brokers}
                  autoSelect
                  autoComplete
                  defaultValue={user?.broker}
                  value={value}
                  onChange={(e, data) => onChange(data)}
                  getOptionLabel={(user) => user.name}
                  getOptionSelected={(user, value) => {
                    return user._id === value._id;
                  }}
                  style={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Broker name" />
                  )}
                />
              );
            }}
            rules={{ required: true }}
            control={control}
            onChange={([, data]) => data._id}
            name={`brokerSelect`}
            defaultValue={user?.broker ? user.broker : ""}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={
            isBroker
              ? handleSubmit(onSubmitBroker)
              : handleSubmit(onSubmitBondHolder)
          }
        >
          Add
        </Button>
        <Button onClick={close}>Cancel</Button>
      </DialogActions>
      )
    </>
  );

  async function onSubmitBondHolder(data) {
    const password = "qwerty"; //TODO: make temporary password, with hash and salt
    const email = data.email;
    const name = data.name;
    const phone = data.phone;
    const isBroker = false;
    const broker = data.brokerSelect._id;

    if (user) {
      const id = user._id;

      console.log(company);
      const response = await fetch(`/api/users`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          name,
          password,
          email,
          phone,
          isBroker,
          company: company._id,
          broker,
        }),
      });
      if (response.ok) {
        close();
      }
    } else {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          password,
          email,
          phone,
          isBroker,
          company: company._id,
          broker,
        }),
      });
      if (response.ok) {
        close();
      }
    }
  }

  async function onSubmitBroker(data) {
    const password = "qwerty"; //TODO: make temporary password, with hash and salt
    const email = data.email;
    const name = data.name;
    const phone = data.phone;
    const isBroker = true;

    if (user) {
      const id = user._id;

      const response = await fetch(`/api/users`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          name,
          password,
          email,
          phone,
          isBroker,
        }),
      });
      if (response.ok) {
        close();
      }
    } else {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          password,
          email,
          phone,
          isBroker,
        }),
      });
      if (response.ok) {
        close();
      }
    }
  }
}
