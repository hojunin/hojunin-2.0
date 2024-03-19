'use client';
import Typography from '@/components/common/typography';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import useHandleError from '@/hooks/useHandleError';
import { getWeekOfYear } from '@/lib/date';
import { createClient } from '@/lib/supabase/client';
import dayjs from 'dayjs';
import { ArrowLeftIcon, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import React, { Fragment, useEffect, useState } from 'react';

const ChallengeTemplateGenerateButton = () => {
  const { toast } = useToast();
  const handleError = useHandleError();
  const [standardDate, setStandardDate] = useState(
    dayjs().format('YYYY-MM-DD'),
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const initialize = async () => {
      setIsInitialized(false);
      setDisabled(false);
      try {
        const [year, week] = getWeekOfYear(standardDate);
        const { data, error } = await supabase
          .from('user_challenge')
          .select('*')
          .eq('year', year)
          .eq('week', week);

        if (error || !data) {
          handleError(error);
          return;
        }
        if (data.length > 5) {
          setDisabled(true);
        }
      } catch (error) {
        handleError(error);
      } finally {
        setIsInitialized(true);
      }
    };
    initialize();
  }, [standardDate]);

  const onClick = async () => {
    setIsLoading(true);
    const [year, week] = getWeekOfYear(standardDate);
    try {
      const { error } = await supabase.from('user_challenge').insert([
        {
          detail: '책 읽기',
          achieved_count: 0,
          goal_count: 1,
          year,
          week,
          challenge: 5,
        },
        {
          detail: `${year}년 ${week}주차 회고 작성`,
          achieved_count: 0,
          goal_count: 1,
          year,
          week,
          challenge: 1,
        },
        {
          detail: '독서록 발행',
          achieved_count: 0,
          goal_count: 1,
          year,
          week,
          challenge: 1,
        },
        {
          detail: '출/퇴근 길 아티클 읽기',
          achieved_count: 0,
          goal_count: 10,
          year,
          week,
          challenge: 5,
        },
        {
          detail: '헬스장 3회 출석',
          achieved_count: 0,
          goal_count: 3,
          year,
          week,
          challenge: 3,
        },
        {
          detail: '개발 블로그 발행',
          achieved_count: 0,
          goal_count: 1,
          year,
          week,
          challenge: 1,
        },
        {
          detail: '브런치에 글 발행',
          achieved_count: 0,
          goal_count: 1,
          year,
          week,
          challenge: 1,
        },
        {
          detail: '무지출 데이 3일',
          achieved_count: 0,
          goal_count: 3,
          year,
          week,
          challenge: 7,
        },
      ]);
      if (error) {
        handleError(error);
        return;
      }
      toast({
        title: '생성 성공',
        description: `${year}년 ${week}주차 첼린지 시작!`,
        action: <Link href={'/challenge'}>보러 가기</Link>,
      });
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };
  const onClickPrevWeek = () => {
    setStandardDate(
      dayjs(standardDate).subtract(7, 'day').format('YYYY-MM-DD'),
    );
  };
  const onClickNextWeek = () => {
    setStandardDate(dayjs(standardDate).add(7, 'day').format('YYYY-MM-DD'));
  };
  return (
    <section className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between">
        <Typography variant={'p'} typo={'lead'}>
          주간 첼린지 생성
        </Typography>

        <div className="flex items-center gap-x-2">
          <button className="border p-1 rounded-sm" onClick={onClickPrevWeek}>
            <ArrowLeftIcon />
          </button>
          {`${getWeekOfYear(standardDate)[0]}년 ${
            getWeekOfYear(standardDate)[1]
          }주차`}
          <button className="border p-1 rounded-sm" onClick={onClickNextWeek}>
            <ArrowRight />
          </button>
        </div>
      </div>
      <Button
        onClick={onClick}
        variant={
          isLoading || !isInitialized || disabled ? 'secondary' : 'default'
        }
        disabled={isLoading || !isInitialized || disabled}
      >
        {!isInitialized ? (
          '초기화 중이에요'
        ) : disabled ? (
          '이미 5개 이상 생성되어 사용할 수 없어요'
        ) : isLoading ? (
          <Fragment>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            생성중이에요
          </Fragment>
        ) : (
          `${getWeekOfYear(standardDate)[0]}년 ${
            getWeekOfYear(standardDate)[1]
          }주차 첼린지 데이터 생성`
        )}
      </Button>
    </section>
  );
};

export default ChallengeTemplateGenerateButton;
