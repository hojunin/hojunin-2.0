'use server';

import { createClient } from '@/lib/supabase/server';
import { unstable_noStore } from 'next/cache';
import { cookies } from 'next/headers';

export const incrementViewCount = async (slug: string) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  unstable_noStore();

  const { data: count } = await supabase.rpc('increment_views', {
    target_slug: slug,
  });

  return count;
};
