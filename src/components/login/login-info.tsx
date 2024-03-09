'use client';
import { createClient } from '@/lib/supabase/client';
import { Nullable } from '@/types/common';
import { User } from '@supabase/supabase-js';
import React, { useEffect, useState } from 'react';
import { Skeleton } from '../ui/skeleton';
import { Button } from '../ui/button';
import Typography from '../common/typography';

const LoginInfo = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<Nullable<User>>(null);
  const supabase = createClient();

  const getCurrentUserData = async () => {
    setIsLoading(true);
    const user = await supabase.auth.getUser();
    try {
      if (user.error) {
        return;
      }
      setCurrentUser(user.data.user);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  const onClickLogout = () => {
    supabase.auth.signOut();
  };
  useEffect(() => {
    getCurrentUserData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-y-4">
        <Skeleton className="w-10 h-4" />
        <Skeleton className="w-20 h-6" />
      </div>
    );
  }

  return (
    <div>
      {currentUser ? (
        <div className="flex flex-col gap-y-4">
          <Typography variant={'h3'}>
            현재 로그인 정보 : {currentUser.email}
          </Typography>
          <Button onClick={onClickLogout}>로그아웃</Button>
        </div>
      ) : (
        <Typography variant={'h3'}>로그인 해주세요</Typography>
      )}
    </div>
  );
};

export default LoginInfo;
