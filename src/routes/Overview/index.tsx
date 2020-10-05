import React from 'react';
import './index.css';
import { usePostFetch, useGetOnMountFetch } from '../../hooks/fetchHooks';

interface Data {
  meetingName: string;
  isin: string;
  date: string;
}

interface Meeting {
  id: number;
  meetingName: string;
  isin: string;
  date: string;
}

const Overview = () => {
  const [data, postMeeting, fetching] = usePostFetch<Data>('/meetings');
  const [meetings, getMeetings, fetchingMeetings] = useGetOnMountFetch<
    Meeting[]
  >('/meetings');

  const test: Data = {
    meetingName: 'Test Post',
    isin: 'jenrmne,r',
    date: '2015-05-29T00:00:00',
  };

  return (
    <div className="overview">
      {fetchingMeetings
        ? 'loading'
        : meetings?.map((meeting) => {
            return <p key={meeting.id}>{meeting.meetingName}</p>;
          })}
      <button onClick={handleClick}>Trykk</button>
      {data?.meetingName}
    </div>
  );

  async function handleClick() {
    const res = await postMeeting(test);
    console.log(res);
  }
};

export default Overview;
