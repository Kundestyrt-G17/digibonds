import React, { useState } from "react";
import UserTable from "@/components/Admin/UserTable";
import { Dialog, Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import UserModalContent from "@/components/Admin/UserModalContent";
import DeleteModalContent from "@/components/Admin/DeleteModalContent";
import { IUser } from "@/schemas/user";

export interface UserInterface {
  name: string;
  phone: number;
  email: string;
  _id?: string;
  broker?: IUser;
}

export default function Brokers(props: {
  brokers: IUser[];
  mutate: () => void;
}) {
  const { brokers, mutate } = props;

  const [showing, setShowing] = useState<boolean>(false);
  const [editing, setEditing] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [broker, setBroker] = useState<UserInterface | undefined>(undefined);

  brokers.sort((brokerA, brokerB) => brokerA.name.localeCompare(brokerB.name));

  function edit(data) {
    setShowing(true);
    setEditing(true);
    const chosenBroker: UserInterface = {
      name: data.name,
      _id: data._id,
      email: data.email,
      phone: data.phone,
    };
    setBroker(chosenBroker);
  }

  function handleDelete(data) {
    setShowing(true);
    setDeleting(true);
    const chosenBroker: UserInterface = {
      name: data.name,
      _id: data._id,
      email: data.email,
      phone: data.phone,
    };
    setBroker(chosenBroker);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h2>Broker List</h2>
      <Button
        onClick={() => {
          setBroker(undefined);
          setShowing(true);
        }}
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        style={{ width: "20%", alignSelf: "flex-end", marginBottom: "8px" }}
      >
        New broker
      </Button>
      <UserTable
        isBondholderTable={false}
        users={brokers}
        edit={edit}
        handleDelete={handleDelete}
      />
      <Dialog open={showing} onClose={() => setShowing(false)}>
        {deleting ? (
          <DeleteModalContent close={close} title={"broker"} user={broker} />
        ) : (
          <UserModalContent
            isBroker={true}
            title={!editing ? "Add new broker" : "Edit broker"}
            close={close}
            user={broker}
          />
        )}
      </Dialog>
    </div>
  );

  function close() {
    setShowing(false);
    setEditing(false);
    setDeleting(false);
    mutate();
  }
}
