import React, { useEffect } from 'react';
import { submittedPageType } from '../../utils/types';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';

interface Props {
  setSubmitted: (submitted: submittedPageType) => void;
}

const VoteNowPage = (props: Props) => {
  const { setSubmitted } = props;
  const history = useHistory();

  useEffect(() => {
    setSubmitted('voted');
  });

  return (
    <div>
      <h1>TODO</h1>
      <Button onClick={() => history.push('/submitted')} variant="contained">
        Submit
      </Button>
    </div>
  );
};

export default VoteNowPage;
