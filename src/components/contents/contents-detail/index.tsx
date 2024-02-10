import CommonError from '@/components/common/common-error';
import { createClient } from '@/lib/supabase/server';
import { MDXComponents } from '@/mdx-components';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { cookies } from 'next/headers';
import React from 'react';

interface Props {
  slug: string;
}

const ContentsDetail = async ({ slug }: Props) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase
    .from('tech_post')
    .select()
    .eq('slug', slug)
    .single();

  if (error || !data) {
    return <CommonError />;
  }
  return (
    <div>
      <MDXRemote source={data.body} components={MDXComponents} />
    </div>
  );
};

export default ContentsDetail;
