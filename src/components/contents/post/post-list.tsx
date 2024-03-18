import React from 'react';
import PostListItem from './post-list-item';
import CommonError from '../../common/common-error';
import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';

interface Props {
  category: string;
}

const PostList = async ({ category }: Props) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: postList, error } = await supabase
    .from('contents')
    .select(
      'id, created_at, title, description, thumbnail, slug, category, status',
    )
    .eq('category', category);

  if (!postList || error) {
    return <CommonError message="데이터가 없어요" />;
  }

  return (
    <ul className="grid grid-cols-1 gap-5 sm:grid-cols-3">
      {postList.map((post) => (
        <PostListItem key={post.id} postItem={post} />
      ))}
    </ul>
  );
};

export default PostList;
