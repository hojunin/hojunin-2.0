'use client';
import useInfiniteFetchContentQuery from './useInfiniteFetchContentQuery';
import { useEffect } from 'react';
import PostListItem from './post-list-item';
import useIntersection from '@/hooks/useIntersection';
import Toolbar from './toolbar';
import CommonError from '@/components/common/common-error';
import { useInitQueryString } from './InfinityContentsList.hooks';

const InfinityContentsList = () => {
	useInitQueryString();
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

	if (!contents || !Array.isArray(contents)) {
		return <CommonError message="데이터가 없어요" />;
	}

	return (
		<>
			<Toolbar />

			<ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-5">
				{contents.map((post, index) => (
					<PostListItem
						key={`${post.id}-${post.status}-${post.tag.name}-${index}`}
						postItem={post}
					/>
				))}
			</ul>

			{isFetchingNextPage && <div>Loading more posts...</div>}
			<div ref={intersectionRef as React.RefObject<HTMLDivElement>} className="mt-5 h-1" />
		</>
	);
};

export default InfinityContentsList;
