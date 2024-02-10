import React from 'react';
import TechPostListItem from './tech-post-list-item';
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import CommonError from '../common/common-error';

const TechPostList = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: techPostList, error } = await supabase
    .from('tech_post')
    .select();

  if (error) {
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
