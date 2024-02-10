'use server';
import React from 'react';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';

const UserInfoButton = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase.auth.getUser();

  if (!data || error) {
    return null;
  }
  return (
    <Avatar>
      {/* <AvatarImage src={data.user} /> */}
      <AvatarFallback>{data.user.email?.slice(0, 2)}</AvatarFallback>
    </Avatar>
  );
};

export default UserInfoButton;
