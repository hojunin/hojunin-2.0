'use client';
import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';
import Link from 'next/link';

const UserInfoButton = () => {
  const [user, setUser] = useState<User | undefined>();
  useEffect(() => {
    const supabase = createClient();

    supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user);
    });
  }, []);

  if (!user) {
    return null;
  }
  return (
    <Avatar>
      <AvatarFallback>
        <Link href={'/login'}>{user.email?.slice(0, 2)}</Link>
      </AvatarFallback>
    </Avatar>
  );
};

export default UserInfoButton;
