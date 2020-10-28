import React from 'react';

import './index.css';
import { useParams } from 'react-router-dom';

const Meeting = () => {
  let { meetingId } = useParams();
  return <h3>Requested meeting ID: {meetingId}</h3>;
};

export default Meeting;
