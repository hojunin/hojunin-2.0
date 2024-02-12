import { BASE_URL } from '@/api/path';
import CommonError from '@/components/common/common-error';
import { createClient } from '@/lib/supabase/server';
import { MDXComponents } from '@/mdx-components';
import { ValueOf } from '@/types/common';
import { ContentsCategory } from '@/types/contents';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { cookies } from 'next/headers';
import React from 'react';

interface Props {
  category: ValueOf<typeof ContentsCategory>;
  slug: string;
}

const ContentsDetail = async ({ category, slug }: Props) => {
  const response = await fetch(`${BASE_URL}contents/${category}/${slug}`, {
    cache: 'force-cache',
  });
  const contentDetail = await response.json();

  if (!contentDetail) {
    return <CommonError />;
  }
  return (
    <div>
      <MDXRemote source={contentDetail.body} components={MDXComponents()} />
    </div>
  );
};

export default ContentsDetail;
