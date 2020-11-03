import React from 'react';
import { GetVote, IMeeting } from '@/utils/interfaces';
import InvestorTable from '@/components/InvestorTable/InvestorTable';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import styles from './Meetings.module.css';
import { TextFields } from '@material-ui/icons';
import { InputAdornment, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';


const fetcher = (url) => fetch(url).then((res) => res.json());


const votes: GetVote[] = [
  {
    amount: 10000,
    approved: false,
    company: {
      name: 'Test 1',
      bondholders: [{ name: 'hei', broker: false, email: 'sndjkjkj@jnknjn.no', password: undefined, _id: undefined }],
    },
    inFavor: null,
    voted: false,
    pohStatus: 'Pending',
  },
  {
    amount: 10000,
    approved: false,
    company: {
      name: 'Test 2',
      bondholders: [{ name: 'hei', broker: false, email: 'sndjkjkj@jnknjn.no', password: undefined, _id: undefined }],
    },
    inFavor: true,
    voted: true,
    pohStatus: 'Disapproved',

  },
  {
    amount: 7000,
    approved: false,
    company: {
      name: 'Test 3',
      bondholders: [{ name: 'hei', broker: false, email: 'sndjkjkj@jnknjn.no', password: undefined, _id: undefined }],
    },
    inFavor: true,
    voted: null,
    pohStatus: 'Approved',

  },
];

const Meeting = () => {

  const router = useRouter();
  const { data, error } = useSWR<IMeeting>(`/api${router.asPath}`, fetcher);

  return (
    <div>
      {error && <p className={styles.errorMessage}>An error has occurred. Please contact the IT department. {error.message} </p>}
      <h4>Bondholder meeting for </h4>
      <h1>{data?.meetingName}</h1>
      <TextField
        label="Search"
        variant="outlined"
        margin="normal"
        type="search"
        name="search"
        onChange={(e) => setSearch(e.target.value)}
        style={{ height: "50px", margin: "0" }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <InvestorTable votes={votes} totalAmount={60000}/>
    </div>
  );
};

export default Meeting;
