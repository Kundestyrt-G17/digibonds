import React, { useState } from 'react';
import BrokerTable from '@/components/Admin/BrokerTable';
import useSWR from 'swr';
import { Dialog } from '@material-ui/core';
import BrokerModalContent from '@/components/Admin/BrokerModalContent';


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

  return (
    <div>
      <h2>Broker List</h2>
      <button onClick={() => {
        setBroker(undefined);
        setShowing(true);
      }}>Add new broker
      </button>
      <BrokerTable brokers={brokers} edit={edit}/>
      <Dialog open={showing} onClose={() => setShowing(false)}>
        <BrokerModalContent title={editing ? 'Add new broker' : 'Edit broker'} close={close} broker={broker}
                            setShowing={setShowing}/>
      </Dialog>
    </div>
  );

  function close() {
    setShowing(false);
    mutate();
  }

}

