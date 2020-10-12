import React from 'react';
import './index.css';
import {
  useGetOnMountFetch,
  usePutFetch,
  useDeleteFetch,
  useGetFetch,
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
  const [putMeeting, error, loading] = usePutFetch<Data>('/meetings/1');
  const [deleteMeeting, deleteError] = useDeleteFetch<Data>('/meetings/8');
  const [meeting, getMeeting, meetingError, fetchingMeeting] = useGetFetch<
    Data
  >('/meetings/6');
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
      <button onClick={handlePost}>Post</button>
      <button onClick={handlePut}>Put</button>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={handleGet}>Get</button>
      {meetingError ? meetingError : meeting?.meetingName}
    </div>
  );

  async function handlePost() {
    getMeetings();
  }

  function handlePut() {
    putMeeting({
      isin: 'hjfhjhfj',
      meetingName: 'Ny PUT',
      date: '2015-05-29T00:00:00',
    });
    getMeetings();
  }

  function handleGet() {
    getMeeting();
  }

  async function handleDelete() {
    deleteMeeting();
    getMeetings();
  }
};

export default Overview;
