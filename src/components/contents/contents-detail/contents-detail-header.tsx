import CommonError from '@/components/common/common-error';
import Typography from '@/components/common/typography';
import ContentsDetailBreadCrumb from '@/components/contents/contents-detail/bread-crumbs';
import ContentsViewCount from '@/components/contents/contents-view-count';
import { Skeleton } from '@/components/ui/skeleton';
import { createClient } from '@/lib/supabase/server';
import { EyeIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { Suspense } from 'react';

interface Props {
  slug: string;
}

const ContentsDetailHeader = async ({ slug }: Props) => {
  console.log("🚀 ~ ContentsDetailHeader ~ slug:", slug)
  const supabase = createClient();
  const { data: contentsMeta, error } = await supabase
    .from('contents')
    .select('*, tag(*)')
    .eq('slug', slug)
    .single();

  if (error || !contentsMeta) {
    return <CommonError message="컨텐츠 데이터 호출에 실패했어요" />;
  }

  return (
    <section>
      <Suspense fallback={null}>
        <ContentsDetailBreadCrumb
          tag={contentsMeta.tag}
          title={contentsMeta.title}
        />
      </Suspense>

      <div>
        <Typography
          variant={'h1'}
          className="break-words whitespace-normal mt-4"
        >
          {contentsMeta.title}
        </Typography>

        <Typography
          variant={'p'}
          className="text-muted-foreground text-lg mt-2"
        >
          {contentsMeta.description}
        </Typography>
      </div>

      <div className="flex items-center justify-between gap-y-4 my-4">
        <Link href={'/about'} className="flex items-center gap-x-4">
          <Image
            src="https://lnwblzacktgzeiihvxtu.supabase.co/storage/v1/object/public/contents/prod/hojun.jpeg-33426"
            alt="인호준 아바타 이미지"
            width={36}
            height={36}
            className="rounded-full"
          />
          <div className="flex flex-col">
            <Typography variant={'p'} className="text-muted-foreground">
              인호준
            </Typography>
            <Typography
              variant={'p'}
              className="text-muted-foreground mt-[-4px]"
            >
              컨텐츠 만드는 개발자
            </Typography>
          </div>
        </Link>

        <Suspense
          fallback={
            <div className="flex items-center gap-x-2">
              <EyeIcon width={16} height={16} color="#efefef" />
              <Skeleton className="w-4 h-4" />
            </div>
          }
        >
          <ContentsViewCount slug={slug} />
        </Suspense>
      </div>
    </section>
  );
};

export default ContentsDetailHeader;
