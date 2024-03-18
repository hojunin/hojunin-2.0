'use server';
import Typography from '@/components/common/typography';
import { createClient } from '@/lib/supabase/server';
import { EyeIcon } from 'lucide-react';
import { unstable_noStore as noStore } from 'next/cache';
import { cookies } from 'next/headers';
import React from 'react';
interface Props {
  slug: string;
}
const PostListItemViewCount = async ({ slug }: Props) => {
  noStore();
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data } = await supabase
    .from('views')
    .select('count')
    .eq('slug', slug)
    .single();

  return (
    <div className="flex items-center gap-x-2">
      <EyeIcon width={16} height={16} color="#efefef" />
      <Typography variant={'span'} typo={'mute'}>
        {data?.count}
      </Typography>
    </div>
  );
};

export default PostListItemViewCount;
