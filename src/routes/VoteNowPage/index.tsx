import React, { useEffect } from 'react';
import { submittedPageType } from '../../utils/types';
import { useHistory } from 'react-router-dom';

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
      <button onClick={() => history.push('/submitted')}>Submit</button>
    </div>
  );
};

export default VoteNowPage;
