import React from 'react';
import NoLongerOwnForm from '../../components/NoLongerOwnForm/NoLongerOwnForm';
import { submittedPageType } from '../../utils/types';

interface Props {
  setSubmitted: (submitted: submittedPageType) => void;
}

const NoLongerOwn = (props: Props) => {
  const { setSubmitted } = props;

  return (
    <div>
      <h1>TODO - Informativ tekst</h1>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore et odio ipsam ullam provident, magnam impedit nobis eum earum possimus?</p>
      <NoLongerOwnForm setSubmitted={setSubmitted} />
    </div>
  );
};

export default NoLongerOwn;
