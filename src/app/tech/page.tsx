import TechPostList from '@/components/tech/tech-post-list';
import React from 'react';

const TechBlogPage = () => {
  return (
    <div className="w-full">
      <h1 className="scroll-m-20 mb-10 text-4xl font-extrabold tracking-tight lg:text-5xl">
        기술 이야기
      </h1>

      <TechPostList />
    </div>
  );
};

export default TechBlogPage;
