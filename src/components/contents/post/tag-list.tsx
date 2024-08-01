import { Badge } from '@/components/ui/badge';
import React from 'react';
import useFetchTags from '@/components/contents/post/tag-list.hooks';
import { useShallow } from 'zustand/react/shallow';
import useContentsParamStore from '@/store/contents-param-store';
import { ContentsTag } from '@/types/contents';
import clsx from 'clsx';
import useDevice from '@/hooks/useDevice';

const TagList = () => {
	const { data: tags, isLoading } = useFetchTags();
	const { currentTag, setCurrentTag } = useContentsParamStore(
		useShallow(state => ({
			currentTag: state.currentTag,
			setCurrentTag: state.setCurrentTag,
		})),
	);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (!tags) {
		return <div>No tags found</div>;
	}

	const onClickTag = (tag?: ContentsTag) => {
		if (tag) {
			setCurrentTag(tag);
			return;
		}
		setCurrentTag(null);
	};

	return (
		<ul className="flex flex-wrap gap-2">
			<TagButton onClick={() => onClickTag()} isActive={currentTag === null} label="전체" />
			{tags?.map(tag => (
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
