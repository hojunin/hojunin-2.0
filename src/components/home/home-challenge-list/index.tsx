import ChallengeCountBadge from '@/components/challenge/challenge-count-badge';
import Typography from '@/components/common/typography';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { getWeekOfYear } from '@/lib/date';
import { createClient } from '@/lib/supabase/server';
import { UserChallenge } from '@/types/challenge';
import { cookies } from 'next/headers';
import Link from 'next/link';
import React from 'react';

const HomeChallengeList = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const [year, week] = getWeekOfYear();

  const { data: challenges, error } = await supabase
    .from('user_challenge')
    .select('*, challenge(*)')
    .eq('year', year)
    .eq('week', week);

  if (error || !challenges) {
    return null;
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <Typography
          variant={'h2'}
          className="mb-4"
        >{`${year}년 ${week}주차 챌린지`}</Typography>

        <Link href={'/challenge'} className="text-muted-foreground">
          더 보러가기
        </Link>
      </div>
      <Carousel>
        <CarouselContent className="-ml-2 md:-ml-4">
          {(challenges as UserChallenge[])?.map((challenge) => (
            <CarouselItem
              key={challenge.id}
              className="pl-1 md:pl-4 md:basis-1/3 lg:basis-1/5"
            >
              <Card>
                <CardContent className="flex flex-col items-start justify-between aspect-video p-4">
                  <div>
                    <Typography variant={'h4'}>
                      {challenge.challenge.name}
                    </Typography>

                    <p className="text-sm text-muted-foreground">
                      {challenge.detail}
                    </p>
                  </div>

                  <ChallengeCountBadge
                    goal_count={challenge.goal_count}
                    achieved_count={challenge.achieved_count}
                    size="sm"
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default HomeChallengeList;
