import React from 'react';
import './index.css';
import {
  usePostFetch,
  useGetOnMountFetch,
  usePutFetch,
  useDeleteFetch,
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
  const [, putMeeting, loading, error] = usePutFetch<Data>('/meetings/6');
  const [deleteResponse, deleteMeeting, , deleteError] = useDeleteFetch<Data>(
    '/meetings/8'
  );

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
      <button onClick={handleDelete}>Delete</button>
    </div>
  );

  async function handleClick() {
    const res = await postMeeting(test);
    console.log(res);
    getMeetings();
  }

  async function handlePut() {
    await putMeeting({
      isin: 'hjfhjhfj',
      meetingName: 'Ny PUT',
      date: '2015-05-29T00:00:00',
    });
    getMeetings();
  }

  async function handleDelete() {
    const res = await deleteMeeting();
    console.log(res);
    console.log(deleteResponse);
    getMeetings();
  }
};

export default Overview;
