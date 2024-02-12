import React from 'react';
import TechPostListItem from './tech-post-list-item';
import CommonError from '../../common/common-error';
import { fetcher } from '@/api/fetcher';
import { PostListItemInterface } from '@/types/contents';

interface Props {
  category: string;
}

const PostList = async ({ category }: Props) => {
  const postList = await fetcher<PostListItemInterface[]>({
    path: `contents/${category}`,
  });

  if (!postList) {
    return <CommonError message="데이터가 없어요" />;
  }

  return (
    <ul className="grid grid-cols-1 gap-5 sm:grid-cols-3">
      {postList.map((post) => (
        <TechPostListItem key={post.id} techPostItem={post} />
      ))}
    </ul>
  );
};

export default PostList;
