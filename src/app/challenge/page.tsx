import ChallengeList from '@/components/challenge/challenge-list';
import React from 'react';

const ChallengePage = () => {
  return (
    <div>
      <ChallengeList year={2024} week={5} />
    </div>
  );
};

export default ChallengePage;
