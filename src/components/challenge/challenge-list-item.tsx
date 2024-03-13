'use client';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { UserChallenge } from '@/types/challenge';
import { Nullable } from '@/types/common';
import { useRouter } from 'next/navigation';
import React from 'react';

interface Props {
  userChallenge: UserChallenge;
}

const ChallengeListItem = ({ userChallenge }: Props) => {
  const { challenge, achieved_count, goal_count, detail, link } = userChallenge;
  const router = useRouter();

  const onClickCard = (link: Nullable<string>) => {
    if (!link) {
      return;
    }
    router.push(link);
  };

  return (
    <Card
      onClick={() => onClickCard(link)}
      className={cn(
        'hover:opacity-85 peer-hover:scale-150',
        link ? 'cursor-pointer' : '',
      )}
    >
      <CardHeader>
        <CardTitle>{challenge.name}</CardTitle>
        <CardDescription>{detail}</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter>
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
      </CardFooter>
    </Card>
  );
};

export default ChallengeListItem;
