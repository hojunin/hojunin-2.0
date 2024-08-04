import { Badge } from '@/components/ui/badge';
import React from 'react';
import { useShallow } from 'zustand/react/shallow';
import useContentsParamStore from '@/store/contents-param-store';
import { ContentTag } from '@/types/contents';
import clsx from 'clsx';
import useDevice from '@/hooks/useDevice';
import useFetchAllTags from '@/api/tag/useFetchAllTags';
import useQueryParams from '@/hooks/useQueryParams';
import { Skeleton } from '@/components/ui/skeleton';

const TagList = () => {
	const { data: tags, isLoading } = useFetchAllTags();
	const { setQueryParam } = useQueryParams();
	const { isMobile } = useDevice();
	const { currentTag, setCurrentTag } = useContentsParamStore(
		useShallow(state => ({
			currentTag: state.currentTag,
			setCurrentTag: state.setCurrentTag,
		})),
	);

	if (isLoading) {
		return (
			<ul className="flex flex-wrap gap-2">
				{[...Array(5)].map((_, index) => (
					<li key={index}>
						<Skeleton
							className={clsx('h-8 w-16 animate-pulse rounded-full', {
								'h-4 w-8': isMobile,
							})}
						/>
					</li>
				))}
			</ul>
		);
	}

	if (!tags) {
		return <div>No tags found</div>;
	}

	const onClickTag = (tag?: ContentTag) => {
		if (tag) {
			setCurrentTag(tag);
			setQueryParam('tag', tag.name);
			return;
		}
		setCurrentTag(null);
	};

	return (
		<ul className="flex flex-wrap gap-2">
			<TagButton onClick={() => onClickTag()} isActive={currentTag === null} label="전체" />
			{tags.map(tag => (
				<TagButton
					key={tag.id}
					onClick={() => onClickTag(tag)}
					isActive={currentTag?.id === tag.id}
					label={tag.name}
				/>
			))}
		</ul>
	);
};

export default TagList;

const TagButton = ({
	onClick,
	isActive,
	label,
}: {
	onClick: () => void;
	isActive: boolean;
	label: string;
}) => {
	const { isMobile } = useDevice();
	return (
		<button onClick={onClick}>
			<Badge
				className={clsx({
					'opacity-50': !isActive,
				})}
				size={isMobile ? 'sm' : 'lg'}
			>
				{label}
			</Badge>
		</button>
	);
};
