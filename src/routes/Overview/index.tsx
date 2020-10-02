import React from 'react';
import './index.css';
import { useGetFetchOnMount } from '../../hooks/fetchHooks';

interface Data {
  id: number;
  meetingName: string;
  isin: string;
  data: string;
}

const Overview = () => {

  const [ data, fetching ] = useGetFetchOnMount<Data>('/meetings/1');

  console.log(data);

  return <div className="overview">hei</div>;
};

export default Overview;
