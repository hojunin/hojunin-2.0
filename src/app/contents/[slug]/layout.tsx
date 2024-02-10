import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import React from 'react';

const ContentsDetailLayout = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default ContentsDetailLayout;

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: post, error } = await supabase
    .from('tech_post')
    .select()
    .eq('slug', slug)
    .single();

  if (error || !post) {
    return {};
  }

  return {
    title: `HJINN | ${post.title}`,
    description: post.description,
    openGraph: {
      title: `HJINN | ${post.title}`,
      description: post.description,
      images: [post.thumbnail],
    },
  };
}
