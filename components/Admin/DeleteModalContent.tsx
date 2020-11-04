import React from 'react';
import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { BrokerInterface } from '@/components/Admin/Broker';


interface ModalProps {
  title: string;
  user?: BrokerInterface;
  company?: CompanyInterface;
  setShowing: (boolean) => void;
  close: () => void;
}

interface CompanyInterface {
  name: string;
  _id: string;
}

export default function DeleteModalContent(props: ModalProps) {

  const { user, company, setShowing, title, close } = props;

  return (
    <><DialogTitle>Delete {title} </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete {title} {user.name || company.name}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onDelete}>Delete</Button>
        <Button onClick={() => setShowing(false)}>Cancel</Button>
      </DialogActions>)
    </>);

  async function onDelete() {
    const id = user._id || company._id;

    const response = await fetch(company ? "api/companies" :`/api/users`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id
      }),
    });
    if (response.ok) {
      close();
    }
  }
};