import React from 'react';
import NoLongerOwnForm from '../../components/NoLongerOwnForm/NoLongerOwnForm';
import './index.css';
import { SubmittedPageType } from '../../utils/types';

interface Props {
  setSubmitted: (submitted: SubmittedPageType) => void;
}

const NoLongerOwn = (props: Props) => {
  const { setSubmitted } = props;

  return (
    <div className={'no-longer-own-page'}>
      <h1>TODO - Informativ tekst</h1>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore et
        odio ipsam ullam provident, magnam impedit nobis eum earum possimus?
        lorem lorem asdf asdf asdf sdf asdf asdf asdf asdf asdf
      </p>
      <NoLongerOwnForm setSubmitted={setSubmitted} />
    </div>
  );
};

export default NoLongerOwn;
