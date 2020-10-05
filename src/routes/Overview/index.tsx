import React from 'react';
import './index.css';
import {
  usePostFetch,
  useGetOnMountFetch,
  usePutFetch,
} from '../../hooks/fetchHooks';

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
  const [tull, putMeeting, loading, error] = usePutFetch<Data>('/meetings/6');

  const [meetings, getMeetings, fetchingMeetings] = useGetOnMountFetch<
    Meeting[]
  >('/meetings');

  const test: Data = {
    meetingName: 'Ny Post',
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
      <button onClick={handlePut}>Hallo</button>
      {tull?.meetingName}
    </div>
  );

  async function handleClick() {
    const res = await postMeeting(test);
    console.log(res);
  }

  async function handlePut() {
    const res = await putMeeting({
      isin: 'hjfhjhfj',
      meetingName: 'Ny PUT',
      date: '2015-05-29T00:00:00',
    });
    getMeetings();
  }
};

export default Overview;
