import React from 'react';
import { submittedPageType } from '../../utils/types';

const Submitted = (props: { submitted: submittedPageType }) => {
  function renderCorrectPage() {
    switch (props.submitted) {
      case 'voted':
        return <p>Thanks for voting</p>;
      case 'sold':
        return <p>Thanks for letting us know who you sold your bonds to.</p>;
      case 'told':
        return <p>Thanks for letting us know who you voted for.</p>;
      case '':
        return <p>Hei og hopp. Her har det skjedd en feil UwU</p>;
    }
  }

  return (
    <div>
      <h1>Thank you!</h1>
      {renderCorrectPage()}
    </div>
  );
};

export default Submitted;
