import React from 'react';
import { SubmittedPageType } from '../../utils/types';
import './index.css';

const Submitted = (props: { submitted: SubmittedPageType }) => {
  function renderCorrectPage() {
    switch (props.submitted) {
      case 'voted':
        return <p>Thanks for voting</p>;
      case 'sold':
        return <p>Thanks for letting us know who you sold your bonds to.</p>;
      case 'told':
        return <p>Thanks for letting us know who you voted for.</p>;
      case '':
        return <div />;
    }
  }

  return (
    <div className="submitted-page">
      <h1>Thank you!</h1>
      {renderCorrectPage()}
    </div>
  );
};

export default Submitted;
