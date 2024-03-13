import { Badge } from '@/components/ui/badge';
import React from 'react';

interface Props {
  achieved_count: number;
  goal_count: number;
}

const ChallengeCountBadge = ({ achieved_count, goal_count }: Props) => {
  return (
    <Badge
      variant={
        achieved_count === 0
          ? 'destructive'
          : achieved_count > goal_count
          ? 'default'
          : 'secondary'
      }
      size={'lg'}
    >
      {achieved_count} / {goal_count}
    </Badge>
  );
};

export default ChallengeCountBadge;
