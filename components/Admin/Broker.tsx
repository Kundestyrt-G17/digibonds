import React, { useState } from 'react';
import BrokerTable from '@/components/Admin/BrokerTable';
import useSWR from 'swr';
import { Dialog } from '@material-ui/core';
import BrokerModalContent from '@/components/Admin/BrokerModalContent';
import DeleteModalContent from '@/components/Admin/DeleteModalContent';


const fetcher = (url) => fetch(url).then((res) => res.json());

export interface BrokerInterface {
  name: string;
  phone: number;
  email: string;
  _id?: string;
}


export default function Broker() {

  const { data, error, mutate } = useSWR('/api/users', fetcher);
  const [showing, setShowing] = useState<boolean>(false);
  const [editing, setEditing] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [broker, setBroker] = useState<BrokerInterface | undefined>(undefined);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const brokers = data.filter((user) => {
    return user.isBroker;
  });

  function edit(data) {
    setShowing(true);
    setEditing(true);
    const chosenBroker: BrokerInterface = { name: data.name, _id: data._id, email: data.email, phone: data.phone };
    setBroker(chosenBroker);
  }

  function handleDelete(data) {
    console.log(data);
    setShowing(true);
    setDeleting(true);
    const chosenBroker: BrokerInterface = { name: data.name, _id: data._id, email: data.email, phone: data.phone };
    setBroker(chosenBroker);
  }

  return (
    <div>
      <h2>Broker List</h2>
      <button onClick={() => {
        setBroker(undefined);
        setShowing(true);
      }}>Add new broker
      </button>
      <BrokerTable brokers={brokers} edit={edit} handleDelete={handleDelete}/>
      <Dialog open={showing} onClose={() => setShowing(false)}>
        {deleting ? <DeleteModalContent close={close} setShowing={setShowing} title={'broker'} user={broker}/> :
          <BrokerModalContent title={editing ? 'Add new broker' : 'Edit broker'} close={close} broker={broker}
                              setShowing={setShowing}/>}
      </Dialog>
    </div>
  );

  function close() {
    setShowing(false);
    mutate();
  }

}

