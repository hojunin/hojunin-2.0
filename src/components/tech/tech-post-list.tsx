import React from 'react';
import TechPostListItem from './tech-post-list-item';

const TechPostList = () => {
  return (
    <ul className="grid grid-cols-3 gap-5">
      <TechPostListItem />
      <TechPostListItem />
      <TechPostListItem />
      <TechPostListItem />
      <TechPostListItem />
      <TechPostListItem />
    </ul>
  );
};

export default TechPostList;
