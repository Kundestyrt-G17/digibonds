import React from 'react';
import { Button, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import  { BrokerInterface } from './Broker';

interface ModalProps {
  title: string;
  broker?: BrokerInterface;
  setShowing: (boolean) => void;
  close: () => void;
}

export default function BrokerModalContent(props: ModalProps) {

  const { title, broker, setShowing, close } = props;

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: broker?.name,
      email: broker?.email,
      phone: broker?.phone,
    },
  });

  return (
    <><DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <TextField inputRef={register} name="name" label="Full name"/>
        <TextField inputRef={register} name="email" label="Email"/>
        <TextField inputRef={register} name="phone" label="Phone number"/>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit(onSubmit)}>Add</Button>
        <Button onClick={() => setShowing(false)}>Cancel</Button>
      </DialogActions>)
    </>);

  async function onSubmit(data) {
    const password = 'qwerty'; //TODO: make temporary password, with hash and salt
    const email = data.email;
    const name = data.name;
    const phone = data.phone;
    const isBroker = true;

    if (broker) {
      const id = broker._id;

      const response = await fetch(`/api/users`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
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
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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