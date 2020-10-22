import React from 'react';
import { Button, TextField } from '@material-ui/core';
import MeetingsTable from './Meetings';
import Meeting from './Meeting';

import './index.css';
import { Switch, Route, useRouteMatch, useParams } from 'react-router-dom';

interface Meeting {
  name: string;
  isin: string;
  votes: number;
  deadline: string;
}

const MeetingsRoute = () => {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route path={`${match.path}/:meetingId`}>
        <Meeting />
      </Route>
      <Route path={match.path}>
        <div className="meetings">
          <div className="meetings-header">
            <h1> ACTIVE MEETINGS </h1>
            <TextField
              label="Search"
              variant="outlined"
              margin="normal"
              name="search"
            />
          </div>
        </div>
        <MeetingsTable />
      </Route>
    </Switch>
  );
};

export default MeetingsRoute;
