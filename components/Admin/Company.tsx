import React from 'react';
import { Accordion, AccordionSummary, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ICompany } from '@/schemas/company';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());


export default function Company() {

  const { data, error, mutate } = useSWR<ICompany[]>('/api/companies', fetcher);


  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (<div>
    <h2>Companies</h2>
    <button>Add Company</button>
    {data.map((element) => {
     return( <>
        <Accordion key={element._id}>
          <AccordionSummary  expandIcon={<ExpandMoreIcon />} >
            <Typography>{element.name}</Typography>
          </AccordionSummary>
        </Accordion>
      </>);
    })}

  </div>);
}