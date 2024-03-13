'use client';
import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';

const UserInfoButton = () => {
  const [user, setUser] = useState<User | undefined>();
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data }) => setUser(data.session?.user));
  }, []);

  if (!user) {
    return null;
  }
  return (
    <Avatar>
      {/* <AvatarImage src={data.user} /> */}
      <AvatarFallback>{user.email?.slice(0, 2)}</AvatarFallback>
    </Avatar>
  );
};

export default UserInfoButton;
