import React from 'react';
import { Button, TextField } from '@material-ui/core';
import MeetingsTable from './Meetings';
import Meeting from './Meeting';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import './index.css';

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
        <div className="meetings-header">
          <h1 style={{ width: '100%' }}>ACTIVE MEETINGS</h1>
          <TextField
            label="Search"
            variant="outlined"
            margin="normal"
            name="search"
            style={{ height: '50px', margin: '0' }}
          />
          <Button
            variant="contained"
            color="primary"
            style={{ height: '50px' }}
            startIcon={<AddIcon />}
          >
            <Link
              to="/meetings/create"
              style={{ textDecoration: 'none', color: 'white' }}
            >
              New Meeting
            </Link>
          </Button>
        </div>
        <MeetingsTable />
      </Route>
    </Switch>
  );
};

export default MeetingsRoute;
