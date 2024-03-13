import { UserChallenge } from '@/types/challenge';
import React from 'react';

interface Props {
  userChallenge: UserChallenge;
}

const ChallengeListItem = ({ userChallenge }: Props) => {
  return <div>{userChallenge.challenge.name}</div>;
};

export default ChallengeListItem;
