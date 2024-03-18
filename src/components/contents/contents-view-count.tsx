import Typography from '@/components/common/typography';
import { createClient } from '@/lib/supabase/client';
import { EyeIcon } from 'lucide-react';
import { unstable_noStore as noStore } from 'next/cache';
import React from 'react';

interface Props {
  slug: string;
}

const ContentsViewCount = async ({ slug }: Props) => {
  const supabase = createClient();
  const { data: count } = await supabase.rpc('increment_views', {
    target_slug: slug,
  });

  return (
    <div className="flex items-center gap-x-2">
      <EyeIcon width={16} height={16} color="#efefef" />
      <Typography variant={'span'} typo={'mute'}>
        {count}
      </Typography>
    </div>
  );
};

export default ContentsViewCount;
