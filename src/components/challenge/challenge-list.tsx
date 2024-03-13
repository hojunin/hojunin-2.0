import ChallengeListItem from '@/components/challenge/challenge-list-item';
import CommonError from '@/components/common/common-error';
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import React from 'react';

interface Props {
  year: number;
  week: number;
}

const ChallengeList = async ({ year, week }: Props) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: challenges, error } = await supabase
    .from('user_challenge')
    .select('*, challenge(*)')
    .eq('year', year)
    .eq('week', week);

  if (!challenges || error) {
    return <CommonError />;
  }

  return (
    <ul className="grid grid-cols-4 gap-3">
      {challenges?.map((challenge) => (
        <ChallengeListItem key={challenge.id} userChallenge={challenge} />
      ))}
    </ul>
  );
};

export default ChallengeList;
