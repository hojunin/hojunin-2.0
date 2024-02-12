import React from 'react';
import TechPostListItem from './tech-post-list-item';
import CommonError from '../../common/common-error';
import { BASE_URL } from '@/api/path';

const TechPostList = async () => {
  const response = await fetch(`${BASE_URL}contents/dev`);

  if (!response.ok) {
    return <CommonError message="api 요청에 실패했어요" />;
  }
  const techPostList = await response.json();

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
