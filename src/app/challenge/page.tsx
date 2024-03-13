import ChallengeList from '@/components/challenge/challenge-list';
import { getWeekOfYear } from '@/lib/date';
import React from 'react';

const ChallengePage = () => {
  const [year, week] = getWeekOfYear();
  return (
    <div>
      <ChallengeList year={year} week={week} />
    </div>
  );
};

export default ChallengePage;
