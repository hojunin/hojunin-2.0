import { Badge } from '@/components/ui/badge';
import React from 'react';
import useFetchTags from './tag-list.hooks';

const TagList = () => {
	const { data: tags, isLoading } = useFetchTags();

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (!tags) {
		return <div>No tags found</div>;
	}

	return (
		<ul className="flex gap-x-2">
			{tags?.map(tag => (
				<button key={tag.id}>
					<Badge size={'lg'}>{tag.name}</Badge>
				</button>
			))}
		</ul>
	);
};

export default TagList;
