import React, { useEffect, useState } from 'react';
import './index.css';
import { useHistory } from 'react-router-dom';
import { SubmittedPageType, VotePageType } from '../../utils/types';
import BallotForm from '../../components/BallotForm/BallotForm';
import { Vote } from '../../utils/interfaces';

const BallotPage = (props: {
  setSubmitted: (page: SubmittedPageType) => void;
}) => {
  const [filledOutVote, setFilledOutVote] = useState<Vote>();
  const [votePage, setVotePage] = useState<VotePageType>('Ballot');

  const { setSubmitted } = props;
  const history = useHistory();

  useEffect(() => {
    setSubmitted('voted');
  });

  const changePage = () => {
    switch (votePage) {
      case 'Ballot':
        return (
          <>
            <h1>Fill out ballot </h1>
            <BallotForm
              ISIN={'203578'}
              setFilledOutVote={setFilledOutVote}
              setVotePage={setVotePage}
              filledOutVote={
                filledOutVote
                  ? filledOutVote
                  : {
                      ISIN: '203578',
                      company: 'Norwegian',
                      bondsOwned: 200,
                      favor: 'favor',
                      hasCustodian: 'yes',
                      checked: true,
                      phoneNumber: 4545454545,
                      custodianName: 'LALALALA',
                      accountNumber: 8989898989,
                    }
              }
            />
          </>
        );
      case 'PoH':
        return (
          <>
            <p>
              PoH <span>{filledOutVote?.custodianName}</span>
            </p>
            <button onClick={() => history.push('/submitted')}>
              Trykk for å komme til submitted
            </button>
            <button onClick={() => setVotePage('Ballot')}>back</button>
          </>
        );
    }
  };

  return <div className="ballot-page">{changePage()}</div>;
};

export default BallotPage;
