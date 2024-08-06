'use client';
import React from 'react';
import { ContentTag } from '@/types/contents';
import RecommendedPostsContent from './recommend-post-contents';

const RecommendedContents = ({ tag }: { tag: ContentTag }) => {
	return <RecommendedPostsContent tag={tag} />;
};

export default RecommendedContents;
