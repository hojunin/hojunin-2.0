'use client';
import ChallengeCountBadge from '@/components/challenge/challenge-count-badge';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { cn } from '@/lib/utils';
import { UserChallenge } from '@/types/challenge';
import { Nullable } from '@/types/common';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

interface Props {
  userChallenge: UserChallenge;
}

const ChallengeListItem = ({ userChallenge }: Props) => {
  const {
    challenge,
    achieved_count,
    goal_count,
    detail,
    link,
    year,
    week,
    certifying_shot,
  } = userChallenge;
  const router = useRouter();

  const onClickCard = (link: Nullable<string>) => {
    if (!link) {
      return;
    }
    router.push(link);
  };

  return (
    <Card onClick={() => onClickCard(link)} className={cn('hover:opacity-85')}>
      <HoverCard openDelay={100} closeDelay={100}>
        <HoverCardTrigger>
          <CardHeader>
            <CardTitle>{challenge.name}</CardTitle>
            <CardDescription>{detail}</CardDescription>
          </CardHeader>
          <CardContent></CardContent>
          <CardFooter>
            <ChallengeCountBadge
              goal_count={goal_count}
              achieved_count={achieved_count}
            />
          </CardFooter>
        </HoverCardTrigger>
        <HoverCardContent sideOffset={3}>
          {certifying_shot && (
            <Image
              src={certifying_shot}
              alt={`${year}년 ${week}주차 ${challenge.name} 인증샷`}
              width={300}
              height={300}
              objectFit="contain"
            />
          )}
          {link && <Link href={link}>확인하러 가기</Link>}
        </HoverCardContent>
      </HoverCard>
    </Card>
  );
};

export default ChallengeListItem;
