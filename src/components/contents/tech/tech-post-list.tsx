import React from 'react';
import TechPostListItem from './tech-post-list-item';
import CommonError from '../../common/common-error';

const TechPostList = async () => {
  const response = await fetch('http://localhost:3000/api/contents/dev');
  const techPostList = await response.json();

  if (!techPostList) {
    return <CommonError />;
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
