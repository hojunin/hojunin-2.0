'use server';

import { createClient } from '@/lib/supabase/server';
import { unstable_noStore } from 'next/cache';

export const incrementViewCount = async (slug: string) => {
  console.log("🚀 ~ incrementViewCount ~ slug:", slug)
  const supabase = createClient();
  unstable_noStore();

  const { data: count } = await supabase.rpc('increment_views', {
    target_slug: slug,
  });

  return count;
};
