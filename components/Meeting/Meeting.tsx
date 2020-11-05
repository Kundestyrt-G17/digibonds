import React, { useState } from 'react';
import InvestorTable from '@/components/InvestorTable/InvestorTable';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import styles from './Meetings.module.css';
import { InputAdornment, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { IMeeting } from '@/schemas/meeting';


const fetcher = (url) => fetch(url).then((res) => res.json());

const Meeting = () => {
  const router = useRouter();
  const { data, error } = useSWR<IMeeting>(`/api${router.asPath}`, fetcher);
  const [search, setSearch] = useState("");

  if (error) return <div>Failed to Load</div>
  if (!data) return <div>Loading...</div>

  const filteredVotes = data.votes.filter((d) =>
    d.company.toLowerCase().includes(search.toLowerCase())
  );

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
        value={search}
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
      <InvestorTable votes={filteredVotes} totalBonds={data.totalBonds}/>
    </div>
  );
};

export default Meeting;
