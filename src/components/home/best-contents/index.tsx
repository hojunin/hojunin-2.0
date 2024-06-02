import Box from '@/components/animated';
import Typography from '@/components/common/typography';
import BestContentsItem from '@/components/home/best-contents/best-contents-item';
import FadeIn from '@/components/ui/fade-in';
import { createClient } from '@/lib/supabase/server';
import { PostListItemInterface } from '@/types/contents';
import { cookies } from 'next/headers';
import Link from 'next/link';
import React from 'react';

const BestContents = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: contents, error } = await supabase.rpc('best_contents');

  if (error) {
    return null;
  }

  return (
    <section className="my-6">
      <FadeIn>
        <Box />
      </FadeIn>
      <div className="flex items-center justify-between mb-3">
        <Typography variant={'h2'}>베스트 컨텐츠</Typography>

        <Link href="/contents" className="text-muted-foreground">
          더 보러가기
        </Link>
      </div>

      <ul className="flex items-center gap-x-4">
        {(contents as PostListItemInterface[]).map((content) => (
          <BestContentsItem content={content} key={content.id} />
        ))}
      </ul>
    </section>
  );
};

export default BestContents;
