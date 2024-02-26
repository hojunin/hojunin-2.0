import React from 'react';
import PostListItem from './post-list-item';
import CommonError from '../../common/common-error';
import { HTTP_METHOD_TYPE, fetcher } from '@/api/fetcher';
import { PostListItemInterface } from '@/types/contents';

interface Props {
  category: string;
}

const PostList = async ({ category }: Props) => {
  const postList = await fetcher<PostListItemInterface[]>({
    path: `contents/${category}`,
    config: {
      cache: 'no-cache',
      method: HTTP_METHOD_TYPE.GET,
    },
  });

  if (!postList) {
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
