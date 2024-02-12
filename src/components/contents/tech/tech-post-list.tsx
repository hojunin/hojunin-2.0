import React from 'react';
import TechPostListItem from './tech-post-list-item';
import CommonError from '../../common/common-error';
import { BASE_URL } from '@/api/path';
import { fetcher } from '@/api/fetcher';
import { PostListItemInterface } from '@/types/contents';

const TechPostList = async () => {
  const techPostList = await fetcher<PostListItemInterface[]>({
    path: 'contents/dev',
  });

  if (!techPostList) {
    return <CommonError message="데이터가 없어요" />;
  }

  return (
    <ul className="grid grid-cols-1 gap-5 sm:grid-cols-3">
      {techPostList.map((techPost) => (
        <TechPostListItem key={techPost.id} techPostItem={techPost} />
      ))}
    </ul>
  );
};

export default TechPostList;
