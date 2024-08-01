'use client';
import useInfiniteFetchContentQuery from './useInfiniteFetchContentQuery';
import { ContentsStatus } from '@/types/contents';
import { useState, useEffect } from 'react';
import { ValueOf } from '@/types/common';
import PostListItem from './post-list-item';
import useIntersection from '@/hooks/useIntersection';
import Toolbar from './toolbar';

const PaginationButton = () => {
	const { contents, hasNextPage, isFetchingNextPage, fetchNextPage } =
		useInfiniteFetchContentQuery();
	const [intersectionRef, isIntersecting] = useIntersection({
		threshold: 0.5,
	});

	useEffect(() => {
		if (isIntersecting && hasNextPage && !isFetchingNextPage) {
			fetchNextPage();
		}
	}, [isIntersecting, hasNextPage, isFetchingNextPage, fetchNextPage]);

	if (!contents || !Array.isArray(contents)) return null;

	return (
		<>
			<Toolbar />

			<ul className="grid grid-cols-2 gap-5 sm:grid-cols-3">
				{contents.map(post => (
					<PostListItem key={post.id} postItem={post} />
				))}
			</ul>

			{isFetchingNextPage && <div>Loading more posts...</div>}
			<div ref={intersectionRef as React.RefObject<HTMLDivElement>} className="mt-5 h-1" />
		</>
	);
};

export default PaginationButton;
